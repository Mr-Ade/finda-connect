import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { addWeeks, addMonths } from "date-fns";

interface RecurringAppointmentManagerProps {
  businessId: string;
  onComplete: () => void;
}

type RecurrencePattern = "weekly" | "biweekly" | "monthly";

export const RecurringAppointmentManager = ({
  businessId,
  onComplete,
}: RecurringAppointmentManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [pattern, setPattern] = useState<RecurrencePattern>("weekly");
  const [time, setTime] = useState("09:00");

  const createRecurringAppointmentsMutation = useMutation({
    mutationFn: async () => {
      if (!startDate || !endDate || !time) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      let currentDate = startDate;
      const appointments = [];

      while (currentDate <= endDate) {
        appointments.push({
          business_id: businessId,
          user_id: session.user.id,
          appointment_date: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            parseInt(time.split(":")[0]),
            parseInt(time.split(":")[1])
          ).toISOString(),
          is_recurring: true,
          recurrence_pattern: pattern,
        });

        // Calculate next date based on pattern
        switch (pattern) {
          case "weekly":
            currentDate = addWeeks(currentDate, 1);
            break;
          case "biweekly":
            currentDate = addWeeks(currentDate, 2);
            break;
          case "monthly":
            currentDate = addMonths(currentDate, 1);
            break;
        }
      }

      const { error } = await supabase
        .from('appointments')
        .insert(appointments);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Recurring Appointments Created",
        description: "Your recurring appointments have been scheduled successfully.",
      });
      onComplete();
    },
    onError: (error) => {
      console.error("Error creating recurring appointments:", error);
      toast({
        title: "Error",
        description: "Failed to create recurring appointments. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createRecurringAppointmentsMutation.mutate();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
        <CardTitle className="text-xl font-bold text-white">
          Schedule Recurring Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Start Date</label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-md border"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">End Date</label>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                className="rounded-md border"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Time</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Recurrence Pattern</label>
              <Select value={pattern} onValueChange={(value) => setPattern(value as RecurrencePattern)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={createRecurringAppointmentsMutation.isPending}
          >
            {createRecurringAppointmentsMutation.isPending ? "Creating..." : "Create Recurring Appointments"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};