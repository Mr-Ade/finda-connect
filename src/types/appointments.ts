import type { Database } from "./supabase/database";

export interface AppointmentSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface BusinessAvailability {
  businessId: string;
  dayOfWeek: number; // 0-6 for Sunday-Saturday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  slotDuration: number; // in minutes
  breakTime: number; // in minutes
}

export interface AppointmentFormData {
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  service?: string;
}

export interface AppointmentService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  businessId: string;
}

export type AppointmentFilters = {
  status?: string;
  startDate?: Date;
  endDate?: Date;
  businessId?: string;
  userId?: string;
};

export type AppointmentWithBusinessDetails = Database['public']['Tables']['appointments']['Row'] & {
  business: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  service?: AppointmentService;
};