import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ycmugolragcyqogscqhl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbXVnb2xyYWdjeXFvZ3NjcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMzM4MDIsImV4cCI6MjA1MDcwOTgwMn0.cFUe9GmvZ559aP4OZwAm3_PXI-0wUdDBuxQiZoh3j2o";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});