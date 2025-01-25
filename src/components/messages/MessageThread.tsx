import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { MessageInput } from "./MessageInput";
import { MessageAttachment } from "./MessageAttachment";
import { MessageReactions } from "./MessageReactions";

interface PresenceState {
  user_id: string;
  isTyping: boolean;
  presence_ref: string;
}

export const MessageThread = ({ userId }: { userId: string }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: string; content: string } | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  });

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages', userId],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (
            id,
            full_name,
            avatar_url
          ),
          receiver:profiles!messages_receiver_id_fkey (
            id,
            full_name,
            avatar_url
          ),
          reactions:message_reactions(*)
        `)
        .or(`and(sender_id.eq.${session.user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${session.user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

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

    const typingChannel = supabase
      .channel('typing_channel')
      .on(
        'presence',
        { event: 'sync' },
        () => {
          const state = typingChannel.presenceState() as Record<string, PresenceState[]>;
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
      supabase.removeChannel(channel);
      supabase.removeChannel(typingChannel);
    };
  }, [userId, queryClient]);

  const sendMessage = async (content: string, type = 'text', attachmentUrl?: string) => {
    if (!content.trim() && !attachmentUrl) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    if (!userProfile) {
      toast({
        title: "Error",
        description: "Please complete your profile before sending messages",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: session.user.id,
          receiver_id: userId,
          content: content.trim(),
          message_type: type,
          attachment_url: attachmentUrl,
          reply_to: replyingTo?.id
        });

      if (error) throw error;
      setReplyingTo(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  if (!userId) {
    return (
      <div className="h-[600px] flex items-center justify-center text-muted-foreground">
        Select a conversation to start messaging
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4">Loading messages...</div>;
  }

  return (
    <div className="h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages?.map((message) => {
            const isSentByMe = message.sender_id === userProfile?.id;
            const replyingToMessage = messages.find(m => m.id === message.reply_to);

            return (
              <div
                key={message.id}
                className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} items-start gap-2`}
              >
                {!isSentByMe && message.sender?.avatar_url && (
                  <img 
                    src={message.sender.avatar_url} 
                    alt={message.sender.full_name || 'User avatar'} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="flex flex-col gap-1">
                  {replyingToMessage && (
                    <div className={`text-sm ${isSentByMe ? 'text-right' : 'text-left'} text-muted-foreground`}>
                      Replying to: {replyingToMessage.content}
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isSentByMe
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    {!isSentByMe && message.sender?.full_name && (
                      <div className="text-sm font-medium mb-1 text-muted-foreground">
                        {message.sender.full_name}
                      </div>
                    )}
                    {message.content && <p>{message.content}</p>}
                    {message.attachment_url && (
                      <MessageAttachment 
                        type={message.message_type} 
                        url={message.attachment_url} 
                      />
                    )}
                    <MessageReactions 
                      messageId={message.id} 
                      reactions={message.reactions || []} 
                    />
                  </div>
                </div>
                {isSentByMe && message.sender?.avatar_url && (
                  <img 
                    src={message.sender.avatar_url} 
                    alt={message.sender.full_name || 'Your avatar'} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            );
          })}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Typing...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <MessageInput 
        onSend={sendMessage}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />
    </div>
  );
};