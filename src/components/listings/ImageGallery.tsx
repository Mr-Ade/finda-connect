import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Plus, X } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/use-image-upload";

export const ImageGallery = () => {
  const { formData, updateFormData } = useBusinessForm();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { uploadImage, isUploading } = useImageUpload("business-images");

  const validateImage = (file: File) => {
    const maxSize = 800 * 1024; // 800KB
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPEG, PNG or WebP images only",
        variant: "destructive"
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Image must be less than 800KB",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      updateFormData('logo', file);
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleFeaturedImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      updateFormData('featuredImage', file);
      const url = URL.createObjectURL(file);
      setFeaturedPreview(url);
    }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(validateImage);
    
    if (validFiles.length) {
      updateFormData('galleryImages', validFiles);
      const urls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
    }
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

  const removeLogo = () => {
    updateFormData('logo', undefined);
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
  };

  const removeFeaturedImage = () => {
    updateFormData('featuredImage', undefined);
    if (featuredPreview) {
      URL.revokeObjectURL(featuredPreview);
      setFeaturedPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (featuredPreview) URL.revokeObjectURL(featuredPreview);
    };
  }, []);

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
            <div className="relative">
              <div className={`border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer ${logoPreview ? 'border-primary' : ''}`}>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleLogoChange}
                  id="logo-upload"
                  disabled={isUploading}
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  {logoPreview ? (
                    <div className="relative w-full h-32">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Image className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm">Click to upload</p>
                      <p className="text-xs">Maximum file size: 800KB</p>
                    </div>
                  )}
                </label>
              </div>
              {logoPreview && (
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-1">Featured Image</Label>
            <div className="relative">
              <div className={`border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer ${featuredPreview ? 'border-primary' : ''}`}>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFeaturedImageChange}
                  id="featured-upload"
                  disabled={isUploading}
                />
                <label htmlFor="featured-upload" className="cursor-pointer">
                  {featuredPreview ? (
                    <div className="relative w-full h-32">
                      <img 
                        src={featuredPreview} 
                        alt="Featured image preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Image className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm">Click to upload</p>
                      <p className="text-xs">Maximum file size: 800KB</p>
                    </div>
                  )}
                </label>
              </div>
              {featuredPreview && (
                <button
                  type="button"
                  onClick={removeFeaturedImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-1">Gallery Images</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleGalleryImagesChange}
                id="gallery-upload"
                disabled={isUploading}
              />
              <label htmlFor="gallery-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  <Image className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm">Click to upload</p>
                  <p className="text-xs">Maximum file size: 800KB</p>
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
                  disabled={isUploading}
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