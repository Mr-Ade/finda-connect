import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Business } from "@/types/business";

interface BusinessFooterProps {
  business: Business;
}

export const BusinessFooter = ({ business }: BusinessFooterProps) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center text-gray-500 text-sm">
        <Mail className="h-4 w-4 mr-1" />
        {business.city}, {business.state}
      </div>
      <Button variant="ghost" size="icon">
        <Mail className="h-4 w-4" />
      </Button>
    </div>
  );
};