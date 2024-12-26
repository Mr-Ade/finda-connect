import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookmarkButtonProps {
  businessId: string;
}

export const BookmarkButton = ({ businessId }: BookmarkButtonProps) => {
  const [isBookmarking, setIsBookmarking] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    setIsBookmarking(true);

    const { error } = await supabase
      .from("bookmarks")
      .insert({
        business_id: businessId,
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to bookmark. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "Business bookmarked!",
      });
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    }

    setIsBookmarking(false);
  };

  return (
    <Button
      onClick={handleBookmark}
      disabled={isBookmarking}
      className="w-full"
      variant="outline"
    >
      <Bookmark className="w-4 h-4 mr-2" />
      Bookmark
    </Button>
  );
};