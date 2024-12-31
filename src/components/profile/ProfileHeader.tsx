import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ProfileHeader = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
        setProfile(data);
      }
    };
    loadProfile();
  }, []);

  return (
    <section className="relative bg-gray-100 py-16">
      <div className="absolute right-4 top-4">
        <a href="/business/new" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
          <i className="fas fa-plus me-2" />Add Listing
        </a>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={profile?.avatar_url || "/placeholder.svg"} 
              className="w-full h-full object-cover"
              alt="Profile" 
            />
          </div>
          <div>
            <h4 className="text-2xl font-semibold">{profile?.full_name || "Anonymous"}</h4>
            <span className="text-gray-600">
              <i className="lni lni-map-marker me-1" />
              {profile?.city || "Location not set"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};