import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/types/profile";

const UserManagementTable = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Full Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.full_name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">
              <button className="text-blue-500">Edit</button>
              <button className="text-red-500 ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserManagementTable;
