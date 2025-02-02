import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/types/profile";

const Users = () => {
  const { data: users, isLoading, error } = useQuery("users", async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) throw new Error(error.message);
    return data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">User Management</h1>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="border-b">Username</th>
            <th className="border-b">Full Name</th>
            <th className="border-b">Email</th>
            <th className="border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: Profile) => (
            <tr key={user.id}>
              <td className="border-b">{user.username}</td>
              <td className="border-b">{user.full_name}</td>
              <td className="border-b">{user.email}</td>
              <td className="border-b">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
