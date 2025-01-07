import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AdminListingsHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Manage Listings</h1>
          <nav className="text-sm breadcrumbs">
            <ol className="flex gap-2 text-muted-foreground">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li className="before:content-['/'] before:mx-2">Admin</li>
              <li className="before:content-['/'] before:mx-2 text-primary">Listings</li>
            </ol>
          </nav>
        </div>
        <Button asChild>
          <Link to="/dashboard/add-listing">
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Link>
        </Button>
      </div>
    </div>
  );
};