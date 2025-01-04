import { Card } from "@/components/ui/card";
import { FileText, Eye, MessageSquare, Wallet } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Active Listings",
      value: "46",
      icon: FileText,
      color: "bg-red-500",
    },
    {
      title: "Views Listing",
      value: "2,615",
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Total Reviews",
      value: "312",
      icon: MessageSquare,
      color: "bg-yellow-500",
    },
    {
      title: "Total Bookings",
      value: "410",
      icon: Wallet,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`p-6 ${stat.color} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <stat.icon className="h-8 w-8 opacity-80" />
          </div>
        </Card>
      ))}
    </div>
  );
};