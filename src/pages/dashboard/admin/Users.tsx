import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { UserManagementTable } from "@/components/admin/users/UserManagementTable";
import { UserManagementHeader } from "@/components/admin/users/UserManagementHeader";
import { UserManagementFilters } from "@/components/admin/users/UserManagementFilters";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: users, isLoading, error, refetch } = useQuery({
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
          role,
          is_active,
          created_at,
          last_seen
        `);

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return profiles;
    }
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = !searchQuery || 
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (error) {
    return (
      <AdminRoute requireSuperAdmin>
        <DashboardLayout>
          <div className="p-4 text-red-500">
            Error loading users. Please try again later.
          </div>
        </DashboardLayout>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute requireSuperAdmin>
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
            onUserUpdated={refetch}
          />
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
};

export default Users;