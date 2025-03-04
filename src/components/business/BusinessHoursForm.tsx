import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Default times to use when creating new hours
const DEFAULT_OPEN_TIME = "09:00";
const DEFAULT_CLOSE_TIME = "17:00";

export const BusinessHoursForm = ({ businessId }: { businessId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: hours } = useQuery({
    queryKey: ['business-hours', businessId],
    queryFn: async () => {
      console.log('Fetching business hours for:', businessId);
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('business_id', businessId)
        .order('day_of_week');

      if (error) {
        console.error('Error fetching hours:', error);
        throw error;
      }
      return data;
    },
  });

  const updateHoursMutation = useMutation({
    mutationFn: async (values: {
      day_of_week: number;
      open_time: string;
      close_time: string;
      is_closed: boolean;
    }) => {
      // Ensure we have valid time values before sending to the server
      const payload = {
        ...values,
        // Use default times if the business is not closed and times are empty
        open_time: values.is_closed ? null : (values.open_time || DEFAULT_OPEN_TIME),
        close_time: values.is_closed ? null : (values.close_time || DEFAULT_CLOSE_TIME),
      };

      console.log('Updating hours with payload:', payload);
      
      const existingHours = hours?.find(h => h.day_of_week === values.day_of_week);
      
      if (existingHours) {
        const { error } = await supabase
          .from('business_hours')
          .update(payload)
          .eq('id', existingHours.id);
        
        if (error) {
          console.error('Error updating hours:', error);
          throw error;
        }
      } else {
        const { error } = await supabase
          .from('business_hours')
          .insert({
            business_id: businessId,
            ...payload,
          });
        
        if (error) {
          console.error('Error inserting hours:', error);
          throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-hours', businessId] });
      toast({
        title: "Hours updated",
        description: "Business hours have been updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating hours:", error);
      toast({
        title: "Error",
        description: "Failed to update business hours. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (day: number, values: any) => {
    setLoading(true);
    try {
      await updateHoursMutation.mutateAsync({
        day_of_week: day,
        ...values,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Manage Business Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DAYS.map((day, index) => {
            const dayHours = hours?.find((h) => h.day_of_week === index);
            const isOpen = !dayHours?.is_closed;
            
            return (
              <div key={day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Closed</span>
                    <Switch
                      checked={isOpen}
                      onCheckedChange={(checked) => {
                        handleSubmit(index, {
                          open_time: dayHours?.open_time || DEFAULT_OPEN_TIME,
                          close_time: dayHours?.close_time || DEFAULT_CLOSE_TIME,
                          is_closed: !checked,
                        });
                      }}
                    />
                  </div>
                </div>
                {isOpen && (
                  <div className="flex gap-4">
                    <input
                      type="time"
                      className="border rounded px-2 py-1"
                      value={dayHours?.open_time || DEFAULT_OPEN_TIME}
                      onChange={(e) =>
                        handleSubmit(index, {
                          open_time: e.target.value,
                          close_time: dayHours?.close_time || DEFAULT_CLOSE_TIME,
                          is_closed: false,
                        })
                      }
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      className="border rounded px-2 py-1"
                      value={dayHours?.close_time || DEFAULT_CLOSE_TIME}
                      onChange={(e) =>
                        handleSubmit(index, {
                          open_time: dayHours?.open_time || DEFAULT_OPEN_TIME,
                          close_time: e.target.value,
                          is_closed: false,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};