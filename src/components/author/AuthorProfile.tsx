import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  businesses: { count: number }[];
  followers: { count: number }[];
  email?: string;
  phone?: string;
  website?: string;
};

interface AuthorProfileProps {
  author: Profile;
}

export default function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative p-6">
        <div className="absolute top-4 right-4 text-green-500 text-sm font-medium">
          Online Now
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img 
            src={author.avatar_url || "/placeholder.svg"} 
            alt={author.full_name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h5 className="text-xl font-semibold">{author.full_name}</h5>
            <div className="text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {author.city}, {author.state}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="font-semibold text-xl">{author.businesses?.[0]?.count || 0}</div>
            <div className="text-sm text-gray-500">Listings</div>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="font-semibold text-xl">{author.followers?.[0]?.count || 0}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="w-5 h-5 text-red-600" />
            </div>
            <div className="font-semibold text-xl">0</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button variant="outline" className="w-full">Follow Now</Button>
          <Button className="w-full">Send Message</Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h5 className="font-medium">Mail Us</h5>
              <p className="text-gray-600 text-sm">{author.email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h5 className="font-medium">Phone</h5>
              <p className="text-gray-600 text-sm">{author.phone || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h5 className="font-medium">Location</h5>
              <p className="text-gray-600 text-sm">{author.address || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <Globe className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h5 className="font-medium">Website</h5>
              <p className="text-gray-600 text-sm">{author.website || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}