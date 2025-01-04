import { Button } from "@/components/ui/button";
import { MapIcon, List } from "lucide-react";

interface ListingsHeaderProps {
  showMap: boolean;
  onToggleMap: () => void;
}

export const ListingsHeader = ({ showMap, onToggleMap }: ListingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">My Listings</h2>
        <nav className="text-sm breadcrumbs">
          <ol className="flex gap-2 text-muted-foreground">
            <li>Home</li>
            <li className="before:content-['/'] before:mx-2">Dashboard</li>
            <li className="before:content-['/'] before:mx-2 text-primary">My Listings</li>
          </ol>
        </nav>
      </div>
      <Button
        variant="outline"
        onClick={onToggleMap}
      >
        {showMap ? (
          <>
            <List className="w-4 h-4 mr-2" />
            Show List
          </>
        ) : (
          <>
            <MapIcon className="w-4 h-4 mr-2" />
            Show Map
          </>
        )}
      </Button>
    </div>
  );
};