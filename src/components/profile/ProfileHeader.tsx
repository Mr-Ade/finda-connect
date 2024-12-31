import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const ProfileHeader = () => {
  const [profile, setProfile] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Load profile data
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
        setProfile(data);

        // Load average rating from reviews
        const { data: reviews, error } = await supabase
          .from("reviews")
          .select("rating")
          .eq("user_id", session.user.id);

        if (!error && reviews.length > 0) {
          const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
          setRating(Math.round(avgRating));
        }
      }
    };
    loadProfile();
  }, []);

  return (
    <section 
      className="relative bg-cover bg-center h-64" 
      style={{ 
        backgroundImage: "url('/cover.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute right-4 top-4">
        <a 
          href="/business/new" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Add Listing
        </a>
      </div>
      <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
            <img 
              src={profile?.avatar_url || "/placeholder.svg"} 
              className="w-full h-full object-cover"
              alt="Profile" 
            />
          </div>
          <div className="text-white">
            <h4 className="text-2xl font-semibold">
              {profile?.full_name || "Anonymous"}
            </h4>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <i className="lni lni-map-marker" />
                {profile?.city || "Location not set"}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};