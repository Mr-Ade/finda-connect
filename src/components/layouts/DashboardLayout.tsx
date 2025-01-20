import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const DashboardLayout = ({ children, loading }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  // Check if user is authenticated and get profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
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

  if (profileLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isAdmin={profile?.is_admin} 
        isSuperAdmin={profile?.super_admin} 
        items={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: "LayoutDashboard"
          },
          {
            title: "Profile",
            href: "/dashboard/profile",
            icon: "User"
          },
          {
            title: "Messages",
            href: "/dashboard/messages",
            icon: "MessageSquare"
          },
          {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "Settings"
          }
        ]}
      />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="container mx-auto py-6 px-4 md:px-6">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}