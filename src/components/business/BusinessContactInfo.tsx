import { MapPin, Globe, Mail, Phone } from "lucide-react";

interface BusinessContactInfoProps {
  business: {
    website?: string;
    email?: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

export const BusinessContactInfo = ({ business }: BusinessContactInfoProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      {business.website && (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Globe className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h5 className="text-sm font-medium">Website</h5>
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
            <h5 className="text-sm font-medium">Email</h5>
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
            <h5 className="text-sm font-medium">Phone</h5>
            <p className="text-sm text-gray-600">{business.phone}</p>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <MapPin className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h5 className="text-sm font-medium">Address</h5>
          <p className="text-sm text-gray-600">
            {business.address}, {business.city}, {business.state} {business.zip_code}
          </p>
        </div>
      </div>
    </div>
  );
};