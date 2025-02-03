import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ListingFormActionsProps {
  isSubmitting: boolean;
  progress: number;
}

export const ListingFormActions = ({ isSubmitting, progress }: ListingFormActionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full md:w-auto ml-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving... {progress}%
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </div>
  );
};