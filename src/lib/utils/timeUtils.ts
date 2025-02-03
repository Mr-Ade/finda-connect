import { format, parse } from "date-fns";

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