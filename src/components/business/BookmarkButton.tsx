import { useState, useEffect } from "react";
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if business is already bookmarked on component mount
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookmarks")
        .select()
        .eq('business_id', businessId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking bookmark status:", error);
        return;
      }

      setIsBookmarked(!!data);
    };

    checkBookmarkStatus();
  }, [businessId]);

  const handleBookmark = async () => {
    setIsBookmarking(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to bookmark businesses",
      });
      setIsBookmarking(false);
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq('business_id', businessId)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsBookmarked(false);
        toast({
          title: "Success",
          description: "Bookmark removed!",
        });
      } else {
        // Add bookmark
        const { error } = await supabase
          .from("bookmarks")
          .insert({
            business_id: businessId,
            user_id: user.id
          });

        if (error) throw error;

        setIsBookmarked(true);
        toast({
          title: "Success",
          description: "Business bookmarked!",
        });
      }

      // Refresh business data
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
      queryClient.invalidateQueries({ queryKey: ["userBookmarks"] });
    } catch (error) {
      console.error("Bookmark error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
      });
    }

    setIsBookmarking(false);
  };

  return (
    <Button
      onClick={handleBookmark}
      disabled={isBookmarking}
      className="w-full"
      variant={isBookmarked ? "default" : "outline"}
    >
      <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
};