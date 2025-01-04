import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  image_url: string | null;
  comment: string;
  rating: number | null;
  is_featured: boolean | null;
}

async function fetchTestimonials() {
  console.log("Fetching testimonials...");
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }

  console.log("Fetched testimonials:", data);
  return data;
}

export const CustomerReviews = () => {
  const { toast } = useToast();
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  useEffect(() => {
    if (error) {
      console.error("Error in CustomerReviews:", error);
      toast({
        title: "Error loading reviews",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-gray-500 mb-2">Our Reviews</h6>
          <h2 className="text-3xl font-bold">
            What Our Customer <span className="text-primary">Saying</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <Skeleton className="h-4 w-24 mt-4" />
                  <Skeleton className="h-3 w-16 mt-2" />
                  <Skeleton className="h-20 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : testimonials?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews available yet
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials?.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/3">
                  <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      {testimonial.image_url ? (
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.name}
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                    <div className="mb-4">
                      <h4 className="font-medium text-lg">{testimonial.name}</h4>
                      {testimonial.role && (
                        <span className="text-primary text-sm">{testimonial.role}</span>
                      )}
                      {testimonial.rating && (
                        <div className="flex items-center justify-center mt-2 space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600">{testimonial.comment}</p>
                    {testimonial.is_featured && (
                      <span className="inline-block mt-3 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        Featured Review
                      </span>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
};