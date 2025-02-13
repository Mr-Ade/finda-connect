
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadHandlerProps {
  onUploadComplete: (message: string, type: string, url: string) => void;
  message: string;
}

export const FileUploadHandler = ({ onUploadComplete, message }: FileUploadHandlerProps) => {
  const { toast } = useToast();

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
