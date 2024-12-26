import { MapPin, Phone, Globe, Mail } from "lucide-react";

interface BusinessInfoProps {
  business: {
    name: string;
    description: string;
    category: string;
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
    };
  };
}

export const BusinessInfo = ({ business }: BusinessInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
      <p className="text-gray-600 mb-4">{business.category}</p>
      
      <div className="space-y-4">
        <p className="text-gray-700">{business.description}</p>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span>
            {business.address}, {business.city}, {business.state} {business.zip_code}
          </span>
        </div>
        
        {business.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            <a href={`tel:${business.phone}`}>{business.phone}</a>
          </div>
        )}
        
        {business.website && (
          <div className="flex items-center text-gray-600">
            <Globe className="w-5 h-5 mr-2" />
            <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {business.website}
            </a>
          </div>
        )}
        
        {business.email && (
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-2" />
            <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
              {business.email}
            </a>
          </div>
        )}
      </div>
      
      {business.owner && (
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600">Business Owner:</p>
          <div className="flex items-center mt-2">
            <img
              src={business.owner.avatar_url || "/placeholder.svg"}
              alt={business.owner.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium">{business.owner.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};