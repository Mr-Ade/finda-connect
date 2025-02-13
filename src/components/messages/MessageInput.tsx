
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
    <div className="p-4 border-t flex flex-col gap-3 bg-background shadow-sm">
      {replyingTo && (
        <div className="flex items-center justify-between text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-1 h-4 bg-blue-500 rounded-full" />
            <span className="truncate">Replying to: {replyingTo.content}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 hover:bg-blue-100 dark:hover:bg-blue-900"
            onClick={onCancelReply}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isUploading && previewFile && (
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-100 dark:border-orange-800 flex items-center gap-3">
          <Paperclip className="h-4 w-4 text-orange-500" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="truncate font-medium">{previewFile.name}</span>
              <span className="text-muted-foreground">{formatFileSize(previewFile.size)}</span>
            </div>
            <Progress value={uploadProgress} className="h-1.5 bg-orange-100 dark:bg-orange-900">
              <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </Progress>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-orange-100 dark:hover:bg-orange-900 rounded-full"
            onClick={() => {
              setIsUploading(false);
              setUploadProgress(0);
              setPreviewFile(null);
            }}
          >
            <X className="h-4 w-4 text-orange-500" />
          </Button>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message... (Ctrl + Enter to send)"
          className="flex-1 h-11 px-4 bg-muted/50"
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
                className="h-11 w-11 rounded-full hover:bg-muted transition-colors"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover/95 backdrop-blur-sm">
              Attach file (or paste an image)
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className={`h-11 w-11 rounded-full transition-colors ${
                  isRecording 
                    ? "bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40" 
                    : "hover:bg-muted"
                }`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isUploading}
              >
                <div className="relative">
                  <Mic className="h-5 w-5" />
                  {isRecording && (
                    <div className="absolute -top-1 -right-1 w-2 h-2">
                      <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping" />
                      <div className="absolute w-full h-full bg-red-500 rounded-full" />
                    </div>
                  )}
                </div>
                {isRecording && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {recordingTime}s
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover/95 backdrop-blur-sm">
              {isRecording ? "Stop recording" : "Start voice message"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="submit" 
                size="icon"
                className={`h-11 w-11 rounded-full transition-all duration-200 ${
                  message.trim() 
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900" 
                    : "bg-muted text-muted-foreground"
                }`}
                onClick={() => {
                  if (message.trim()) {
                    onSend(message);
                    setMessage("");
                  }
                }}
                disabled={!message.trim() || isUploading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover/95 backdrop-blur-sm">
              Send message (Ctrl + Enter)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
