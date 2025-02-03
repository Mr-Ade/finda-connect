import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { formatTimeDisplay, validateTimeRange, generateTimeOptions } from "@/lib/utils/timeUtils";

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

const timeOptions = generateTimeOptions();

export const WorkingHours = () => {
  const { formData, updateFormData } = useBusinessForm();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleTimeChange = (day: number, type: 'open' | 'close', value: string) => {
    try {
      setLoading(true);
      const updatedHours = [...(formData.workingHours || [])];
      const dayIndex = updatedHours.findIndex(h => h.dayOfWeek === day);
      const currentHours = updatedHours[dayIndex];

      const otherTime = type === 'open' 
        ? currentHours?.closeTime 
        : currentHours?.openTime;

      if (otherTime && !validateTimeRange(
        type === 'open' ? value : otherTime,
        type === 'close' ? value : otherTime
      )) {
        toast({
          title: "Invalid time range",
          description: "Opening time must be before closing time",
          variant: "destructive"
        });
        return;
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
      
      toast({
        title: "Status updated",
        description: `Business is now ${updatedHours[dayIndex]?.isClosed ? 'closed' : 'open'} on ${DAYS[day]}`
      });
    } catch (error) {
      toast({
        title: "Error updating status",
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Clock className="w-5 h-5" />
        <h3 className="font-medium">Working Hours</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {DAYS.map((day, index) => (
          <div key={day} className="grid grid-cols-12 gap-4 items-center">
            <Label className="col-span-2">{day}</Label>
            <div className="col-span-5">
              <Select
                value={getHoursForDay(index).openTime}
                onValueChange={(value) => handleTimeChange(index, 'open', value)}
                disabled={getHoursForDay(index).isClosed || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Opening Time">
                    {formatTimeDisplay(getHoursForDay(index).openTime)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {formatTimeDisplay(time)}
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
                  <SelectValue placeholder="Closing Time">
                    {formatTimeDisplay(getHoursForDay(index).closeTime)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {formatTimeDisplay(time)}
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
              const updatedHours = DAYS.map((_, index) => ({
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