import { Image, FileText, Video, Mic } from "lucide-react";

interface MessageAttachmentProps {
  type: string;
  url: string;
}

export const MessageAttachment = ({ type, url }: MessageAttachmentProps) => {
  if (!url) return null;

  switch (type) {
    case 'image':
      return (
        <div className="max-w-[300px] rounded-lg overflow-hidden">
          <img src={url} alt="Message attachment" className="w-full h-auto" />
        </div>
      );
    case 'video':
      return (
        <div className="max-w-[300px] rounded-lg overflow-hidden">
          <video src={url} controls className="w-full h-auto" />
        </div>
      );
    case 'voice':
      return (
        <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
          <Mic className="h-4 w-4" />
          <audio src={url} controls className="w-[200px]" />
        </div>
      );
    case 'file':
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-muted p-2 rounded-lg hover:bg-muted/80"
        >
          <FileText className="h-4 w-4" />
          <span className="text-sm">Download attachment</span>
        </a>
      );
    default:
      return null;
  }
};