import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

interface MenuItemsProps {
  businessId: string;
}

export const MenuItems = ({ businessId }: MenuItemsProps) => {
  const { data: menuItems } = useQuery({
    queryKey: ["menu-items", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("business_id", businessId);

      if (error) throw error;
      return (data || []) as MenuItem[];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems?.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h4 className="font-medium text-lg">{item.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <div className="mt-1">
                  <span className="text-primary font-semibold">${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};