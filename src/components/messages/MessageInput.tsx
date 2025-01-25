import { useState, useRef } from "react";
import { Send, Image as ImageIcon, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MessageInputProps {
  onSend: (content: string, type?: string, attachmentUrl?: string) => void;
  replyingTo?: { id: string; content: string } | null;
  onCancelReply?: () => void;
}

export const MessageInput = ({ onSend, replyingTo, onCancelReply }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number>();

  const handleFileUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let type = 'file';
      if (file.type.startsWith('image/')) type = 'image';
      if (file.type.startsWith('video/')) type = 'video';
      if (file.type.startsWith('audio/')) type = 'voice';

      const { data, error } = await supabase.storage
        .from('messages')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('messages')
        .getPublicUrl(filePath);

      onSend(message, type, publicUrl);
      setMessage("");
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await handleFileUpload(new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' }));
        stream.getTracks().forEach(track => track.stop());
        // Clear the timer interval
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = undefined;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer using the ref
      const startTime = Date.now();
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Failed to start recording",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      // Clear interval is handled in onstop handler
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

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