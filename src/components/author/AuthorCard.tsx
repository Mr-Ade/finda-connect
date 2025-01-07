import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Store } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  businesses: { count: number }[];
};

interface AuthorCardProps {
  author: Profile;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <img 
          src={author.avatar_url || "/placeholder.svg"}
          alt={author.full_name || "Author"}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="space-y-1">
          <Link 
            to={`/author/${author.username}`}
            className="text-lg font-semibold hover:text-primary"
          >
            {author.full_name}
          </Link>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{author.city}, {author.state}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {author.businesses?.[0]?.count || 0} Listings
            </span>
          </div>
          <Badge variant="secondary">
            {new Date(author.created_at).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};