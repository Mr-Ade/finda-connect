import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export const AdminLayout = ({ children, requireSuperAdmin = false }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log('Checking admin status...');
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
    if (!isLoading) {
      if (!profile?.is_admin) {
        navigate('/dashboard');
      } else if (requireSuperAdmin && !profile?.super_admin) {
        navigate('/dashboard/admin');
      }
    }
  }, [profile, isLoading, navigate, requireSuperAdmin]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: "LayoutDashboard"
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: "Users"
    },
    {
      title: "Businesses",
      href: "/dashboard/admin/listings",
      icon: "Store"
    },
    {
      title: "Reviews",
      href: "/dashboard/admin/reviews",
      icon: "MessageSquare"
    },
    {
      title: "Content",
      href: "/dashboard/admin/cms",
      icon: "FileText"
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: "Settings"
    }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-x-hidden p-8 pt-16">
        {children}
      </main>
    </div>
  );
};