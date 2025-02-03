import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useToast } from "@/hooks/use-toast";

export const BasicInfo = () => {
  const { formData, updateFormData } = useBusinessForm();
  const { toast } = useToast();

  const handleKeywordsChange = (value: string) => {
    try {
      const keywords = value.split(",").map(k => k.trim()).filter(k => k.length > 0);
      updateFormData('keywords', keywords);
    } catch (error) {
      toast({
        title: "Invalid keywords format",
        description: "Please enter keywords separated by commas",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <FileText className="w-5 h-5" />
        <h3 className="font-medium">Basic Information</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="required">Business Name</Label>
          <Input 
            id="title" 
            value={formData.name || ''}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="required">About Business</Label>
          <Textarea 
            id="description" 
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Describe your business"
            className="min-h-[120px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input 
            id="keywords" 
            value={formData.keywords?.join(", ") || ''}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            placeholder="Type keywords separated by commas (e.g. restaurant, italian, pizza)" 
          />
          <p className="text-sm text-muted-foreground">
            Keywords help customers find your business. Separate them with commas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};