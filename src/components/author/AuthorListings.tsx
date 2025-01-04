import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

interface AuthorListingsProps {
  data: Business[];
}

export const AuthorListings = ({ data }: AuthorListingsProps) => {
  if (!data?.length) return <div>No listings found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((business) => (
        <Link 
          key={business.id}
          to={`/business/${business.id}`} 
          className="block p-4 border rounded-lg hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">{business.name}</h3>
          <p className="text-gray-600">{business.description}</p>
          <p className="text-gray-500">{business.city}, {business.state}</p>
        </Link>
      ))}
    </div>
  );
};