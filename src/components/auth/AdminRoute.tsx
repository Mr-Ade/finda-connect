import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export const AdminRoute = ({ children, requireSuperAdmin = false }: AdminRouteProps) => {
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log('Checking admin status...');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.log('No session found, redirecting to login');
        throw new Error('No user session found');
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      console.log('Profile loaded:', data);
      return data;
    }
  });

  useEffect(() => {
    if (error) {
      console.error('Auth error:', error);
      toast.error('Authentication error. Please login again.');
      navigate('/login');
      return;
    }

    if (!isLoading) {
      if (!profile?.is_admin) {
        console.log('User is not an admin, redirecting to dashboard');
        toast.error('You do not have admin access');
        navigate('/dashboard');
      } else if (requireSuperAdmin && !profile?.super_admin) {
        console.log('User is not a super admin, redirecting to admin dashboard');
        toast.error('You do not have super admin access');
        navigate('/dashboard/admin');
      }
    }
  }, [profile, isLoading, navigate, error, requireSuperAdmin]);

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