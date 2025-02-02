import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import type { ProfileUpdate } from '@/types/profile';

export const useProfileRealtime = (
  userId: string,
  onProfileUpdate: (profile: ProfileUpdate) => void
) => {
  useEffect(() => {
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<ProfileUpdate>) => {
          if (payload.eventType === 'UPDATE' && 'new' in payload) {
            console.log('Profile updated:', payload.new);
            onProfileUpdate(payload.new as ProfileUpdate);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onProfileUpdate]);
};