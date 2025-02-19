import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase/database.types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database error handler
export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Utility function to handle database errors
export const handleDatabaseError = (error: any): never => {
  console.error('Database operation failed:', error);
  throw new DatabaseError(
    'An error occurred while accessing the database',
    error
  );
};

// Generic database query wrapper with error handling
export async function query<T>(
  operation: () => Promise<{ data: T | null; error: any }>
): Promise<T> {
  try {
    const { data, error } = await operation();
    if (error) throw error;
    if (!data) throw new Error('No data returned from the query');
    return data;
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// Real-time subscription manager
export class RealtimeSubscriptionManager {
  private subscriptions: { [key: string]: () => void } = {};

  subscribe(channel: string, callback: () => void) {
    if (this.subscriptions[channel]) {
      console.warn(`Subscription to ${channel} already exists`);
      return;
    }
    this.subscriptions[channel] = callback;
  }

  unsubscribe(channel: string) {
    if (this.subscriptions[channel]) {
      this.subscriptions[channel]();
      delete this.subscriptions[channel];
    }
  }

  unsubscribeAll() {
    Object.keys(this.subscriptions).forEach(channel => {
      this.unsubscribe(channel);
    });
  }
}

export const realtimeManager = new RealtimeSubscriptionManager();

// Connection state management
export const getConnectionState = async () => {
  try {
    const { error } = await supabase.from('health_check').select('count').single();
    return !error;
  } catch {
    return false;
  }
};

// Auto-retry utility for failed operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}