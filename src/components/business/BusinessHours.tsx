import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const BusinessHours = ({ businessId }: { businessId: string }) => {
  const { data: hours, isLoading } = useQuery({
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

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <div>Loading hours...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Business Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {DAYS.map((day, index) => {
            const dayHours = hours?.find((h) => h.day_of_week === index);
            return (
              <div
                key={day}
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <span className="font-medium">{day}</span>
                <span className="text-gray-600">
                  {dayHours?.is_closed ? (
                    "Closed"
                  ) : dayHours ? (
                    `${formatTime(dayHours.open_time)} - ${formatTime(
                      dayHours.close_time
                    )}`
                  ) : (
                    "Not available"
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};