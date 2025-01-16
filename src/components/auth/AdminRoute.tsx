import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export const AdminRoute = ({ children, requireSuperAdmin = false }: AdminRouteProps) => {
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

  if (!profile?.is_admin || (requireSuperAdmin && !profile?.super_admin)) {
    return null;
  }

  return <>{children}</>;
};