import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TypingIndicatorProps {
  userId: string;
  setIsTyping: (isTyping: boolean) => void;
}

export const TypingIndicator = ({ userId, setIsTyping }: TypingIndicatorProps) => {
  useEffect(() => {
    if (!userId) return;

    const typingChannel = supabase
      .channel('typing_channel')
      .on(
        'presence',
        { event: 'sync' },
        () => {
          const state = typingChannel.presenceState() as Record<string, Array<{
            user_id: string;
            isTyping: boolean;
            presence_ref: string;
          }>>;
          const otherUserTyping = Object.values(state).some(
            presences => presences.some(presence => 
              presence.user_id === userId && presence.isTyping
            )
          );
          setIsTyping(otherUserTyping);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(typingChannel);
    };
  }, [userId, setIsTyping]);

  return null;
};