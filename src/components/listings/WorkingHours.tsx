import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";

const timeOptions = [
  "Closed",
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];

const days = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

export const WorkingHours = () => {
  const { formData, updateFormData } = useBusinessForm();

  const handleTimeChange = (day: number, type: 'open' | 'close', value: string) => {
    const updatedHours = [...(formData.workingHours || [])];
    const dayIndex = updatedHours.findIndex(h => h.dayOfWeek === day);

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
  };

  const handleClosedToggle = (day: number) => {
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
        {days.map((day, index) => (
          <div key={day} className="grid grid-cols-12 gap-4 items-center">
            <Label className="col-span-2">{day}</Label>
            <div className="col-span-5">
              <Select
                value={getHoursForDay(index).openTime}
                onValueChange={(value) => handleTimeChange(index, 'open', value)}
                disabled={getHoursForDay(index).isClosed}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Opening Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time.toLowerCase()}>
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
                disabled={getHoursForDay(index).isClosed}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Closing Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time.toLowerCase()}>
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
              />
              <Label htmlFor={`closed-${index}`} className="text-sm">Closed</Label>
            </div>
          </div>
        ))}

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox 
            id="24hours"
            checked={formData.workingHours?.every(h => !h.isClosed)}
            onCheckedChange={(checked) => {
              const updatedHours = days.map((_, index) => ({
                dayOfWeek: index,
                openTime: "12:00 am",
                closeTime: "11:59 pm",
                isClosed: !checked
              }));
              updateFormData('workingHours', updatedHours);
            }}
          />
          <Label htmlFor="24hours">This business is open 24/7</Label>
        </div>
      </CardContent>
    </Card>
  );
};