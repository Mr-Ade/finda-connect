import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BusinessGalleryProps {
  photos: {
    id: string;
    photo_url: string;
    caption?: string;
  }[];
}

export const BusinessGallery = ({ photos }: BusinessGalleryProps) => {
  const [showAll, setShowAll] = useState(false);
  
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