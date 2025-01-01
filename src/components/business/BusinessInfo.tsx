import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Globe, Mail } from "lucide-react";
import { BusinessHours } from "./BusinessHours";
import { BusinessHoursForm } from "./BusinessHoursForm";

interface BusinessInfoProps {
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
    owner_id?: string;
  };
  isOwner: boolean;
}

export const BusinessInfo = ({ business, isOwner }: BusinessInfoProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">{business.description}</p>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>
                {business.address}, {business.city}, {business.state} {business.zip_code}
              </span>
            </div>
            
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{business.phone}</span>
              </div>
            )}
            
            {business.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <a 
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {business.website}
                </a>
              </div>
            )}
            
            {business.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <a 
                  href={`mailto:${business.email}`}
                  className="text-primary hover:underline"
                >
                  {business.email}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isOwner ? (
        <BusinessHoursForm businessId={business.id} />
      ) : (
        <BusinessHours businessId={business.id} />
      )}
    </div>
  );
};