import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface ReviewEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedText: string) => void;
  reviewText: string;
}

export const ReviewEditDialog = ({
  isOpen,
  onClose,
  onSave,
  reviewText,
}: ReviewEditDialogProps) => {
  const [editedText, setEditedText] = useState(reviewText);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>
            Make changes to the review content below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(editedText)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};