import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Plus, X } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useState } from "react";

export const MenuItems = () => {
  const { formData, updateFormData } = useBusinessForm();
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;

    const updatedItems = [
      ...formData.menuItems,
      {
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        category: newItem.category,
      }
    ];

    updateFormData('menuItems', updatedItems);
    setNewItem({ name: "", description: "", price: "", category: "" });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.menuItems.filter((_, i) => i !== index);
    updateFormData('menuItems', updatedItems);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <UtensilsCrossed className="w-5 h-5" />
        <h3 className="font-medium">Menu Items</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input 
              id="itemName" 
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter item name" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input 
              id="category" 
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Enter category" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price" 
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Enter price" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">About Item</Label>
          <Textarea 
            id="description" 
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your item"
            className="min-h-[80px]"
          />
        </div>

        <Button 
          type="button"
          variant="outline" 
          onClick={handleAddItem}
          className="w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>

        {formData.menuItems.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Added Items</h4>
            <div className="grid gap-4">
              {formData.menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">{item.name}</h5>
                      <span className="font-medium">${item.price}</span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                    {item.category && (
                      <span className="text-xs text-gray-400 mt-1">Category: {item.category}</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="ml-4 text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};