import { useNavigate } from "react-router-dom";

interface ListingFormHeaderProps {
  isLoading: boolean;
}

export const ListingFormHeader = ({ isLoading }: ListingFormHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold mb-2">
        {isLoading ? "Loading..." : "Edit Listing"}
      </h1>
      <nav className="text-sm breadcrumbs">
        <ol className="flex gap-2 text-muted-foreground">
          <li><a href="/">Home</a></li>
          <li>•</li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li>•</li>
          <li><a href="/dashboard/listings">My Listings</a></li>
          <li>•</li>
          <li className="text-primary">Edit Listing</li>
        </ol>
      </nav>
    </div>
  );
};