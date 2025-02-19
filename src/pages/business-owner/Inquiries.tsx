import { BusinessOwnerLayout } from "@/components/layouts/BusinessOwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const BusinessInquiries = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const { data: inquiries } = useQuery({
    queryKey: ['business-inquiries'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('business_inquiries')
        .select('*, profiles(name)')
        .eq('business_owner_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleReply = async (inquiryId: string, reply: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('business_inquiries')
        .update({ 
          response: reply,
          status: 'responded',
          responded_at: new Date().toISOString()
        })
        .eq('id', inquiryId);

      if (error) throw error;

      toast({
        title: "Response Sent",
        description: "Your response has been successfully sent."
      });
      setSelectedInquiry(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'responded':
        return <Badge variant="success">Responded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <BusinessOwnerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Inquiries</h1>
            <p className="text-muted-foreground mt-2">
              Manage and respond to customer inquiries here.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {inquiries?.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm font-medium">{inquiry.profiles.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {getStatusBadge(inquiry.status)}
              </CardHeader>
              <CardContent>
                <p className="text-sm">{inquiry.message}</p>
                {inquiry.response ? (
                  <div className="mt-4 pl-4 border-l-2">
                    <p className="text-sm font-medium">Your Response:</p>
                    <p className="text-sm text-muted-foreground">{inquiry.response}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Responded on {new Date(inquiry.responded_at).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="mt-4" 
                        variant="outline"
                        size="sm"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reply to Inquiry</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Customer Message:</p>
                          <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                        </div>
                        <Textarea
                          placeholder="Type your response here..."
                          rows={4}
                          onChange={(e) => setSelectedInquiry({ ...inquiry, draft: e.target.value })}
                        />
                        <Button 
                          className="w-full"
                          onClick={() => handleReply(inquiry.id, selectedInquiry?.draft)}
                          disabled={isLoading || !selectedInquiry?.draft}
                        >
                          Send Response
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BusinessOwnerLayout>
  );
};