import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image, Plus, X, Video, Store, Coffee, Building2, User, Loader, ImageOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface ImageGalleryProps {
  businessId: string;
  isOwner: boolean;
}

export const ImageGallery = ({ businessId, isOwner }: ImageGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<BusinessPhoto | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('all');
  const { toast } = useToast();
  
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, category: string = 'all') => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      
      for (const file of files) {
        // Check file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "File size must be less than 2MB",
          });
          continue;
        }

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
            category: category as PhotoCategory,
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

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Images & Gallery</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo Upload */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Upload Logo</h4>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'logo')}
                disabled={uploading}
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Drop files here to upload</p>
                <p className="text-xs text-gray-500">Maximum file size: 2 MB</p>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Featured Image Upload */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Featured Image</h4>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <input
                type="file"
                id="featured-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'featured')}
                disabled={uploading}
              />
              <label htmlFor="featured-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Drop files here to upload</p>
                <p className="text-xs text-gray-500">Maximum file size: 2 MB</p>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Image Gallery Upload */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-medium mb-4">Image Gallery</h4>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <input
                type="file"
                id="gallery-upload"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
                disabled={uploading}
              />
              <label htmlFor="gallery-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Drop files here to upload</p>
                <p className="text-xs text-gray-500">Maximum file size: 2 MB</p>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Preview Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPhotos?.map((photo, index) => (
                <div key={photo.id} className="relative group">
                  <Dialog>
                    <DialogTrigger>
                      <div className="relative cursor-pointer">
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
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {index > 0 && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReorder(photo.id, index - 1);
                                }}
                                className="text-white hover:text-white/80"
                              >
                                ↑
                              </Button>
                            )}
                            {index < (filteredPhotos.length - 1) && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReorder(photo.id, index + 1);
                                }}
                                className="text-white hover:text-white/80"
                              >
                                ↓
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(photo.id);
                              }}
                              className="absolute top-2 right-2"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
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
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {(!photos || photos.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No photos yet</p>
        </div>
      )}
    </div>
  );
};
