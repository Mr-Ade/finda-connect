import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/types/profile";

const AuthorProfile = ({ authorId }: { authorId: string }) => {
  const { data: author, isLoading, error } = useQuery<Profile>(['author', authorId], async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authorId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading author profile</div>;

  return (
    <div className="author-profile">
      <h2>{author?.full_name}</h2>
      <p>{author?.bio}</p>
      <div>
        <h3>Contact Information</h3>
        <p>Email: {author?.email}</p>
        <p>Phone: {author?.mobile}</p>
      </div>
    </div>
  );
};

export default AuthorProfile;
