import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

export const CategorySelect = () => {
  const { formData, updateFormData } = useBusinessForm();

  const flattenedCategories = Object.entries(BUSINESS_CATEGORIES).flatMap(([mainCategory, subCategories]) => {
    // Add main category
    const items = [{ value: mainCategory, label: `📁 ${mainCategory}` }];
    
    // Add subcategories and their items
    Object.entries(subCategories).forEach(([subCategory, subItems]) => {
      items.push({ value: `${mainCategory}/${subCategory}`, label: `  ↳ ${subCategory}` });
      
      subItems.forEach(item => {
        items.push({ 
          value: `${mainCategory}/${subCategory}/${item}`,
          label: `    • ${item}`
        });
      });
    });
    
    return items;
  });

  return (
    <Card>
      <CardHeader>
        <h3 className="font-medium">Category</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="category">Select Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => updateFormData('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {flattenedCategories.map((category) => (
                <SelectItem 
                  key={category.value} 
                  value={category.value}
                  className="whitespace-nowrap"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};