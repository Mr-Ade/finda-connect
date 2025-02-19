import React, { useState } from 'react';
import { ConversationList } from './ConversationList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Conversation } from '@/types/messages';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const Chat: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const { user } = useAuth();

  const handleSendMessage = async (content: string, attachment?: File | Blob) => {
    if (!user || !selectedConversation) return;

    let attachmentData;
    if (attachment) {
      const fileName = attachment instanceof File ? attachment.name : `voice-${Date.now()}.wav`;
      const fileExt = fileName.split('.').pop();
      const filePath = `messages/${selectedConversation.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('attachments')
        .upload(filePath, attachment);

      if (uploadError) {
        console.error('Error uploading attachment:', uploadError);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('attachments')
        .getPublicUrl(filePath);

      attachmentData = {
        url: publicUrl,
        type: attachment instanceof File
          ? attachment.type.startsWith('image/') ? 'image' : 'file'
          : 'voice',
        name: fileName,
        size: attachment.size,
      };
    }

    const { error } = await supabase.from('messages').insert({
      conversationId: selectedConversation.id,
      senderId: user.id,
      content,
      type: attachmentData ? attachmentData.type : 'text',
      status: 'sent',
      attachment: attachmentData,
    });

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMessageStatusUpdate = async (messageId: string, status: 'delivered' | 'read') => {
    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', messageId);

    if (error) {
      console.error('Error updating message status:', error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <div className="w-80 border-r">
        <ConversationList
          onSelect={setSelectedConversation}
          selectedId={selectedConversation?.id}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-1 overflow-hidden">
              <MessageList
                conversation={selectedConversation}
                onMessageStatusUpdate={handleMessageStatusUpdate}
              />
            </div>
            <MessageInput
              conversationId={selectedConversation.id}
              onSend={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};