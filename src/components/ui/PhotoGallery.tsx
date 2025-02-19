import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
  columns?: 2 | 3 | 4;
  aspectRatio?: '1:1' | '4:3' | '16:9';
}

export function PhotoGallery({
  photos,
  className,
  columns = 3,
  aspectRatio = '4:3',
}: PhotoGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1
    );
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1
    );
  };

  const aspectRatioClass = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-4/3',
    '16:9': 'aspect-video',
  }[aspectRatio];

  const gridClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <>
      <div className={cn('w-full', className)}>
        <div className={cn('grid gap-4', gridClass)}>
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={cn(
                'group cursor-pointer overflow-hidden rounded-lg',
                aspectRatioClass
              )}
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img
                src={photo.url}
                alt={photo.alt || `Photo ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={selectedPhotoIndex !== null}
        onOpenChange={() => setSelectedPhotoIndex(null)}
      >
        <DialogContent className="max-w-screen-lg border-none bg-black/90 p-0">
          <div className="relative flex h-full items-center justify-center">
            {selectedPhotoIndex !== null && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 z-10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <img
                  src={photos[selectedPhotoIndex].url}
                  alt={photos[selectedPhotoIndex].alt || `Photo ${selectedPhotoIndex + 1}`}
                  className="max-h-[80vh] w-auto"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 z-10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
                  onClick={() => setSelectedPhotoIndex(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {photos[selectedPhotoIndex].caption && (
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                    <p className="px-4 text-sm">{photos[selectedPhotoIndex].caption}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}