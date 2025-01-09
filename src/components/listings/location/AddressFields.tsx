import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddressFieldsProps {
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  availableStates: {
    name: string;
    code: string;
  }[];
  onAddressChange: (field: string, value: string) => void;
}

interface City {
  id: string;
  name: string;
  state_id: string;
  ad_count: number;
}

export const AddressFields = ({ address, availableStates, onAddressChange }: AddressFieldsProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCities = async () => {
      if (!address.state) {
        setCities([]);
        return;
      }

      try {
        setLoading(true);
        
        // First check if we have an authenticated session
        const { data: { session } } = await supabase.auth.getSession();
        
        // Get state ID
        const { data: stateData, error: stateError } = await supabase
          .from('states')
          .select('id')
          .eq('name', address.state)
          .single();

        if (stateError) {
          console.error('Error fetching state:', stateError);
          toast({
            title: "Error",
            description: "Failed to fetch state data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (stateData) {
          const { data: citiesData, error: citiesError } = await supabase
            .from('cities')
            .select('*')
            .eq('state_id', stateData.id)
            .order('name');
          
          if (citiesError) {
            console.error('Error fetching cities:', citiesError);
            toast({
              title: "Error",
              description: "Failed to fetch cities. Please try again.",
              variant: "destructive",
            });
            return;
          }

          if (citiesData) {
            setCities(citiesData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [address.state, toast]);

  console.log("Current state:", address.state);
  console.log("Available states:", availableStates);
  console.log("Available cities:", cities);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input 
          id="street"
          value={address.street}
          onChange={(e) => onAddressChange('street', e.target.value)}
          placeholder="Enter street address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select
          value={address.state}
          onValueChange={(value) => onAddressChange('state', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {availableStates.map((state) => (
              <SelectItem key={state.code} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Select 
          value={address.city}
          onValueChange={(value) => onAddressChange('city', value)}
          disabled={loading || !address.state}
        >
          <SelectTrigger>
            <SelectValue placeholder={loading ? "Loading cities..." : "Select city"} />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.name}>
                {city.name} ({city.ad_count} ads)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="zip_code">ZIP Code</Label>
        <Input 
          id="zip_code"
          value={address.zip_code}
          onChange={(e) => onAddressChange('zip_code', e.target.value)}
          placeholder="Enter ZIP code"
        />
      </div>
    </>
  );
};