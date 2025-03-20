
import { RoleBasedRoute } from "./RoleBasedRoute";

interface CustomerRouteProps {
  children: React.ReactNode;
}

export const CustomerRoute = ({ children }: CustomerRouteProps) => {
  return (
    <RoleBasedRoute allowedRoles={['customer', 'business_owner', 'admin', 'super_admin']}>
      {children}
    </RoleBasedRoute>
  );
};
