import { BusinessHour } from './business';

export interface BusinessSpecialHours {
  id: string;
  business_id: string;
  date: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessBreakTime {
  id: string;
  business_id: string;
  start_time: string;
  end_time: string;
  days: number[];
  created_at: string;
  updated_at: string;
}

export interface BusinessHoursState {
  regularHours: BusinessHour[];
  specialHours: BusinessSpecialHours[];
  breakTimes: BusinessBreakTime[];
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TimeRange {
  start: string;
  end: string;
}

export interface BusinessHoursFormData {
  regularHours: {
    [key in DayOfWeek]: {
      is_closed: boolean;
      hours: TimeRange;
    };
  };
  specialHours: BusinessSpecialHours[];
  breakTimes: BusinessBreakTime[];
}