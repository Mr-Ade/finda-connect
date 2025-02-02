import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/business";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AdminListingsTable = () => {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['admin-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*');

      if (error) throw error;

      return data as Business[];
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings</div>;

  return (
    <div>
      <Link to="/dashboard/admin/listings/new">
        <Button variant="primary" className="mb-4">Add New Listing</Button>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>{listing.name}</td>
              <td>{listing.category}</td>
              <td>{listing.status}</td>
              <td>
                <Link to={`/dashboard/admin/listings/${listing.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
