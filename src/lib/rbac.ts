
import { UserRole, RolePermissions } from "@/types/auth";
import { Profile } from "@/types/profile";

// Define permissions for each role
export const rolePermissions: RolePermissions = {
  'customer': [
    { resource: 'business', action: 'read' },
    { resource: 'review', action: 'create' },
    { resource: 'review', action: 'update' },
    { resource: 'review', action: 'delete' },
    { resource: 'bookmark', action: 'create' },
    { resource: 'bookmark', action: 'delete' },
    { resource: 'booking', action: 'create' },
    { resource: 'booking', action: 'read' },
    { resource: 'kyc', action: 'create' },
    { resource: 'message', action: 'create' },
  ],
  'business_owner': [
    { resource: 'business', action: 'read' },
    { resource: 'business', action: 'create' },
    { resource: 'business', action: 'update' },
    { resource: 'business', action: 'delete' },
    { resource: 'review-response', action: 'create' },
    { resource: 'review-response', action: 'update' },
    { resource: 'booking', action: 'read' },
    { resource: 'booking', action: 'update' },
    { resource: 'kyb', action: 'create' },
    { resource: 'message', action: 'create' },
    { resource: 'analytics', action: 'read' },
  ],
  'admin': [
    { resource: 'business', action: 'read' },
    { resource: 'business', action: 'update' },
    { resource: 'business', action: 'delete' },
    { resource: 'business', action: 'approve' },
    { resource: 'user', action: 'read' },
    { resource: 'user', action: 'update' },
    { resource: 'review', action: 'read' },
    { resource: 'review', action: 'update' },
    { resource: 'review', action: 'delete' },
    { resource: 'kyc', action: 'approve' },
    { resource: 'kyb', action: 'approve' },
    { resource: 'newsletter', action: 'manage' },
    { resource: 'analytics', action: 'read' },
  ],
  'super_admin': [
    { resource: 'all', action: 'manage' },
  ],
  'content_manager': [
    { resource: 'blog', action: 'create' },
    { resource: 'blog', action: 'read' },
    { resource: 'blog', action: 'update' },
    { resource: 'blog', action: 'delete' },
    { resource: 'blog-category', action: 'manage' },
    { resource: 'blog-tag', action: 'manage' },
  ]
};

/**
 * Check if user has permission to perform an action on a resource
 */
export function hasPermission(
  userRole: UserRole | null | undefined, 
  resource: string, 
  action: string
): boolean {
  if (!userRole) return false;
  
  const permissions = rolePermissions[userRole];
  if (!permissions) return false;
  
  // Super admin has all permissions
  if (userRole === 'super_admin') return true;
  
  return permissions.some(
    permission => 
      (permission.resource === resource || permission.resource === 'all') && 
      (permission.action === action || permission.action === 'manage')
  );
}

/**
 * Get user role from profile
 */
export function getUserRole(profile?: Profile | null): UserRole | null {
  if (!profile) return null;
  return profile.role as UserRole;
}
