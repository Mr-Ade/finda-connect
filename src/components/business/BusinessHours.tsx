import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Map } from "@/components/Map";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WorkingHoursDisplay } from "./WorkingHoursDisplay";

export const BusinessHours = ({ businessId, business }: { businessId: string, business?: any }) => {
  const { toast } = useToast();
  
  const { data: hours, isLoading } = useQuery({
    queryKey: ['business-hours', businessId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('business_hours')
          .select('*')
          .eq('business_id', businessId)
          .order('day_of_week');

        if (error) throw error;
        return data;
      } catch (error) {
        toast({
          title: "Error loading hours",
          description: "Failed to load business hours",
          variant: "destructive"
        });
        throw error;
      }
    },
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Location & Hours</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="space-y-4">
          <div className="h-[300px] w-full rounded-lg overflow-hidden">
            <Map
              center={{ 
                lat: business?.latitude || 0, 
                lng: business?.longitude || 0 
              }}
              markers={[{ 
                lat: business?.latitude || 0, 
                lng: business?.longitude || 0 
              }]}
              className="w-full h-full"
            />
          </div>
          
          {business?.address && (
            <div className="space-y-1">
              <p className="text-blue-600 hover:underline cursor-pointer">
                {business.address}
              </p>
              <p className="text-gray-600">
                {business.city}, {business.state} {business.zip_code}
              </p>
              <p className="text-gray-600">{business.neighborhood}</p>
            </div>
          )}
        </div>

        {/* Hours Section */}
        <div className="space-y-4">
          <WorkingHoursDisplay hours={hours} isLoading={isLoading} />
        </div>
      </div>
    </Card>
  );
};