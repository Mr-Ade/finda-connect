import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image, Plus, X, Video, Store, Coffee, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  
  const { data: photos, refetch } = useQuery({
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${businessId}/${crypto.randomUUID()}.${fileExt}`;
        const isVideo = file.type.startsWith('video/');

        const { error: uploadError } = await supabase.storage
          .from("business-images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to upload file",
          });
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("business-images")
          .getPublicUrl(filePath);

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
            description: "Failed to save file information",
          });
        }
      }

      refetch();
      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while uploading files",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    try {
      const { error } = await supabase
        .from("business_photos")
        .delete()
        .eq("id", photoId);

      if (error) throw error;

      refetch();
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete file",
      });
    }
  };

  const categories = [
    { id: 'all', label: 'All', icon: Image },
    { id: 'inside', label: 'Inside', icon: Building2 },
    { id: 'outside', label: 'Outside', icon: Store },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'owner', label: 'By Owner', icon: User },
    { id: 'menu', label: 'Food & Drinks', icon: Coffee },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Photos & Videos</h3>
          {isOwner && (
            <div>
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={uploading}
                  asChild
                >
                  <span>
                    <Plus className="w-4 h-4 mr-2" />
                    Add photos & videos
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSelectedCategory(value as PhotoCategory)}>
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <category.icon className="w-4 h-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Carousel className="w-full">
                <CarouselContent>
                  {filteredPhotos?.map((photo) => (
                    <CarouselItem key={photo.id} className="basis-1/3">
                      <Dialog>
                        <DialogTrigger>
                          <div className="relative group cursor-pointer">
                            {photo.is_video ? (
                              <video 
                                src={photo.photo_url}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ) : (
                              <img
                                src={photo.photo_url}
                                alt={photo.caption || "Business photo"}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            )}
                            {isOwner && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(photo.id);
                                }}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          {photo.is_video ? (
                            <video 
                              src={photo.photo_url}
                              controls
                              className="w-full h-auto"
                            />
                          ) : (
                            <img
                              src={photo.photo_url}
                              alt={photo.caption || "Business photo"}
                              className="w-full h-auto"
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>

        {(!photos || photos.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No photos yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};