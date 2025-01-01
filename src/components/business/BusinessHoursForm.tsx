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

export const BusinessHoursForm = ({ businessId }: { businessId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: hours } = useQuery({
    queryKey: ['business-hours', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('business_id', businessId)
        .order('day_of_week');

      if (error) throw error;
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
      const existingHours = hours?.find(h => h.day_of_week === values.day_of_week);
      
      if (existingHours) {
        const { error } = await supabase
          .from('business_hours')
          .update({
            open_time: values.open_time,
            close_time: values.close_time,
            is_closed: values.is_closed,
          })
          .eq('id', existingHours.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('business_hours')
          .insert({
            business_id: businessId,
            ...values,
          });
        
        if (error) throw error;
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
      toast({
        title: "Error",
        description: "Failed to update business hours. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating hours:", error);
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
            return (
              <div key={day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Closed</span>
                    <Switch
                      checked={!dayHours?.is_closed}
                      onCheckedChange={(checked) => {
                        handleSubmit(index, {
                          open_time: dayHours?.open_time || "09:00",
                          close_time: dayHours?.close_time || "17:00",
                          is_closed: !checked,
                        });
                      }}
                    />
                  </div>
                </div>
                {(!dayHours?.is_closed || !dayHours) && (
                  <div className="flex gap-4">
                    <input
                      type="time"
                      className="border rounded px-2 py-1"
                      value={dayHours?.open_time || "09:00"}
                      onChange={(e) =>
                        handleSubmit(index, {
                          open_time: e.target.value,
                          close_time: dayHours?.close_time || "17:00",
                          is_closed: false,
                        })
                      }
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      className="border rounded px-2 py-1"
                      value={dayHours?.close_time || "17:00"}
                      onChange={(e) =>
                        handleSubmit(index, {
                          open_time: dayHours?.open_time || "09:00",
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