import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2 } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const BasicInfo = () => {
  const { formData, updateFormData, isSubmitting } = useBusinessForm();
  const { toast } = useToast();
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    keywords?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Business name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Business name must be at least 3 characters";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Business description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (formData.keywords && formData.keywords.some(k => k.length < 2)) {
      newErrors.keywords = "Each keyword must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKeywordsChange = (value: string) => {
    try {
      const keywords = value.split(",")
        .map(k => k.trim())
        .filter(k => k.length > 0);
      updateFormData('keywords', keywords);
      
      // Clear keyword error when input is valid
      if (errors.keywords) {
        setErrors(prev => ({ ...prev, keywords: undefined }));
      }
    } catch (error) {
      toast({
        title: "Invalid keywords format",
        description: "Please enter keywords separated by commas",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    field: 'name' | 'description',
    value: string
  ) => {
    updateFormData(field, value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter business name"
            required
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="required">About Business</Label>
          <Textarea 
            id="description" 
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your business"
            className={`min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
            required
            disabled={isSubmitting}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input 
            id="keywords" 
            value={formData.keywords?.join(", ") || ''}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            placeholder="Type keywords separated by commas (e.g. restaurant, italian, pizza)" 
            disabled={isSubmitting}
            aria-invalid={!!errors.keywords}
            className={errors.keywords ? "border-destructive" : ""}
          />
          {errors.keywords ? (
            <p className="text-sm text-destructive">{errors.keywords}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Keywords help customers find your business. Separate them with commas.
            </p>
          )}
        </div>

        {isSubmitting && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saving changes...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};