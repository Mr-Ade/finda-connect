import { addDays, format, isWithinInterval, parse, startOfDay } from "date-fns";

export interface BusinessHour {
  day_of_week: number;
  open_time: string;
  close_time: string;
  is_closed: boolean | null;
}

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