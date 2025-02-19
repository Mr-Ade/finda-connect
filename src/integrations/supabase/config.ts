import { SupabaseClientOptions } from '@supabase/supabase-js';

export const supabaseConfig: SupabaseClientOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'finda-connect'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  // Configure connection pool settings
  pool: {
    max: 10, // Maximum number of connections in pool
    min: 2,  // Minimum number of connections in pool
    idleTimeoutMillis: 30000, // How long a connection can be idle before being removed
    connectionTimeoutMillis: 2000 // How long to wait for a connection
  }
};