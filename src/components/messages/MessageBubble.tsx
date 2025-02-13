
import { MessageAttachment } from "./MessageAttachment";
import { MessageReactions } from "./MessageReactions";

interface MessageBubbleProps {
  message: any;
  isSentByMe: boolean;
  setReplyingTo: (message: { id: string; content: string } | null) => void;
}

export const MessageBubble = ({ message, isSentByMe, setReplyingTo }: MessageBubbleProps) => {
  const replyingToMessage = message.reply_to ? message : null;

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
};
