import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";

export const BasicInfo = () => {
  const { formData, updateFormData } = useBusinessForm();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <FileText className="w-5 h-5" />
        <h3 className="font-medium">Basic Information</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Listing Title</Label>
          <Input 
            id="title" 
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Enter business name" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">About Listing</Label>
          <Textarea 
            id="description" 
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Describe your business"
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input 
            id="keywords" 
            value={formData.keywords.join(", ")}
            onChange={(e) => updateFormData('keywords', e.target.value.split(",").map(k => k.trim()))}
            placeholder="Type keywords separated by commas" 
          />
        </div>
      </CardContent>
    </Card>
  );
};