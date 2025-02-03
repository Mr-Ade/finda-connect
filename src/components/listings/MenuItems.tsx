import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Plus, X, ImagePlus } from "lucide-react";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/use-image-upload";

export const MenuItems = () => {
  const { formData, updateFormData } = useBusinessForm();
  const { toast } = useToast();
  const { uploadImage, isUploading } = useImageUpload("business-images");
  
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    orderIndex: 0
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setNewItem(prev => ({ ...prev, imageUrl }));
        toast({
          title: "Image uploaded successfully",
          description: "The menu item image has been uploaded.",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error uploading image",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast({
        title: "Required fields missing",
        description: "Please fill in the name and price fields.",
        variant: "destructive",
      });
      return;
    }

    const priceValue = parseFloat(newItem.price);
    if (isNaN(priceValue) || priceValue < 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price.",
        variant: "destructive",
      });
      return;
    }

    const updatedItems = [
      ...formData.menuItems,
      {
        name: newItem.name,
        description: newItem.description,
        price: priceValue,
        category: newItem.category,
        imageUrl: newItem.imageUrl,
        orderIndex: formData.menuItems.length
      }
    ];

    updateFormData('menuItems', updatedItems);
    setNewItem({ 
      name: "", 
      description: "", 
      price: "", 
      category: "", 
      imageUrl: "",
      orderIndex: 0
    });

    toast({
      title: "Menu item added",
      description: "The menu item has been added successfully.",
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.menuItems.filter((_, i) => i !== index);
    // Update order indices after removal
    const reorderedItems = updatedItems.map((item, idx) => ({
      ...item,
      orderIndex: idx
    }));
    updateFormData('menuItems', reorderedItems);
    
    toast({
      title: "Menu item removed",
      description: "The menu item has been removed successfully.",
    });
  };

  // Group menu items by category for display
  const groupedItems = formData.menuItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof formData.menuItems>);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <UtensilsCrossed className="w-5 h-5" />
        <h3 className="font-medium">Menu Items</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name *</Label>
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
            <Label htmlFor="price">Price *</Label>
            <Input 
              id="price" 
              type="number"
              min="0"
              step="0.01"
              value={newItem.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Enter price" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your item"
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="itemImage">Item Image</Label>
          <div className="flex items-center gap-4">
            <Input
              id="itemImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('itemImage')?.click()}
              disabled={isUploading}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </Button>
            {newItem.imageUrl && (
              <div className="relative w-16 h-16">
                <img
                  src={newItem.imageUrl}
                  alt="Menu item preview"
                  className="w-full h-full object-cover rounded"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={() => setNewItem(prev => ({ ...prev, imageUrl: '' }))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="button"
          variant="outline" 
          onClick={handleAddItem}
          className="w-full md:w-auto"
          disabled={isUploading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>

        {Object.entries(groupedItems).length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Added Items</h4>
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
                <div className="grid gap-4">
                  {items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">{item.name}</h5>
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          )}
                        </div>
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};