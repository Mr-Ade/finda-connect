import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const days = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

export const WorkingHours = () => {
  const { formData, updateFormData } = useBusinessForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleTimeChange = (day: number, type: 'open' | 'close', value: string) => {
    try {
      setLoading(true);
      const updatedHours = [...(formData.workingHours || [])];
      const dayIndex = updatedHours.findIndex(h => h.dayOfWeek === day);

      // Validate time format
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(value)) {
        throw new Error("Invalid time format");
      }

      if (dayIndex === -1) {
        updatedHours.push({
          dayOfWeek: day,
          openTime: type === 'open' ? value : "09:00",
          closeTime: type === 'close' ? value : "17:00",
          isClosed: false
        });
      } else {
        updatedHours[dayIndex] = {
          ...updatedHours[dayIndex],
          [type === 'open' ? 'openTime' : 'closeTime']: value
        };
      }

      updateFormData('workingHours', updatedHours);
      
      toast({
        title: "Hours updated",
        description: "Business hours have been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error updating hours",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClosedToggle = (day: number) => {
    try {
      setLoading(true);
      const updatedHours = [...(formData.workingHours || [])];
      const dayIndex = updatedHours.findIndex(h => h.dayOfWeek === day);

      if (dayIndex === -1) {
        updatedHours.push({
          dayOfWeek: day,
          openTime: "09:00",
          closeTime: "17:00",
          isClosed: true
        });
      } else {
        updatedHours[dayIndex] = {
          ...updatedHours[dayIndex],
          isClosed: !updatedHours[dayIndex].isClosed
        };
      }

      updateFormData('workingHours', updatedHours);
    } catch (error) {
      toast({
        title: "Error updating hours",
        description: "Failed to update business hours",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getHoursForDay = (day: number) => {
    return formData.workingHours?.find(h => h.dayOfWeek === day) || {
      dayOfWeek: day,
      openTime: "09:00",
      closeTime: "17:00",
      isClosed: false
    };
  };

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Clock className="w-5 h-5" />
        <h3 className="font-medium">Working Hours</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {days.map((day, index) => (
          <div key={day} className="grid grid-cols-12 gap-4 items-center">
            <Label className="col-span-2">{day}</Label>
            <div className="col-span-5">
              <Select
                value={getHoursForDay(index).openTime}
                onValueChange={(value) => handleTimeChange(index, 'open', value)}
                disabled={getHoursForDay(index).isClosed || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Opening Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-5">
              <Select
                value={getHoursForDay(index).closeTime}
                onValueChange={(value) => handleTimeChange(index, 'close', value)}
                disabled={getHoursForDay(index).isClosed || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Closing Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`closed-${index}`}
                checked={getHoursForDay(index).isClosed}
                onCheckedChange={() => handleClosedToggle(index)}
                disabled={loading}
              />
              <Label htmlFor={`closed-${index}`} className="text-sm">Closed</Label>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox 
            id="24hours"
            checked={formData.workingHours?.every(h => !h.isClosed)}
            onCheckedChange={(checked) => {
              const updatedHours = days.map((_, index) => ({
                dayOfWeek: index,
                openTime: "00:00",
                closeTime: "23:59",
                isClosed: !checked
              }));
              updateFormData('workingHours', updatedHours);
            }}
            disabled={loading}
          />
          <Label htmlFor="24hours">This business is open 24/7</Label>
        </div>
      </CardContent>
    </Card>
  );
};