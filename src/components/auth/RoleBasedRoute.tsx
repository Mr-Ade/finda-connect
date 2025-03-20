
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { hasPermission, getUserRole } from "@/lib/rbac";
import { UserRole } from "@/types/auth";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const RoleBasedRoute = ({ 
  children, 
  allowedRoles, 
  redirectTo = "/login" 
}: RoleBasedRouteProps) => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
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

  const userRole = getUserRole(profile);

  useEffect(() => {
    if (!isLoading && !allowedRoles.includes(userRole as UserRole)) {
      navigate(redirectTo);
    }
  }, [profile, isLoading, navigate, allowedRoles, redirectTo, userRole]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!allowedRoles.includes(userRole as UserRole)) {
    return null;
  }

  return <>{children}</>;
};
