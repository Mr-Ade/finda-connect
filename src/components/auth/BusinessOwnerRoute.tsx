
import { RoleBasedRoute } from "./RoleBasedRoute";

interface BusinessOwnerRouteProps {
  children: React.ReactNode;
}

export const BusinessOwnerRoute = ({ children }: BusinessOwnerRouteProps) => {
  return (
    <RoleBasedRoute allowedRoles={['business_owner', 'admin', 'super_admin']}>
      {children}
    </RoleBasedRoute>
  );
};
