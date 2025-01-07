import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MessageThread = ({ userId }: { userId: string }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  
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
          )
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

    // Subscribe to new messages
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${userId},receiver_id=eq.${supabase.auth.user()?.id}`
        },
        () => {
          // Invalidate and refetch messages
          queryClient.invalidateQueries(['messages', userId]);
        }
      )
      .subscribe();

    // Subscribe to typing indicators
    const typingChannel = supabase
      .channel('typing_channel')
      .on(
        'presence',
        { event: 'sync' },
        () => {
          const state = typingChannel.presenceState();
          const otherUserTyping = Object.values(state).some(
            presence => presence.user_id === userId && presence.isTyping
          );
          setIsTyping(otherUserTyping);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(typingChannel);
    };
  }, [userId]);

  // Handle typing indicator
  useEffect(() => {
    if (!userId || !newMessage) return;

    const typingChannel = supabase.channel('typing_channel');
    
    const updateTypingStatus = async () => {
      await typingChannel.track({
        user_id: supabase.auth.user()?.id,
        isTyping: newMessage.length > 0
      });
    };

    updateTypingStatus();

    return () => {
      typingChannel.untrack();
    };
  }, [newMessage, userId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: session.user.id,
          receiver_id: userId,
          content: newMessage.trim()
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
            const isSentByUser = message.sender_id === message.sender.id;
            return (
              <div
                key={message.id}
                className={`flex ${isSentByUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isSentByUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
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
      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};