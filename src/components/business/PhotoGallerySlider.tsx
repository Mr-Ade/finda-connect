import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PhotoGallerySliderProps {
  businessId: string;
}

export const PhotoGallerySlider = ({ businessId }: PhotoGallerySliderProps) => {
  const [showAll, setShowAll] = useState(false);

  const { data: photos } = useQuery({
    queryKey: ["business-photos", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_photos")
        .select("*")
        .eq("business_id", businessId)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  if (!photos?.length) {
    return (
      <Card className="p-8 text-center">
        <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500">No photos available</p>
      </Card>
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {photos.slice(0, showAll ? undefined : 8).map((photo) => (
            <CarouselItem key={photo.id} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <img
                  src={photo.photo_url}
                  alt={photo.caption || "Business photo"}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {photos.length > 8 && !showAll && (
        <Button
          onClick={() => setShowAll(true)}
          variant="outline"
          className="mt-4 mx-auto block"
        >
          See {photos.length}+ Photos
        </Button>
      )}
    </div>
  );
};