import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Invoice } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const InvoicesList = () => {
  const { toast } = useToast();
  
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      console.log('Fetching invoices...');
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching invoices:', error);
        toast({
          title: "Error loading invoices",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Fetched invoices:', data);
      return data as Invoice[];
    },
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'unpaid':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'cancel':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : invoices?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No invoices found
          </div>
        ) : (
          <div className="space-y-4">
            {invoices?.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{invoice.plan_name}</h4>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Order: #{invoice.order_number}</p>
                      <p>Date: {new Date(invoice.created_at).toLocaleDateString()}</p>
                      <p>Amount: ${invoice.amount}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                  <Button variant="outline" size="sm" className="w-full">
                    View Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};