import { Heart, MapPin, Mail, Star, Wifi, Car, Dog, Fan } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isBusinessOpen } from "@/lib/utils/businessHours";
import type { BusinessHour } from "@/lib/utils/businessHours";

interface BusinessCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  isFeatured?: boolean;
  description?: string;
  tags?: string[];
}

export const BusinessCard = ({
  id,
  name,
  image,
  category,
  rating,
  reviewCount,
  location,
  isFeatured,
  description,
  tags = [],
}: BusinessCardProps) => {
  const { data: hours } = useQuery({
    queryKey: ['business-hours', id],
    queryFn: async () => {
      console.log('Fetching business hours for:', id);
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('business_id', id)
        .order('day_of_week');

      if (error) {
        console.error('Error fetching business hours:', error);
        throw error;
      }

      return data as BusinessHour[];
    },
  });

  const isOpen = isBusinessOpen(hours || null);

  const getRatingColor = (score: number) => {
    if (score >= 4) return 'bg-green-500';
    if (score >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  )}`;

  // Generate srcset for responsive images
  const generateSrcSet = (baseUrl: string) => {
    const sizes = [400, 600, 800];
    return sizes
      .map(size => {
        const url = `${baseUrl}?width=${size}`;
        return `${url} ${size}w`;
      })
      .join(', ');
  };

  return (
    <Link to={`/business/${id}`} className="block h-full">
      <Card className="overflow-hidden group relative h-full transition-all duration-200 hover:shadow-lg">
        {/* Image container */}
        <div className="relative h-48">
          <picture>
            <source
              type="image/webp"
              srcSet={generateSrcSet(image.replace(/\.[^.]+$/, '.webp'))}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              style={{
                backgroundColor: '#f3f4f6',
                backgroundImage: `url(${blurDataURL})`,
                backgroundSize: 'cover'
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.backgroundImage = 'none';
              }}
              srcSet={generateSrcSet(image)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </picture>

          <button 
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5 text-gray-600" />
          </button>

          {/* Status badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 text-xs font-medium text-white rounded ${isOpen ? 'bg-green-500' : 'bg-blue-500'} uppercase`}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
            {isFeatured && (
              <span className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded uppercase">
                Featured
              </span>
            )}
          </div>

          {/* Rating badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 rounded px-2 py-1 flex items-center gap-1">
            <span className={`text-lg font-bold ${getRatingColor(rating)} text-white px-2 py-1 rounded`}>
              {rating}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {reviewCount} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            {category && (
              <span className="text-sm text-primary">{category}</span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Location and contact */}
          <div className="flex items-center justify-between text-gray-600 mt-auto">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm line-clamp-1">{location}</span>
            </div>
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </Card>
    </Link>
  );
};