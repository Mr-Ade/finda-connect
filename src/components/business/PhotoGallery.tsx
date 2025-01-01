import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PhotoGalleryProps {
  businessId: string;
  isOwner: boolean;
}

export const PhotoGallery = ({ businessId, isOwner }: PhotoGalleryProps) => {
  const [uploading, setUploading] = useState(false);
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

      return data || [];
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${businessId}/${crypto.randomUUID()}.${fileExt}`;

        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from("business-images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to upload image",
          });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("business-images")
          .getPublicUrl(filePath);

        // Save photo record in database
        const { error: dbError } = await supabase
          .from("business_photos")
          .insert({
            business_id: businessId,
            photo_url: publicUrl,
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
        description: "An error occurred while uploading photos",
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
        description: "Photo deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete photo",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Photo Gallery</h3>
          {isOwner && (
            <div>
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
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
                    Add Photos
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>

        {photos?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No photos yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos?.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.photo_url}
                  alt={photo.caption || "Business photo"}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {isOwner && (
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};