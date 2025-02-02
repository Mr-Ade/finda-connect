import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface BusinessOwnerProfileProps {
  owner?: {
    username?: string;
    avatar_url?: string;
    full_name?: string;
  };
  city: string;
}

export const BusinessOwnerProfile = ({ owner, city }: BusinessOwnerProfileProps) => {
  if (!owner) return null;

  return (
    <div className="bg-white rounded-lg p-6 text-center">
      <div className="relative mb-4">
        <img 
          src={owner.avatar_url || "/placeholder.svg"}
          alt={owner.full_name}
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{owner.full_name}</h3>
      <div className="flex items-center justify-center gap-1 text-gray-600 mb-6">
        <MapPin className="w-4 h-4" />
        <span>{city}</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="font-semibold text-xl">140+</div>
          <div className="text-sm text-gray-500">Listings</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-xl">4.7</div>
          <div className="text-sm text-gray-500">Ratings</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-xl">80K</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button variant="outline" className="w-full">Follow Now</Button>
        <Button className="w-full">Send Message</Button>
      </div>
      <Button variant="default" className="w-full bg-red-500 hover:bg-red-600">
        View Profile
      </Button>
    </div>
  );
};