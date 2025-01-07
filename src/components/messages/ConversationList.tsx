import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

type Conversation = {
  profile: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  last_message: {
    content: string;
    created_at: string;
  };
  is_online?: boolean;
};

export const ConversationList = ({ 
  selectedUserId,
  onSelectConversation 
}: { 
  selectedUserId?: string;
  onSelectConversation: (userId: string) => void;
}) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      // Get unique conversations by combining sent and received messages
      const { data, error } = await supabase
        .from('messages')
        .select(`
          sender_id,
          receiver_id,
          content,
          created_at,
          profiles!messages_sender_id_fkey (
            id,
            full_name,
            avatar_url,
            last_seen
          )
        `)
        .or(`sender_id.eq.${session.user.id},receiver_id.eq.${session.user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process conversations to get unique users and their last message
      const conversationsMap = new Map<string, Conversation>();
      
      data.forEach(message => {
        const isUserSender = message.sender_id === session.user.id;
        const otherUserId = isUserSender ? message.receiver_id : message.sender_id;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            profile: {
              id: otherUserId,
              full_name: message.profiles?.full_name || 'Unknown User',
              avatar_url: message.profiles?.avatar_url
            },
            last_message: {
              content: message.content,
              created_at: message.created_at
            }
          });
        }
      });

      return Array.from(conversationsMap.values());
    }
  });

  useEffect(() => {
    // Subscribe to presence updates
    const channel = supabase.channel('online_users')
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const online = new Set(
          Object.values(state)
            .flat()
            .map((user: any) => user.user_id)
        );
        setOnlineUsers(online);
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;
        
        await channel.track({
          user_id: session.user.id,
          online_at: new Date().toISOString(),
        });
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-2 p-4">
        {conversations?.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            <MessageSquare className="mx-auto h-8 w-8 mb-2" />
            <p>No conversations yet</p>
          </div>
        ) : (
          conversations?.map((conversation) => {
            const isOnline = onlineUsers.has(conversation.profile.id);
            return (
              <button
                key={conversation.profile.id}
                onClick={() => onSelectConversation(conversation.profile.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  selectedUserId === conversation.profile.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {conversation.profile.avatar_url ? (
                      <img
                        src={conversation.profile.avatar_url}
                        alt={conversation.profile.full_name || ''}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <MessageSquare className="w-5 h-5" />
                    )}
                  </div>
                  {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">
                    {conversation.profile.full_name || 'Unknown User'}
                  </p>
                  <p className="text-sm truncate text-muted-foreground">
                    {conversation.last_message.content}
                  </p>
                </div>
              </button>
            )
          })
        )}
      </div>
    </ScrollArea>
  );
};