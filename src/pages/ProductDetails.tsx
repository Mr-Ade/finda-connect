import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import type { Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'] & {
  seller: Database['public']['Tables']['profiles']['Row'] | null;
};

export default function ProductDetails() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      console.log('Fetching product details:', id);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          seller:profiles(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      return data as Product;
    },
  });

  const handleAddToCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add items to cart",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: id!,
          quantity: 1
        }, {
          onConflict: 'user_id,product_id'
        });

      if (error) throw error;

      toast({
        title: "Added to cart",
        description: "Item has been added to your cart"
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">Error loading product details</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="bg-[#05222A] py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-white hover:text-primary">Home</a>
            <span className="text-white">/</span>
            <a href="/shop" className="text-white hover:text-primary">Shop</a>
            <span className="text-white">/</span>
            <span className="text-primary">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">
              ${product.price?.toFixed(2)}
            </p>
            {product.seller && (
              <p className="text-sm text-gray-600">
                Sold by {product.seller.full_name || product.seller.username}
              </p>
            )}
            <p className="text-gray-600">{product.description}</p>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Stock: {product.stock} available
              </p>
              <Button 
                onClick={handleAddToCart}
                className="w-full md:w-auto"
                disabled={product.stock < 1}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}