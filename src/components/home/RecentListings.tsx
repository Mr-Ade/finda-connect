import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

interface RecentListingsProps {
  data: Business;
}

export const RecentListings = ({ data }: RecentListingsProps) => {
  return (
    <Link to={`/business/${data.id}`} className="block p-4 border rounded-lg hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{data.name}</h3>
      <p className="text-gray-600">{data.description}</p>
      <p className="text-gray-500">{data.city}, {data.state}</p>
    </Link>
  );
};
