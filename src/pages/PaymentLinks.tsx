import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Building, 
  Phone, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

const PaymentMethods = [
  {
    id: "bank-transfer",
    name: "Direct Bank Transfer",
    icon: Building,
    description: "Make a direct transfer from your bank account to ours. We will confirm your payment within 1-24 hours.",
    instructions: [
      "Log in to your bank's mobile or internet banking",
      "Select transfer to other bank",
      "Enter our account details",
      "Complete the transfer"
    ]
  },
  {
    id: "paystack",
    name: "Paystack",
    icon: CreditCard,
    description: "Fast and secure payments with Paystack. Instant confirmation.",
    instructions: [
      "Click 'Pay with Paystack'",
      "Enter your card details",
      "Complete the secure payment"
    ]
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: CreditCard,
    description: "Secure payments powered by Flutterwave. Multiple payment options available.",
    instructions: [
      "Select Flutterwave as your payment method",
      "Choose your preferred payment option",
      "Complete the payment process"
    ]
  },
  {
    id: "ussd",
    name: "USSD Payment",
    icon: Phone,
    description: "Quick payments using USSD codes. Available for all major Nigerian banks.",
    instructions: [
      "Dial the USSD code for your bank",
      "Select 'Pay for Services'",
      "Enter the merchant code",
      "Complete the payment"
    ]
  }
];

const PaymentHistory = [
  {
    id: 1,
    date: "2024-03-10",
    amount: "₦50,000",
    method: "Paystack",
    status: "completed"
  },
  {
    id: 2,
    date: "2024-03-08",
    amount: "₦25,000",
    method: "Bank Transfer",
    status: "pending"
  },
  {
    id: 3,
    date: "2024-03-05",
    amount: "₦35,000",
    method: "Flutterwave",
    status: "failed"
  }
];

const PaymentLinks = () => {
  const [activeTab, setActiveTab] = useState("payment-methods");
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Payment Links", href: "#", active: true },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Payment Links</h1>
            <p className="text-gray-600 mb-8 text-center">
              Choose your preferred payment method to complete your transaction
            </p>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="payment-history">Payment History</TabsTrigger>
              </TabsList>

              <TabsContent value="payment-methods">
                <div className="grid gap-6 mt-6">
                  {PaymentMethods.map((method) => (
                    <Card key={method.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <method.icon className="w-6 h-6" />
                          {method.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{method.description}</p>
                        <div className="space-y-2">
                          {method.instructions.map((instruction, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                                {index + 1}
                              </span>
                              <span>{instruction}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payment-history">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Method</th>
                            <th className="px-6 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PaymentHistory.map((transaction) => (
                            <tr key={transaction.id} className="bg-white border-b">
                              <td className="px-6 py-4">{transaction.date}</td>
                              <td className="px-6 py-4">{transaction.amount}</td>
                              <td className="px-6 py-4">{transaction.method}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(transaction.status)}
                                  <span className="capitalize">{transaction.status}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default PaymentLinks;