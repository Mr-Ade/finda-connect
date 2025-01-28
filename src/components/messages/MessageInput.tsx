import { useState, useRef } from "react";
import { Send, Image as ImageIcon, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadHandler } from "./FileUploadHandler";
import { VoiceRecorder } from "./VoiceRecorder";

interface MessageInputProps {
  onSend: (content: string, type?: string, attachmentUrl?: string) => void;
  replyingTo?: { id: string; content: string } | null;
  onCancelReply?: () => void;
}

export const MessageInput = ({ onSend, replyingTo, onCancelReply }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileUpload } = FileUploadHandler({ 
    onUploadComplete: (message, type, url) => {
      onSend(message, type, url);
      setMessage("");
    },
    message 
  });

  const { 
    isRecording, 
    recordingTime, 
    startRecording, 
    stopRecording 
  } = VoiceRecorder({
    onRecordingComplete: (file) => handleFileUpload(file)
  });

  return (
    <div className="p-4 border-t flex flex-col gap-2">
      {replyingTo && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded">
          <span>Replying to message</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2"
            onClick={onCancelReply}
          >
            Cancel
          </Button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={isRecording ? stopRecording : startRecording}
          className={isRecording ? "text-red-500" : ""}
        >
          <Mic className="h-4 w-4" />
          {isRecording && <span className="ml-2">{recordingTime}s</span>}
        </Button>
        <Button 
          type="submit" 
          size="icon"
          onClick={() => {
            if (message.trim()) {
              onSend(message);
              setMessage("");
            }
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};