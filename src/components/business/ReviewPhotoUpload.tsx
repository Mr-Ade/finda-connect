import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useToast } from "@/hooks/use-toast";

interface ReviewPhotoUploadProps {
  reviewId: string;
  onPhotoUploaded: () => void;
}

export const ReviewPhotoUpload = ({ reviewId, onPhotoUploaded }: ReviewPhotoUploadProps) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadImage } = useImageUpload("business-images");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + photos.length > 3) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload up to 3 photos per review",
      });
      return;
    }
    setPhotos([...photos, ...files]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleUploadPhotos = async () => {
    try {
      setIsUploading(true);
      const uploadPromises = photos.map(async (photo) => {
        const url = await uploadImage(photo);
        if (url) {
          const { error } = await supabase
            .from("review_photos")
            .insert({
              review_id: reviewId,
              photo_url: url,
            });
          
          if (error) throw error;
          return url;
        }
      });

      await Promise.all(uploadPromises);
      setPhotos([]);
      onPhotoUploaded();
      toast({
        title: "Success",
        description: "Photos uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload photos. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <div className="w-24 h-24 border rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Review photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {photos.length < 3 && (
          <label className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <ImageIcon className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Add Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          </label>
        )}
      </div>
      {photos.length > 0 && (
        <Button
          onClick={handleUploadPhotos}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Photos
            </>
          )}
        </Button>
      )}
    </div>
  );
};