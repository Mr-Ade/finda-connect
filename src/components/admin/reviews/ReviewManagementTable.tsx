import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Flag, CheckCircle, XCircle, Edit } from "lucide-react";
import { ReviewEditDialog } from "./ReviewEditDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReviewReportDialog } from "./ReviewReportDialog";

interface Review {
  id: string;
  business_id: string;
  user_id: string;
  rating: number;
  review_text: string | null;
  review_date: string;
  status: string;
  helpful_votes: number;
}

interface ReviewManagementTableProps {
  reviews: Review[];
  isLoading: boolean;
  onReviewUpdated: () => void;
}

export const ReviewManagementTable = ({ reviews, isLoading, onReviewUpdated }: ReviewManagementTableProps) => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reportingReview, setReportingReview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpdateStatus = async (reviewId: string, newStatus: string) => {
    setProcessingId(reviewId);
    try {
      const { error } = await supabase
        .from('business_reviews')
        .update({ status: newStatus })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: "Review status updated successfully",
      });
      onReviewUpdated();
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Error updating review",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleEditSave = async (editedText: string) => {
    if (!editingReview) return;
    
    try {
      const { error } = await supabase
        .from('business_reviews')
        .update({ review_text: editedText })
        .eq('id', editingReview.id);

      if (error) throw error;

      toast({
        title: "Review updated successfully",
      });
      setEditingReview(null);
      onReviewUpdated();
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Error updating review",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleReport = async (reason: string) => {
    if (!reportingReview) return;

    try {
      const { error } = await supabase
        .from('business_reviews')
        .update({ 
          status: 'flagged',
          flag_reason: reason,
          flagged_at: new Date().toISOString()
        })
        .eq('id', reportingReview);

      if (error) throw error;

      toast({
        title: "Review reported successfully",
      });
      setReportingReview(null);
      onReviewUpdated();
    } catch (error) {
      console.error('Error reporting review:', error);
      toast({
        title: "Error reporting review",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Helpful Votes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="max-w-md">
                  <p className="truncate">{review.review_text}</p>
                </TableCell>
                <TableCell>{review.rating}/5</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      review.status === 'published' 
                        ? "default" 
                        : review.status === 'pending' 
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(review.review_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{review.helpful_votes}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingReview(review)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    {review.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(review.id, 'published')}
                          disabled={processingId === review.id}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(review.id, 'rejected')}
                          disabled={processingId === review.id}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                      onClick={() => setReportingReview(review.id)}
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      Flag
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingReview && (
        <ReviewEditDialog
          isOpen={!!editingReview}
          onClose={() => setEditingReview(null)}
          onSave={handleEditSave}
          reviewText={editingReview.review_text || ''}
        />
      )}

      <ReviewReportDialog
        isOpen={!!reportingReview}
        onClose={() => setReportingReview(null)}
        onReport={handleReport}
        reviewId={reportingReview || ''}
      />
    </>
  );
};
