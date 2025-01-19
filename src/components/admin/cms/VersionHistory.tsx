import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface VersionHistoryProps {
  pageId: string;
  onRestore: (version: any) => void;
}

export const VersionHistory = ({ pageId, onRestore }: VersionHistoryProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data: versions, isLoading } = useQuery({
    queryKey: ['cms-page-versions', pageId],
    queryFn: async () => {
      console.log('Fetching page versions for:', pageId);
      const { data, error } = await supabase
        .from('cms_page_revisions')
        .select('*')
        .eq('page_id', pageId)
        .order('version', { ascending: false });

      if (error) {
        console.error('Error fetching page versions:', error);
        toast({
          title: "Error fetching versions",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data || [];
    },
    enabled: !!pageId && isOpen
  });

  const handleRestore = (version: any) => {
    onRestore(version);
    setIsOpen(false);
    toast({
      title: "Version restored",
      description: `Restored to version ${version.version}`
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          Version History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Version History</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              Loading versions...
            </div>
          ) : versions?.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No version history available
            </div>
          ) : (
            <div className="space-y-4">
              {versions?.map((version) => (
                <div
                  key={version.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">Version {version.version}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(version.created_at).toLocaleString()}
                    </div>
                    <div className="mt-1 text-sm">
                      Status: {version.status}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(version)}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};