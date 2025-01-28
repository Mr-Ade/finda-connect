import type { Database } from "./database";

export type Appointment = Database['public']['Tables']['appointments']['Row'] & {
  business?: {
    name: string;
  };
};

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'transfer' | null;