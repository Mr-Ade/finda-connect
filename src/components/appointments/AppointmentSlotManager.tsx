import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, addMinutes, parse } from "date-fns";
import type { AppointmentSlot, BusinessAvailability } from "@/types/appointments";

interface AppointmentSlotManagerProps {
  businessId: string;
  selectedDate: Date;
  onSlotSelect: (slot: AppointmentSlot) => void;
}

export const AppointmentSlotManager = ({
  businessId,
  selectedDate,
  onSlotSelect,
}: AppointmentSlotManagerProps) => {
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);

  const { data: businessAvailability } = useQuery({
    queryKey: ['business_availability', businessId, selectedDate.getDay()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_availability')
        .select('*')
        .eq('business_id', businessId)
        .eq('day_of_week', selectedDate.getDay())
        .single();

      if (error) throw error;
      return data as BusinessAvailability;
    },
  });

  useEffect(() => {
    if (businessAvailability) {
      const slots: AppointmentSlot[] = [];
      const startTime = parse(businessAvailability.startTime, 'HH:mm', selectedDate);
      const endTime = parse(businessAvailability.endTime, 'HH:mm', selectedDate);
      
      let currentTime = startTime;
      while (currentTime < endTime) {
        const slotEndTime = addMinutes(currentTime, businessAvailability.slotDuration);
        
        if (slotEndTime <= endTime) {
          slots.push({
            startTime: format(currentTime, 'HH:mm'),
            endTime: format(slotEndTime, 'HH:mm'),
            isAvailable: true, // This should be checked against existing appointments
          });
        }
        
        currentTime = addMinutes(currentTime, 
          businessAvailability.slotDuration + businessAvailability.breakTime
        );
      }
      
      setAvailableSlots(slots);
    }
  }, [businessAvailability, selectedDate]);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Available Time Slots
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableSlots.map((slot, index) => (
            <Button
              key={index}
              variant={slot.isAvailable ? "outline" : "ghost"}
              disabled={!slot.isAvailable}
              onClick={() => onSlotSelect(slot)}
              className={`w-full transition-all duration-200 ${slot.isAvailable ? 'hover:bg-blue-50 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' : 'opacity-50'}`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-sm font-medium">{slot.startTime}</span>
                <span className="text-xs text-gray-500">to</span>
                <span className="text-sm font-medium">{slot.endTime}</span>
              </div>
            </Button>
          ))}
        </div>
        {availableSlots.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No available slots for this date
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Please try selecting a different date
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};