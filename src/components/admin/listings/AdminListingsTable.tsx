import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle 
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  owner?: {
    full_name: string | null;
    email: string | null;
  };
  business_photos?: {
    photo_url: string;
  }[];
  reviews?: {
    rating: number;
  }[];
};

interface AdminListingsTableProps {
  listings: Business[];
}

export const AdminListingsTable = ({ listings }: AdminListingsTableProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string[]>([]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setLoading((prev) => [...prev, id]);
      
      const { error } = await supabase
        .from('businesses')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
          approved_by: status === 'approved' ? (await supabase.auth.getSession()).data.session?.user.id : null
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Listing ${status} successfully`,
      });
    } catch (error) {
      console.error('Error updating listing status:', error);
      toast({
        title: "Error",
        description: "Failed to update listing status",
        variant: "destructive",
      });
    } finally {
      setLoading((prev) => prev.filter(item => item !== id));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading((prev) => [...prev, id]);
      
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    } finally {
      setLoading((prev) => prev.filter(item => item !== id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Business</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img 
                    src={listing.business_photos?.[0]?.photo_url || "/placeholder.svg"}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{listing.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {listing.city}, {listing.state}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{listing.owner?.full_name || 'N/A'}</div>
                <div className="text-muted-foreground">{listing.owner?.email || 'N/A'}</div>
              </div>
            </TableCell>
            <TableCell>{listing.category}</TableCell>
            <TableCell>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${listing.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  listing.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </div>
            </TableCell>
            <TableCell>
              {new Date(listing.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/business/${listing.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/business/${listing.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  {listing.status !== 'approved' && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(listing.id, 'approved')}
                      disabled={loading.includes(listing.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </DropdownMenuItem>
                  )}
                  {listing.status !== 'rejected' && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(listing.id, 'rejected')}
                      disabled={loading.includes(listing.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleDelete(listing.id)}
                    disabled={loading.includes(listing.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};