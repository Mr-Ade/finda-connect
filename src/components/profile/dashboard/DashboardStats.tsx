import { FileText, Eye, MessageSquare, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Active Listings",
      value: "46",
      icon: FileText,
      bgColor: "bg-red-500",
    },
    {
      title: "Views Listing",
      value: "2,615",
      icon: Eye,
      bgColor: "bg-green-500",
    },
    {
      title: "Total Reviews",
      value: "312",
      icon: MessageSquare,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Total Bookings",
      value: "410",
      icon: Wallet,
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} text-white p-6 relative overflow-hidden`}>
          <div className="relative z-10">
            <h2 className="text-2xl font-medium mb-1">{stat.value}</h2>
            <p className="text-sm opacity-90">{stat.title}</p>
          </div>
          <stat.icon className="absolute right-4 bottom-4 opacity-20 w-12 h-12" />
        </Card>
      ))}
    </div>
  );
};