import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { useEffect } from "react";

interface MessageListProps {
  messages: any[];
  userId: string;
  userProfile: any;
  isTyping: boolean;
  setReplyingTo: (message: { id: string; content: string } | null) => void;
}

export const MessageList = ({ messages, userId, userProfile, isTyping, setReplyingTo }: MessageListProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${userId},receiver_id=eq.${supabase.auth.getSession().then(({ data }) => data.session?.user.id)}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages', userId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages?.map((message) => (
          <MessageBubble 
            key={message.id}
            message={message}
            isSentByMe={message.sender_id === userProfile?.id}
            setReplyingTo={setReplyingTo}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Typing...</p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};