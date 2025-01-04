import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Plus, X } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useState } from "react";

export const ImageGallery = () => {
  const { formData, updateFormData } = useBusinessForm();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData('logo', file);
    }
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData('featuredImage', file);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateFormData('galleryImages', files);

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeGalleryImage = (index: number) => {
    const newGalleryImages = [...formData.galleryImages];
    newGalleryImages.splice(index, 1);
    updateFormData('galleryImages', newGalleryImages);

    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <Image className="w-5 h-5" />
        <h3 className="font-medium">Image & Gallery</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="mb-1">Upload Logo</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleLogoChange}
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  <Image className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs">Maximum file size: 2 MB</p>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-1">Featured Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFeaturedImageChange}
                id="featured-upload"
              />
              <label htmlFor="featured-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  <Image className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs">Maximum file size: 2 MB</p>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-1">Gallery Images</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                multiple
                onChange={handleGalleryImagesChange}
                id="gallery-upload"
              />
              <label htmlFor="gallery-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  <Image className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs">Maximum file size: 2 MB</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Gallery preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};