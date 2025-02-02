import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/business";

const Listings = () => {
  const { data: businesses, isLoading, error } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*');

      if (error) throw new Error(error.message);
      return data as Business[];
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Business Listings</h1>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <tr key={business.id}>
              <td className="border px-4 py-2">{business.name}</td>
              <td className="border px-4 py-2">{business.category}</td>
              <td className="border px-4 py-2">{business.status}</td>
              <td className="border px-4 py-2">
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

export default Listings;
