import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const CustomerInquiries = () => {
  // Fetch customer inquiries
  const { data: inquiries } = useQuery({
    queryKey: ['customer-inquiries'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          is_read,
          sender:sender_id(id, full_name),
          business:business_id(id, name)
        `)
        .eq('recipient_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customer Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries?.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>{inquiry.sender.full_name}</TableCell>
                <TableCell>{inquiry.business.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{inquiry.content}</TableCell>
                <TableCell>{new Date(inquiry.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    inquiry.is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inquiry.is_read ? 'Read' : 'Unread'}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/dashboard/messages/${inquiry.sender.id}`}>
                      <MessageCircle className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CustomerInquiries;