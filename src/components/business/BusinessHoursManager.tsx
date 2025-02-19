import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BusinessHoursFormData, BusinessSpecialHours, BusinessBreakTime, DayOfWeek } from "@/types/businessHours";
import { generateTimeOptions, validateTimeRange } from "@/lib/utils/businessHours";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DEFAULT_OPEN_TIME = "09:00";
const DEFAULT_CLOSE_TIME = "17:00";

export const BusinessHoursManager = ({ businessId }: { businessId: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("regular");

  // Fetch all hours data
  const { data: hoursData, isLoading } = useQuery({
    queryKey: ["business-hours-all", businessId],
    queryFn: async () => {
      const regularHours = await supabase
        .from("business_hours")
        .select("*")
        .eq("business_id", businessId)
        .order("day_of_week");

      const specialHours = await supabase
        .from("business_special_hours")
        .select("*")
        .eq("business_id", businessId);

      const breakTimes = await supabase
        .from("business_break_times")
        .select("*")
        .eq("business_id", businessId);

      if (regularHours.error || specialHours.error || breakTimes.error) {
        throw new Error("Failed to fetch hours data");
      }

      return {
        regularHours: regularHours.data || [],
        specialHours: specialHours.data || [],
        breakTimes: breakTimes.data || []
      };
    }
  });

  // Update mutations
  const updateRegularHoursMutation = useMutation({
    mutationFn: async (values: BusinessHoursFormData["regularHours"]) => {
      const updates = Object.entries(values).map(([day, data]) => ({
        business_id: businessId,
        day_of_week: parseInt(day),
        open_time: data.hours.start,
        close_time: data.hours.end,
        is_closed: data.is_closed
      }));

      const { error } = await supabase
        .from("business_hours")
        .upsert(updates);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-hours-all", businessId] });
      toast({
        title: "Hours updated",
        description: "Regular business hours have been updated successfully."
      });
    }
  });

  const updateSpecialHoursMutation = useMutation({
    mutationFn: async (values: BusinessSpecialHours) => {
      const { error } = await supabase
        .from("business_special_hours")
        .upsert({
          business_id: businessId,
          ...values
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-hours-all", businessId] });
      toast({
        title: "Special hours updated",
        description: "Special business hours have been updated successfully."
      });
    }
  });

  const updateBreakTimeMutation = useMutation({
    mutationFn: async (values: BusinessBreakTime) => {
      const { error } = await supabase
        .from("business_break_times")
        .upsert({
          business_id: businessId,
          ...values
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-hours-all", businessId] });
      toast({
        title: "Break time updated",
        description: "Break time settings have been updated successfully."
      });
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Business Hours Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="regular">Regular Hours</TabsTrigger>
            <TabsTrigger value="special">Special Hours</TabsTrigger>
            <TabsTrigger value="breaks">Break Times</TabsTrigger>
          </TabsList>

          <TabsContent value="regular" className="space-y-4">
            {DAYS.map((day, index) => (
              <div key={day} className="flex items-center space-x-4">
                <Label className="w-32">{day}</Label>
                <Switch
                  checked={!hoursData?.regularHours[index]?.is_closed}
                  onCheckedChange={(checked) => {
                    const updatedHours = { ...hoursData?.regularHours };
                    updatedHours[index] = {
                      ...updatedHours[index],
                      is_closed: !checked
                    };
                    updateRegularHoursMutation.mutate(updatedHours);
                  }}
                />
                {!hoursData?.regularHours[index]?.is_closed && (
                  <div className="flex space-x-2">
                    <Input
                      type="time"
                      value={hoursData?.regularHours[index]?.open_time || DEFAULT_OPEN_TIME}
                      onChange={(e) => {
                        const updatedHours = { ...hoursData?.regularHours };
                        updatedHours[index] = {
                          ...updatedHours[index],
                          open_time: e.target.value
                        };
                        updateRegularHoursMutation.mutate(updatedHours);
                      }}
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={hoursData?.regularHours[index]?.close_time || DEFAULT_CLOSE_TIME}
                      onChange={(e) => {
                        const updatedHours = { ...hoursData?.regularHours };
                        updatedHours[index] = {
                          ...updatedHours[index],
                          close_time: e.target.value
                        };
                        updateRegularHoursMutation.mutate(updatedHours);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="special" className="space-y-4">
            {/* Special Hours Management */}
          </TabsContent>

          <TabsContent value="breaks" className="space-y-4">
            {/* Break Times Management */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};