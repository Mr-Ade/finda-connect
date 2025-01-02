import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";

export const ImageGallery = () => {
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
              <input type="file" className="hidden" accept="image/*" />
              <div className="text-gray-500">
                <Image className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Click to upload</p>
                <p className="text-xs">Maximum file size: 2 MB</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-1">Featured Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input type="file" className="hidden" accept="image/*" />
              <div className="text-gray-500">
                <Image className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Click to upload</p>
                <p className="text-xs">Maximum file size: 2 MB</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="mb-1">Gallery Images</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <input type="file" className="hidden" accept="image/*" multiple />
              <div className="text-gray-500">
                <Image className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Click to upload</p>
                <p className="text-xs">Maximum file size: 2 MB</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};