
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DataExporter = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState({
    states: false,
    cities: false,
    statesAndCities: false,
  });

  // Export just the states list
  const exportStates = async () => {
    setLoading({ ...loading, states: true });
    try {
      const { data, error } = await supabase
        .from('states')
        .select('id, name, code')
        .order('name');

      if (error) throw error;
      
      downloadJson(data, 'nigerian_states');
      toast({
        title: "Export Successful",
        description: `${data.length} states have been exported to JSON.`
      });
    } catch (error) {
      console.error('Error exporting states:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the states data.",
        variant: "destructive"
      });
    } finally {
      setLoading({ ...loading, states: false });
    }
  };

  // Export just the cities list
  const exportCities = async () => {
    setLoading({ ...loading, cities: true });
    try {
      const { data, error } = await supabase
        .from('cities')
        .select('id, name, state_id, ad_count')
        .order('name');

      if (error) throw error;
      
      downloadJson(data, 'nigerian_cities');
      toast({
        title: "Export Successful",
        description: `${data.length} cities have been exported to JSON.`
      });
    } catch (error) {
      console.error('Error exporting cities:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the cities data.",
        variant: "destructive"
      });
    } finally {
      setLoading({ ...loading, cities: false });
    }
  };

  // Export combined states and cities with proper relationships
  const exportStatesWithCities = async () => {
    setLoading({ ...loading, statesAndCities: true });
    try {
      // First get all states
      const { data: states, error: statesError } = await supabase
        .from('states')
        .select('id, name, code')
        .order('name');

      if (statesError) throw statesError;
      
      // Then get all cities
      const { data: allCities, error: citiesError } = await supabase
        .from('cities')
        .select('id, name, state_id, ad_count')
        .order('name');

      if (citiesError) throw citiesError;

      // Organize cities by state
      const statesWithCities = states.map(state => {
        const stateCities = allCities.filter(city => 
          city.state_id === state.id
        );
        
        return {
          id: state.id,
          name: state.name,
          code: state.code,
          cities: stateCities.map(city => ({
            id: city.id,
            name: city.name,
            ad_count: city.ad_count
          }))
        };
      });
      
      downloadJson(statesWithCities, 'nigerian_states_with_cities');
      toast({
        title: "Export Successful",
        description: `${states.length} states with their cities have been exported to JSON.`
      });
    } catch (error) {
      console.error('Error exporting states with cities:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the combined data.",
        variant: "destructive"
      });
    } finally {
      setLoading({ ...loading, statesAndCities: false });
    }
  };

  // Utility function to download JSON data as a file
  const downloadJson = (data: any, filename: string) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AdminRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Data Exporter</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Nigerian States</CardTitle>
              <CardDescription>
                Export the complete list of Nigerian states with their codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Downloads a JSON file containing the list of all states in Nigeria with their names and codes.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={exportStates} 
                disabled={loading.states}
                className="w-full"
              >
                {loading.states ? "Exporting..." : "Export States"}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nigerian Cities</CardTitle>
              <CardDescription>
                Export the complete list of Nigerian cities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Downloads a JSON file containing all cities with their related state IDs and ad counts.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={exportCities} 
                disabled={loading.cities}
                className="w-full"
              >
                {loading.cities ? "Exporting..." : "Export Cities"}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>States with Cities</CardTitle>
              <CardDescription>
                Export states with their associated cities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Downloads a JSON file with states and their corresponding cities in a nested format.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={exportStatesWithCities} 
                disabled={loading.statesAndCities}
                className="w-full"
              >
                {loading.statesAndCities ? "Exporting..." : "Export Combined Data"}
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminRoute>
  );
};

export default DataExporter;
