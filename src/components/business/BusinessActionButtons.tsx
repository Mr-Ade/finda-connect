import { Button } from "@/components/ui/button";

export const BusinessActionButtons = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
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
  );
};