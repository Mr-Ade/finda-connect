import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'] & {
  seller: Database['public']['Tables']['profiles']['Row'] | null;
};

const Shop = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      console.log('Fetching products for page:', page);
      
      const { data, error, count } = await supabase
        .from('products')
        .select(`
          *,
          seller:profiles(*)
        `, { count: 'exact' })
        .range((page - 1) * productsPerPage, page * productsPerPage - 1)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Products fetched:', data);
      return {
        products: (data || []) as Product[],
        totalCount: count || 0,
        hasMore: (count || 0) > (page * productsPerPage)
      };
    }
  });

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop</h1>
          <p className="text-gray-600">Browse and purchase amazing products</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {data?.products && data.products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.products.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {product.image_url && (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-bold">
                            ${product.price}
                          </span>
                          <Button size="sm">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {data.hasMore && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      className="inline-flex items-center"
                    >
                      Load More Products
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;