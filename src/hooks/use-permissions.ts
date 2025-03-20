
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { hasPermission, getUserRole } from "@/lib/rbac";

export function usePermissions() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) return null;
      return data;
    }
  });

  const userRole = getUserRole(profile);

  return {
    can: (resource: string, action: string) => hasPermission(userRole, resource, action),
    role: userRole,
    isLoading: !profile,
  };
}
