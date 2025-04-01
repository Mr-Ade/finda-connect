
import { RoleBasedRoute } from "./RoleBasedRoute";

interface ContentManagerRouteProps {
  children: React.ReactNode;
}

export const ContentManagerRoute = ({ children }: ContentManagerRouteProps) => {
  return (
    <RoleBasedRoute allowedRoles={['content_manager', 'admin', 'super_admin']}>
      {children}
    </RoleBasedRoute>
  );
};
