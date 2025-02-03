import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Map } from "@/components/Map";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const isOpen = (dayHours: any) => {
    if (!dayHours || dayHours.is_closed) return false;
    
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false });
    
    return dayHours.day_of_week === currentDay && 
           currentTime >= dayHours.open_time && 
           currentTime <= dayHours.close_time;
  };

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
          {isLoading ? (
            Array(7).fill(0).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))
          ) : (
            DAYS.map((day, index) => {
              const dayHours = hours?.find((h) => h.day_of_week === index);
              const isCurrentlyOpen = isOpen(dayHours);
              
              return (
                <div
                  key={day}
                  className="flex justify-between items-center"
                >
                  <span className="font-medium w-32">{day}</span>
                  <span className="text-gray-600">
                    {dayHours?.is_closed ? (
                      "Closed"
                    ) : dayHours ? (
                      <span>
                        {formatTime(dayHours.open_time)} - {formatTime(dayHours.close_time)}
                        {isCurrentlyOpen && (
                          <span className="ml-2 text-green-600">Open now</span>
                        )}
                      </span>
                    ) : (
                      "Not available"
                    )}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
};