import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AuthorProfile from "@/components/author/AuthorProfile";
import AuthorListings from "@/components/author/AuthorListings";
import { ListingFilters } from "@/components/author/ListingFilters";

const AuthorDetail = () => {
  const { username } = useParams();

  const { data: author, isLoading: authorLoading } = useQuery({
    queryKey: ['author', username],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          *,
          businesses:businesses(count),
          followers:follows(count)
        `)
        .eq('username', username)
        .single();

      if (error) throw error;
      return profile;
    }
  });

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['author-listings', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          business_photos (
            id,
            photo_url
          )
        `)
        .eq('owner_id', author?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!author?.id
  });

  if (authorLoading || listingsLoading) {
    return <div>Loading...</div>;
  }

  if (!author) {
    return <div>Author not found</div>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <AuthorProfile authorId={author.id} />
          </div>
          
          <div className="md:col-span-8">
            <ListingFilters listingsCount={listings?.length || 0} />
            <AuthorListings />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorDetail;