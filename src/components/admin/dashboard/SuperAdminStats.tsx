import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, BarChart2, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const StatsCard = ({ title, value, description, icon, link }: StatsCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <Link to={link}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Link>
  </Card>
);

export const SuperAdminStats = () => {
  const adminCards = [
    {
      title: "Total Users",
      value: "0",
      description: "Active platform users",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      link: "/dashboard/admin/users"
    },
    {
      title: "Total Businesses",
      value: "0",
      description: "Registered businesses",
      icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
      link: "/dashboard/admin/listings"
    },
    {
      title: "Analytics",
      value: "View",
      description: "Platform metrics",
      icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />,
      link: "/dashboard/admin/analytics"
    },
    {
      title: "Settings",
      value: "Manage",
      description: "System configuration",
      icon: <Settings className="h-4 w-4 text-muted-foreground" />,
      link: "/dashboard/admin/settings"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {adminCards.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
};