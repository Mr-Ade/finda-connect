import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { BusinessAvailability } from "@/types/appointments";

interface BusinessAvailabilityManagerProps {
  businessId: string;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const BusinessAvailabilityManager = ({ businessId }: BusinessAvailabilityManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState<number>(1); // Monday by default
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [slotDuration, setSlotDuration] = useState("30");
  const [breakTime, setBreakTime] = useState("15");

  const updateAvailabilityMutation = useMutation({
    mutationFn: async (availability: BusinessAvailability) => {
      const { error } = await supabase
        .from('business_availability')
        .upsert({
          business_id: availability.businessId,
          day_of_week: availability.dayOfWeek,
          start_time: availability.startTime,
          end_time: availability.endTime,
          slot_duration: availability.slotDuration,
          break_time: availability.breakTime,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business_availability', businessId] });
      toast({
        title: "Availability Updated",
        description: "Your business hours have been updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating availability:", error);
      toast({
        title: "Error",
        description: "Failed to update business hours. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAvailabilityMutation.mutate({
      businessId,
      dayOfWeek: selectedDay,
      startTime,
      endTime,
      slotDuration: parseInt(slotDuration),
      breakTime: parseInt(breakTime),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Business Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Day of Week</label>
            <Select
              value={selectedDay.toString()}
              onValueChange={(value) => setSelectedDay(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Time</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Slot Duration (minutes)</label>
              <Input
                type="number"
                min="15"
                max="120"
                step="15"
                value={slotDuration}
                onChange={(e) => setSlotDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Break Time (minutes)</label>
              <Input
                type="number"
                min="0"
                max="60"
                step="5"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={updateAvailabilityMutation.isPending}
          >
            {updateAvailabilityMutation.isPending ? "Updating..." : "Update Availability"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};