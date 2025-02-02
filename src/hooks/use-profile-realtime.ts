import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface ProfileUpdate {
  id: string;
  full_name?: string;
  avatar_url?: string;
  [key: string]: any;
}

export const useProfileRealtime = (onUpdate: (profile: ProfileUpdate) => void) => {
  useEffect(() => {
    const channel = supabase.channel('public:profiles')
      .on(
        'postgres_changes' as any,
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload: RealtimePostgresChangesPayload<ProfileUpdate>) => {
          if (payload.eventType === 'UPDATE' && payload.record) {
            onUpdate(payload.record);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
};