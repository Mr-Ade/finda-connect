import { BusinessHour } from "@/types/business";
import { formatBusinessHours } from "@/lib/utils/businessHours";
import { Skeleton } from "@/components/ui/skeleton";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface WorkingHoursDisplayProps {
  hours: BusinessHour[] | null;
  isLoading?: boolean;
  className?: string;
}

export const WorkingHoursDisplay = ({ 
  hours, 
  isLoading = false,
  className = ""
}: WorkingHoursDisplayProps) => {
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array(7).fill(0).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {DAYS.map((day, index) => {
        const dayHours = hours?.find((h) => h.day_of_week === index);
        
        return (
          <div
            key={day}
            className="flex justify-between items-center"
          >
            <span className="font-medium w-32">{day}</span>
            <span className="text-gray-600">
              {dayHours ? formatBusinessHours(dayHours) : "Not available"}
            </span>
          </div>
        );
      })}
    </div>
  );
};