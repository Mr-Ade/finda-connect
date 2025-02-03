import { addDays, format, isWithinInterval, parse, startOfDay } from "date-fns";
import { BusinessHour } from "@/types/business";

export const formatTimeDisplay = (time: string) => {
  if (!time) return "";
  try {
    const date = parse(time, "HH:mm", new Date());
    return format(date, "h:mm a");
  } catch (e) {
    console.error("Error formatting time:", e);
    return time;
  }
};

export const validateTimeRange = (openTime: string, closeTime: string): boolean => {
  if (!openTime || !closeTime) return false;
  try {
    const open = parse(openTime, "HH:mm", new Date());
    const close = parse(closeTime, "HH:mm", new Date());
    return open < close;
  } catch (e) {
    console.error("Error validating time range:", e);
    return false;
  }
};

export const isBusinessOpen = (hours: BusinessHour[] | null): boolean => {
  if (!hours || hours.length === 0) return false;

  const now = new Date();
  const currentDay = now.getDay();
  const todayHours = hours.find(h => h.day_of_week === currentDay);

  if (!todayHours || todayHours.is_closed) return false;

  const today = startOfDay(now);
  
  const openTime = parse(todayHours.open_time, 'HH:mm:ss', today);
  let closeTime = parse(todayHours.close_time, 'HH:mm:ss', today);
  
  // If closing time is before opening time, assume it's the next day
  if (closeTime < openTime) {
    closeTime = addDays(closeTime, 1);
  }

  return isWithinInterval(now, { start: openTime, end: closeTime });
};

export const formatBusinessHours = (hour: BusinessHour): string => {
  if (hour.is_closed) return "Closed";
  
  const openTime = parse(hour.open_time, 'HH:mm:ss', new Date());
  const closeTime = parse(hour.close_time, 'HH:mm:ss', new Date());
  
  return `${format(openTime, 'h:mm a')} - ${format(closeTime, 'h:mm a')}`;
};

export const generateTimeOptions = () => {
  const options: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      options.push(
        `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      );
    }
  }
  return options;
};