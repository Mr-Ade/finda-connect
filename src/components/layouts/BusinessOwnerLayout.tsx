
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, LayoutDashboard, BarChart, ListTodo, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessOwnerLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const BusinessOwnerLayout = ({ children, loading }: BusinessOwnerLayoutProps) => {
  const navigate = useNavigate();

  const { data: business, isLoading: businessLoading } = useQuery({
    queryKey: ['owner-business'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  if (businessLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Business Found</h2>
          <p className="text-muted-foreground mb-4">You haven't registered a business yet.</p>
          <button
            onClick={() => navigate('/dashboard/add-listing')}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Register a Business
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/business-owner"
    },
    {
      title: "Analytics",
      icon: BarChart,
      url: "/business-owner/analytics"
    },
    {
      title: "Listings",
      icon: ListTodo,
      url: "/business-owner/listings"
    },
    {
      title: "Reviews",
      icon: MessageSquare,
      url: "/business-owner/reviews"
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/business-owner/settings"
    }
  ];

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold">{business.name}</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  "hover:bg-gray-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="container mx-auto py-6 px-4 md:px-6">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};
