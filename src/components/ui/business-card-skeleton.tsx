import { Card } from "@/components/ui/card";

export const BusinessCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-4 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />

        {/* Category skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Location skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Amenities skeleton */}
        <div className="flex justify-between mt-4">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};