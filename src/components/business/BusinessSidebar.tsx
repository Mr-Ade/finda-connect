import { Button } from "@/components/ui/button";
import { MapPin, Globe, Mail, Phone, Calendar, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

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

export const BusinessSidebar = ({ business }: BusinessSidebarProps) => {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const isRestaurant = business.category?.toLowerCase().includes('restaurant') || 
                      business.category?.toLowerCase().includes('food');
  const isAccommodation = business.category?.toLowerCase().includes('hotel') || 
                         business.category?.toLowerCase().includes('apartment');
  const isService = business.category?.toLowerCase().includes('service') ||
                   business.category?.toLowerCase().includes('salon');

  const amenities = [
    { id: "air_condition", label: "Air Condition", price: 10 },
    { id: "bedding", label: "Bedding", price: 7 },
    { id: "heating", label: "Heating", price: 20 },
    { id: "internet", label: "Internet", price: 10 },
    { id: "microwave", label: "Microwave", price: 5 },
  ];

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

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

  const renderAccommodationSection = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-4">Book Your Order</h4>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Check In</Label>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Check In</span>
          </div>
        </div>
        <div>
          <Label>Check Out</Label>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Check Out</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label>Adults</Label>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setAdults(Math.max(1, adults - 1))}
            >-</Button>
            <span>{adults}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setAdults(adults + 1)}
            >+</Button>
          </div>
        </div>
        <div>
          <Label>Kids</Label>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setKids(Math.max(0, kids - 1))}
            >-</Button>
            <span>{kids}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setKids(kids + 1)}
            >+</Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h5 className="font-medium mb-3">Advance features</h5>
        <div className="space-y-3">
          {amenities.map(amenity => (
            <div key={amenity.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={() => handleAmenityChange(amenity.id)}
                />
                <Label htmlFor={amenity.id}>{amenity.label}</Label>
              </div>
              <span className="text-gray-600">${amenity.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h5 className="font-medium mb-3">Price & Taxes</h5>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>1 Night</span>
            <span>$170</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount 25$</span>
            <span>-$210</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>$13</span>
          </div>
          <div className="flex justify-between">
            <span>Breakfast Per Adult</span>
            <span>$24</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between font-medium text-lg mb-4">
        <span>Total Payment</span>
        <span className="text-red-500">$218</span>
      </div>

      <Button className="w-full">Book Order Now</Button>
    </div>
  );

  const renderServiceSection = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h4 className="font-bold mb-4">Make An Appointment</h4>
      
      <div className="space-y-4">
        <div>
          <Label>Select Date</Label>
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Select date and time</span>
          </div>
        </div>

        <div>
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>

        <div>
          <Label>Phone</Label>
          <Input type="tel" placeholder="Enter your phone number" />
        </div>

        <Button className="w-full">Make Appointment</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Dynamic Order Section */}
      {isRestaurant && renderRestaurantSection()}
      {isAccommodation && renderAccommodationSection()}
      {isService && renderServiceSection()}

      {/* Business Contact Details */}
      <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Globe className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Live Site</h4>
            <a href={business.website} className="text-primary hover:underline">{business.website}</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Mail className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Drop a Mail</h4>
            <a href={`mailto:${business.email}`} className="text-gray-900">{business.email}</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Phone className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Call Us</h4>
            <a href={`tel:${business.phone}`} className="text-gray-900">{business.phone}</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Get Directions</h4>
            <p className="text-gray-900">{business.address}, {business.city}, {business.state} {business.zip_code}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
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