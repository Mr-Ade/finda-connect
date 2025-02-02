import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

export const ServiceSection = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-4">Make An Appointment</h4>
      
      <div className="space-y-4">
        <div>
          <Label>Select Date</Label>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Select date and time</span>
          </div>
        </div>

        <div>
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>

        <div>
          <Label>Phone</Label>
          <Input type="tel" placeholder="Enter your phone number" />
        </div>

        <Button className="w-full">Make Appointment</Button>
      </div>
    </div>
  );
};