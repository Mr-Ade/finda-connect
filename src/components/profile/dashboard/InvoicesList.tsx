import React from "react";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvoicesList = () => {
  const invoices = [
    {
      plan: "Starter Plan",
      status: "unpaid",
      order: "LS5410",
      date: "16 Sep 2023",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    {
      plan: "Basic Plan",
      status: "paid",
      order: "LS5487",
      date: "19 Aug 2023",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      plan: "Extended Plan",
      status: "pending",
      order: "LS6413",
      date: "07 Jul 2023",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Invoices</h3>
      <div className="space-y-4">
        {invoices.map((invoice, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className={`p-2 rounded-full ${invoice.bgColor}`}>
              <FileText className={invoice.textColor} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{invoice.plan}</h4>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>Order: {invoice.order}</span>
                <span>•</span>
                <span>{invoice.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs capitalize ${invoice.bgColor} ${invoice.textColor}`}>
                {invoice.status}
              </span>
              <Button variant="outline" size="sm">View Invoice</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};