import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BusinessOwnerProfile } from "./BusinessOwnerProfile";
import { BusinessContactInfo } from "./BusinessContactInfo";
import { BusinessActionButtons } from "./BusinessActionButtons";

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
    category: string;
    delivery_info?: {
      available: boolean;
      minimum_order?: number;
      fee?: number;
      estimated_time?: string;
    };
    owner?: {
      username: string;
      avatar_url: string;
      full_name: string;
    };
  };
}

const AccommodationSection = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-4">Book Accommodation</h4>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="Enter location" />
        </div>
        <Button className="w-full">Check Availability</Button>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-4">Book Service</h4>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="Enter your location" />
        </div>
        <Button className="w-full">Book Appointment</Button>
      </div>
    </div>
  );
};

export const BusinessSidebar = ({ business }: BusinessSidebarProps) => {
  const isRestaurant = business.category.toLowerCase().includes('restaurant') || 
                      business.category.toLowerCase().includes('food');
  const isAccommodation = business.category.toLowerCase().includes('hotel') || 
                         business.category.toLowerCase().includes('apartment');
  const isService = business.category.toLowerCase().includes('service') ||
                   business.category.toLowerCase().includes('salon');

  const renderRestaurantSection = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-1">Order Food</h4>
      <div className="flex justify-between text-sm mb-4">
        <div>${business.delivery_info?.fee?.toFixed(2) || '0.99'}+ <span className="text-gray-500 block">delivery fee</span></div>
        <div>${business.delivery_info?.minimum_order || '0'} <span className="text-gray-500 block">min</span></div>
        <div>{business.delivery_info?.estimated_time || '35-45'} <span className="text-gray-500 block">mins</span></div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="Enter delivery address" />
        </div>
        <Button className="w-full">Start Your Order</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Dynamic Order Section */}
      {isRestaurant && renderRestaurantSection()}
      {isAccommodation && <AccommodationSection />}
      {isService && <ServiceSection />}

      {/* Business Owner Info */}
      {business.owner && <BusinessOwnerProfile owner={business.owner} />}

      {/* Business Contact Info */}
      <BusinessContactInfo business={business} />

      {/* Action Buttons */}
      <BusinessActionButtons />
    </div>
  );
};