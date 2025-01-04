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
  country?: string;
  state?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}