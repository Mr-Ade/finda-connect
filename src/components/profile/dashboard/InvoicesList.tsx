import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const InvoicesList = () => {
  const invoices = [
    {
      id: "INV001",
      plan: "Starter Plan",
      status: "unpaid",
      amount: "$29",
      date: "2024-01-15",
    },
    {
      id: "INV002",
      plan: "Business Plan",
      status: "paid",
      amount: "$99",
      date: "2024-01-01",
    },
    {
      id: "INV003",
      plan: "Premium Plan",
      status: "pending",
      amount: "$199",
      date: "2023-12-15",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-50';
      case 'unpaid':
        return 'text-red-500 bg-red-50';
      case 'pending':
        return 'text-yellow-500 bg-yellow-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Recent Invoices</h3>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{invoice.plan}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Order: {invoice.id}</span>
                  <span>•</span>
                  <span>{new Date(invoice.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(invoice.status)}`}>
                {invoice.status}
              </span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};