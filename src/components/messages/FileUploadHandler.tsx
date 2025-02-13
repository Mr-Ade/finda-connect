
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadHandlerProps {
  onUploadComplete: (message: string, type: string, url: string) => void;
  onProgress?: (progress: number) => void;
  message: string;
}

export const FileUploadHandler = ({ onUploadComplete, onProgress, message }: FileUploadHandlerProps) => {
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let type = 'file';
      if (file.type.startsWith('image/')) type = 'image';
      if (file.type.startsWith('video/')) type = 'video';
      if (file.type.startsWith('audio/')) type = 'voice';

      // Create a FormData instance to track progress
      const formData = new FormData();
      formData.append('file', file);

      // Use XMLHttpRequest to track progress
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          onProgress?.(percentage);
        }
      };

      const { data, error } = await supabase.storage
        .from('messages')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('messages')
        .getPublicUrl(filePath);

      onUploadComplete(message, type, publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    }
  };

  return { handleFileUpload };
};
