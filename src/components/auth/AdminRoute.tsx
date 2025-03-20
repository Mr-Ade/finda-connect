
import { RoleBasedRoute } from "./RoleBasedRoute";

interface AdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export const AdminRoute = ({ children, requireSuperAdmin = false }: AdminRouteProps) => {
  return (
    <RoleBasedRoute 
      allowedRoles={requireSuperAdmin ? ['super_admin'] : ['admin', 'super_admin']}
      redirectTo="/dashboard"
    >
      {children}
    </RoleBasedRoute>
  );
};
