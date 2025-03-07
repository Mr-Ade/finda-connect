
import { AdminRoute } from "@/components/auth/AdminRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const KYCReviews = () => {
  const { toast } = useToast();
  
  const { data: kycSubmissions, isLoading } = useQuery({
    queryKey: ['kyc-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('verification_status', 'pending');
        
      if (error) throw error;
      return data;
    }
  });

  const handleApprove = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verification_status: 'approved' })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "KYC Approved",
        description: "User verification has been approved",
      });
    } catch (error) {
      console.error('Error approving KYC:', error);
      toast({
        title: "Error",
        description: "Failed to approve KYC",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">KYC Review Dashboard</h1>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycSubmissions?.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.full_name}</TableCell>
                <TableCell>{new Date(submission.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{submission.verification_status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleApprove(submission.id)}
                    variant="outline"
                    size="sm"
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <KYCReviews />
  </AdminRoute>
);
