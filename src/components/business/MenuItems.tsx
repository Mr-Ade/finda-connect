import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

interface MenuItemsProps {
  businessId: string;
}

export const MenuItems = ({ businessId }: MenuItemsProps) => {
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ['menu-items', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('business_id', businessId)
        .order('category', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading menu items...</div>;
  }

  if (!menuItems?.length) {
    return null;
  }

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8 last:mb-0">
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};