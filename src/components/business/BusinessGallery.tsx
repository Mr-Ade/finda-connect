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
    <div className="featured_slick_gallery gray">
      <div className="featured_slick_gallery-slide">
        <Carousel className="w-full">
          <CarouselContent>
            {photos.slice(0, showAll ? undefined : 8).map((photo) => (
              <CarouselItem key={photo.id} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                <div className="gallery_item">
                  <img
                    src={photo.photo_url}
                    alt={photo.caption || "Business photo"}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
      
      {photos.length > 8 && !showAll && (
        <div className="view_all_photo">
          <Button 
            onClick={() => setShowAll(true)}
            variant="outline"
            className="btn btn-theme"
          >
            View All Photos ({photos.length})
          </Button>
        </div>
      )}
    </div>
  );
};