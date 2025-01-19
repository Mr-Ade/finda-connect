import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface CMSPageFormProps {
  id?: string;
  initialData?: any;
  onSuccess?: () => void;
}

export const CMSPageForm = ({ id, initialData, onSuccess }: CMSPageFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNewPage = id === 'new';

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
    meta_description: "",
    meta_keywords: "",
    page_type: "custom"
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      console.log('Saving CMS page:', data);
      const { data: result, error } = isNewPage
        ? await supabase.from('cms_pages').insert([data]).select().single()
        : await supabase.from('cms_pages').update(data).eq('id', id).select().single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
      toast({
        title: `Page ${isNewPage ? 'created' : 'updated'} successfully`,
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error('Error saving CMS page:', error);
      toast({
        title: `Error ${isNewPage ? 'creating' : 'updating'} page`,
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Page Type</label>
          <Select
            value={formData.page_type}
            onValueChange={(value) => setFormData({ ...formData, page_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">Custom</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="faq">FAQ</SelectItem>
              <SelectItem value="terms">Terms</SelectItem>
              <SelectItem value="privacy">Privacy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="min-h-[200px]"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta Description</label>
        <Input
          value={formData.meta_description || ''}
          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta Keywords</label>
        <Input
          value={formData.meta_keywords || ''}
          onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={saveMutation.isPending}>
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
    </form>
  );
};