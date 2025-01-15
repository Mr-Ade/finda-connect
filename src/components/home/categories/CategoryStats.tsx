interface CategoryStatsProps {
  isLoading: boolean;
}

export const CategoryStats = ({ isLoading }: CategoryStatsProps) => {
  if (isLoading) {
    return (
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="text-center mb-12">
      <h6 className="text-primary text-sm font-medium">What We Offer</h6>
      <h2 className="text-3xl font-bold mt-2">
        Popular <span className="text-primary">Categories</span>
      </h2>
    </div>
  );
};