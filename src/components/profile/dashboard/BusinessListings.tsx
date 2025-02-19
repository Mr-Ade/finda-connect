import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Edit, Eye, Trash } from "lucide-react";

const BusinessListings = () => {
  // Fetch business listings
  const { data: listings } = useQuery({
    queryKey: ['business-listings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', session.user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Business Listings</CardTitle>
        <Button asChild>
          <Link to="/dashboard/add-listing">Add New Listing</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings?.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    listing.status === 'active' ? 'bg-green-100 text-green-800' :
                    listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {listing.status}
                  </span>
                </TableCell>
                <TableCell>{listing.views || 0}</TableCell>
                <TableCell>{new Date(listing.updated_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/business/${listing.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/dashboard/edit-listing/${listing.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BusinessListings;