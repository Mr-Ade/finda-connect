
import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, Paperclip, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadHandler } from "./FileUploadHandler";
import { VoiceRecorder } from "./VoiceRecorder";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface MessageInputProps {
  onSend: (content: string, type?: string, attachmentUrl?: string) => void;
  replyingTo?: { id: string; content: string } | null;
  onCancelReply?: () => void;
}

export const MessageInput = ({ onSend, replyingTo, onCancelReply }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ name: string; size: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { handleFileUpload } = FileUploadHandler({ 
    onUploadComplete: (message, type, url) => {
      onSend(message, type, url);
      setMessage("");
      setIsUploading(false);
      setUploadProgress(0);
      setPreviewFile(null);
    },
    onProgress: (progress) => {
      setUploadProgress(progress);
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

  // Handle paste events for images
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            setIsUploading(true);
            setPreviewFile({ name: 'Pasted image', size: file.size });
            await handleFileUpload(file);
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to send
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (message.trim()) {
          onSend(message);
          setMessage("");
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [message, onSend]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="p-4 border-t flex flex-col gap-2">
      {replyingTo && (
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted p-2 rounded">
          <span className="truncate flex-1">Replying to: {replyingTo.content}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2"
            onClick={onCancelReply}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isUploading && previewFile && (
        <div className="bg-muted p-2 rounded flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span className="truncate">{previewFile.name}</span>
              <span>{formatFileSize(previewFile.size)}</span>
            </div>
            <Progress value={uploadProgress} className="h-1 mt-1" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => {
              setIsUploading(false);
              setUploadProgress(0);
              setPreviewFile(null);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message... (Ctrl + Enter to send)"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (message.trim()) {
                onSend(message);
                setMessage("");
              }
            }
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setIsUploading(true);
              setPreviewFile({ name: file.name, size: file.size });
              handleFileUpload(file);
            }
          }}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Attach file (or paste an image)
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={isRecording ? stopRecording : startRecording}
                className={isRecording ? "text-red-500" : ""}
                disabled={isUploading}
              >
                <Mic className="h-4 w-4" />
                {isRecording && <span className="ml-2">{recordingTime}s</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isRecording ? "Stop recording" : "Start voice message"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="submit" 
                size="icon"
                onClick={() => {
                  if (message.trim()) {
                    onSend(message);
                    setMessage("");
                  }
                }}
                disabled={!message.trim() || isUploading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Send message (Ctrl + Enter)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
