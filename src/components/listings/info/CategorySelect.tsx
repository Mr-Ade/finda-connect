import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBusinessForm } from "@/contexts/BusinessFormContext";
import { INITIAL_CATEGORIES, ADDITIONAL_CATEGORIES } from "@/components/home/CategoryData";

export const CategorySelect = () => {
  const { formData, updateFormData } = useBusinessForm();

  const allCategories = [...INITIAL_CATEGORIES, ...ADDITIONAL_CATEGORIES];
  const flattenedCategories = allCategories.flatMap(category => {
    // Add main category
    const items = [{ value: category.name, label: `📁 ${category.name}` }];
    
    // Add subcategories if they exist
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        items.push({ 
          value: `${category.name} - ${subcategory}`,
          label: `  ↳ ${subcategory}`
        });
      });
    }
    
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