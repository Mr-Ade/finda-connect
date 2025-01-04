import { MapPin, Globe, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessHours } from "@/components/business/BusinessHours";

interface BusinessSidebarProps {
  business: {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    phone?: string;
    website?: string;
    email?: string;
    owner?: {
      username: string;
      avatar_url: string;
      full_name: string;
    };
  };
}

export const BusinessSidebar = ({ business }: BusinessSidebarProps) => {
  return (
    <div className="space-y-4">
      {/* Order Booking */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-bold mb-1">Order Food</h4>
        <div className="flex justify-between text-sm mb-4">
          <div>$0.99+ <span className="text-gray-500 block">delivery fee</span></div>
          <div>$0 <span className="text-gray-500 block">min</span></div>
          <div>35-45 <span className="text-gray-500 block">mins</span></div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input className="pl-10" placeholder="Enter delivery address" />
          </div>
          <Button className="w-full">Start Your Order</Button>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <BusinessHours businessId={business.id} />
      </div>

      {/* Author Box */}
      {business.owner && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={business.owner.avatar_url || "/placeholder.svg"} 
              alt={business.owner.username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h4 className="font-medium">{business.owner.full_name}</h4>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" />San Francisco
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 text-center mb-4">
            <div>
              <div className="font-bold">140+</div>
              <div className="text-sm text-gray-500">Listings</div>
            </div>
            <div>
              <div className="font-bold text-green-500">4.7</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div>
              <div className="font-bold">80K</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button variant="outline">Follow Now</Button>
            <Button variant="outline">Send Message</Button>
          </div>
          <Button className="w-full">View Profile</Button>
        </div>
      )}

      {/* Business Info */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="space-y-4">
          {business.website && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Globe className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Live Site</h5>
                <p className="text-sm text-gray-600">{business.website}</p>
              </div>
            </div>
          )}
          
          {business.email && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Drop a Mail</h5>
                <p className="text-sm text-gray-600">{business.email}</p>
              </div>
            </div>
          )}
          
          {business.phone && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Phone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Call Us</h5>
                <p className="text-sm text-gray-600">{business.phone}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium">Get Directions</h5>
              <p className="text-sm text-gray-600">
                {business.address}, {business.city}, {business.state} {business.zip_code}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="w-full">
          <span className="mr-2">📸</span>Add Photos
        </Button>
        <Button variant="outline" className="w-full">
          <span className="mr-2">📤</span>Share
        </Button>
        <Button variant="outline" className="w-full">
          <span className="mr-2">❤️</span>Save
        </Button>
      </div>
    </div>
  );
};