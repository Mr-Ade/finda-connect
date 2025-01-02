import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Clock className="w-5 h-5" />
        <h3 className="font-medium">Working Hours</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {days.map((day) => (
          <div key={day} className="grid grid-cols-12 gap-4 items-center">
            <Label className="col-span-2">{day}</Label>
            <div className="col-span-5">
              <Select>
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
              <Select>
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
          </div>
        ))}

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="24hours" />
          <Label htmlFor="24hours">This business is open 24/7</Label>
        </div>
      </CardContent>
    </Card>
  );
};