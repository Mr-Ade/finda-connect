export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface LocationData {
  city?: string;
  address?: string;
  state?: string;
  country?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}