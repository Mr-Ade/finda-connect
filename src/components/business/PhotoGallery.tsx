import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image, Plus, X, Video, Store, Coffee, Building2, User, Loader, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useImageUpload } from "@/hooks/use-image-upload";

interface PhotoGalleryProps {
  businessId: string;
  isOwner: boolean;
}

type PhotoCategory = 'all' | 'inside' | 'outside' | 'videos' | 'owner' | 'menu';

interface BusinessPhoto {
  id: string;
  photo_url: string;
  category: PhotoCategory;
  caption?: string;
  is_video: boolean;
  business_id: string;
  created_at: string;
  updated_at: string;
  order_index: number;
}

export const PhotoGallery = ({ businessId, isOwner }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<BusinessPhoto | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('all');
  const { toast } = useToast();
  const { uploadImage } = useImageUpload("business-images");
  
  const { data: photos, isLoading, error, refetch } = useQuery({
    queryKey: ["business-photos", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_photos")
        .select("*")
        .eq("business_id", businessId)
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Error fetching photos:", error);
        throw error;
      }

      return data as BusinessPhoto[];
    },
  });

  const filteredPhotos = photos?.filter(photo => 
    selectedCategory === 'all' || photo.category === selectedCategory
  );
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${businessId}/${crypto.randomUUID()}.${fileExt}`;
        const isVideo = file.type.startsWith('video/');

        // Optimize image before upload
        const optimizedFile = await optimizeImage(file);
        const { url: publicUrl, error: uploadError } = await uploadImage(optimizedFile, filePath);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to upload file",
          });
          continue;
        }

        const { error: dbError } = await supabase
          .from("business_photos")
          .insert({
            business_id: businessId,
            photo_url: publicUrl,
            category: selectedCategory,
            is_video: isVideo,
            order_index: (photos?.length || 0) + 1,
          });

        if (dbError) {
          console.error("Error saving photo record:", dbError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save photo information",
          });
        }
      }

      refetch();
      toast({
        title: "Success",
        description: "Photos uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setUploading(false);
    }
  }, [businessId, photos?.length, refetch, selectedCategory, toast, uploadImage]);
  const optimizeImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;

    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        // Max dimensions
        const maxWidth = 1920;
        const maxHeight = 1080;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              }));
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.8
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="inside">Inside</TabsTrigger>
          <TabsTrigger value="outside">Outside</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="owner">Owner</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isOwner && (
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <Card className="h-48 flex items-center justify-center border-dashed">
                  {uploading ? (
                    <Loader className="h-8 w-8 animate-spin text-gray-400" />
                  ) : (
                    <Plus className="h-8 w-8 text-gray-400" />
                  )}
                </Card>
              </label>
            )}

            {filteredPhotos?.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <Card className="h-48 cursor-pointer overflow-hidden transition-transform hover:scale-105">
                    {photo.is_video ? (
                      <video
                        src={photo.photo_url}
                        className="h-full w-full object-cover"
                        controls={false}
                      />
                    ) : (
                      <img
                        src={photo.photo_url}
                        alt={photo.caption || "Business photo"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  {photo.is_video ? (
                    <video
                      src={photo.photo_url}
                      className="w-full"
                      controls
                      autoPlay
                    />
                  ) : (
                    <img
                      src={photo.photo_url}
                      alt={photo.caption || "Business photo"}
                      className="w-full"
                    />
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};