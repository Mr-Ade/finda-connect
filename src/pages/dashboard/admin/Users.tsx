import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { UserManagementTable } from "@/components/admin/users/UserManagementTable";
import { UserManagementHeader } from "@/components/admin/users/UserManagementHeader";
import { UserManagementFilters } from "@/components/admin/users/UserManagementFilters";
import { supabase } from "@/integrations/supabase/client";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      console.log('Fetching users for admin...');
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          full_name,
          avatar_url,
          is_admin,
          created_at,
          last_seen,
          businesses (
            id
          )
        `);

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      return profiles;
    }
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = !searchQuery || 
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || 
      (roleFilter === 'admin' && user.is_admin) ||
      (roleFilter === 'business_owner' && user.businesses?.length > 0) ||
      (roleFilter === 'user' && !user.is_admin && !user.businesses?.length);

    return matchesSearch && matchesRole;
  });

  return (
    <AdminRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <UserManagementHeader />
          
          <UserManagementFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <UserManagementTable 
            users={filteredUsers || []}
            isLoading={isLoading}
          />
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
};

export default Users;