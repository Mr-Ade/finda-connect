import { Button } from "@/components/ui/button";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

interface ContactDetailsProps {
  website?: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

export const ContactDetails = ({
  website,
  email,
  phone,
  address,
  city,
  state,
  zip_code
}: ContactDetailsProps) => {
  const formattedWebsite = website?.startsWith('http') ? website : `https://${website}`;
  
  // Add debug logs
  console.log("ContactDetails props:", {
    website,
    email,
    phone,
    address,
    city,
    state,
    zip_code
  });
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      {website && (
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Globe className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Live Site</h4>
            <a 
              href={formattedWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {website}
            </a>
          </div>
        </div>
      )}

      {email && (
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Mail className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Drop a Mail</h4>
            <a href={`mailto:${email}`} className="text-gray-900 hover:text-primary">
              {email}
            </a>
          </div>
        </div>
      )}

      {phone && (
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <Phone className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Call Us</h4>
            <a href={`tel:${phone}`} className="text-gray-900 hover:text-primary">
              {phone}
            </a>
          </div>
        </div>
      )}

      {address && (
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Get Directions</h4>
            <p className="text-gray-900">
              {address}, {city}, {state} {zip_code}
            </p>
            <Button
              variant="link"
              className="px-0 text-primary hover:underline"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}, ${state} ${zip_code}`)}`)}
            >
              View on Map
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};