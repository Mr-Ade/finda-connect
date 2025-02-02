import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Business } from "@/types/business";

const AuthorListings = () => {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['author-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', supabase.auth.user()?.id);

      if (error) throw new Error(error.message);
      return data as Business[];
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading listings: {error.message}</div>;

  return (
    <div>
      <h2>Your Listings</h2>
      <ul>
        {listings?.map((listing) => (
          <li key={listing.id}>
            <h3>{listing.name}</h3>
            <p>{listing.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorListings;
