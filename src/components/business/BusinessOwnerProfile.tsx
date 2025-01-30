import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BusinessOwnerProfileProps {
  owner: {
    username: string;
    avatar_url: string;
    full_name: string;
  };
}

export const BusinessOwnerProfile = ({ owner }: BusinessOwnerProfileProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex flex-col items-center text-center mb-6">
        <img 
          src={owner.avatar_url || "/placeholder.svg"} 
          alt={owner.username}
          className="w-20 h-20 rounded-full mb-3"
        />
        <h4 className="font-medium text-lg">{owner.full_name}</h4>
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <User className="h-4 w-4" />Business Owner
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <div className="font-semibold">50</div>
          <div className="text-sm text-gray-500">Listings</div>
        </div>
        <div>
          <div className="font-semibold">4.8</div>
          <div className="text-sm text-gray-500">Ratings</div>
        </div>
        <div>
          <div className="font-semibold">2.8k</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button className="w-full" variant="outline">Follow Now</Button>
        <Button className="w-full">Send Message</Button>
      </div>

      <Link to={`/author/${owner.username}`}>
        <Button variant="outline" className="w-full">View Profile</Button>
      </Link>
    </div>
  );
};