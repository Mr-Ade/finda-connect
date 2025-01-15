interface OfferStatsProps {
  isLoading: boolean;
}

export const OfferStats = ({ isLoading }: OfferStatsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }
  return null;
};