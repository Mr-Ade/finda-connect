import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";

export const MenuItems = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <UtensilsCrossed className="w-5 h-5" />
        <h3 className="font-medium">Menu Items</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input id="itemName" placeholder="Enter item name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" placeholder="Enter category" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="Enter price" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">About Item</Label>
          <Textarea 
            id="description" 
            placeholder="Describe your item"
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="itemImage">Item Image</Label>
          <Input id="itemImage" type="file" accept="image/*" />
        </div>

        <Button variant="outline" className="mt-4">
          Add New Item
        </Button>
      </CardContent>
    </Card>
  );
};