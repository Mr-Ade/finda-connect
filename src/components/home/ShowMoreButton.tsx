import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShowMoreButtonProps {
  showAll: boolean;
  onClick: () => void;
}

export const ShowMoreButton = ({ showAll, onClick }: ShowMoreButtonProps) => {
  return (
    <div className="mt-8 text-center">
      <Button
        variant="outline"
        onClick={onClick}
        className="inline-flex items-center gap-2"
      >
        {showAll ? (
          <>
            Show Less <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            Show More Categories <ChevronDown className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};