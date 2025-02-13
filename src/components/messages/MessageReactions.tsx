
import { useState } from "react";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface MessageReactionsProps {
  messageId: string;
  reactions: Array<{
    reaction: string;
    user_id: string;
  }>;
}

export const MessageReactions = ({ messageId, reactions }: MessageReactionsProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const addReaction = async (emoji: string) => {
    try {
      await supabase
        .from('message_reactions')
        .insert({
          message_id: messageId,
          reaction: emoji
        });
      setShowPicker(false);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const removeReaction = async (emoji: string) => {
    try {
      await supabase
        .from('message_reactions')
        .delete()
        .match({ 
          message_id: messageId,
          reaction: emoji 
        });
    } catch (error) {
      console.error('Error removing reaction:', error);
    }
  };

  const groupedReactions = reactions.reduce((acc, { reaction }) => {
    acc[reaction] = (acc[reaction] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {Object.entries(groupedReactions).map(([emoji, count]) => (
        <Button
          key={emoji}
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={() => removeReaction(emoji)}
        >
          {emoji} {count}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={() => setShowPicker(!showPicker)}
      >
        <Smile className="h-4 w-4" />
      </Button>
      {showPicker && (
        <div className="absolute bottom-full mb-2 bg-background border rounded-lg p-2 shadow-lg">
          {["👍", "❤️", "😂", "😮", "😢", "👏"].map(emoji => (
            <button
              key={emoji}
              className="p-1 hover:bg-muted rounded"
              onClick={() => addReaction(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
