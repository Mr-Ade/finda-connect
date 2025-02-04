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
  
  // Add detailed debug logs
  console.log("ContactDetails - Received props:", {
    website,
    email,
    phone,
    address,
    city,
    state,
    zip_code
  });

  // Modified validation to check each section independently
  const hasWebsite = website?.trim();
  const hasEmail = email?.trim();
  const hasPhone = phone?.trim();
  const hasAddress = address?.trim() || city?.trim() || state?.trim() || zip_code?.trim();

  const hasAnyContact = hasWebsite || hasEmail || hasPhone || hasAddress;
  console.log("ContactDetails - Has any contact info:", hasAnyContact);
  
  if (!hasAnyContact) {
    console.log("ContactDetails - No contact information available");
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
      {hasWebsite && (
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

      {hasEmail && (
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

      {hasPhone && (
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

      {hasAddress && (
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Get Directions</h4>
            <p className="text-gray-900">
              {[address, city, state, zip_code].filter(Boolean).join(", ")}
            </p>
            <Button
              variant="link"
              className="px-0 text-primary hover:underline"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([address, city, state, zip_code].filter(Boolean).join(", "))}`)}
            >
              View on Map
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};