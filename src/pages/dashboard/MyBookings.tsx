import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Building, Car, Home, X, Check } from "lucide-react";

const MyBookings = () => {
  const { toast } = useToast();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      console.log('Fetching bookings for user:', session.user.id);
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          businesses (
            name,
            category,
            address,
            city,
            state
          )
        `)
        .eq('user_id', session.user.id)
        .order('appointment_date', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error fetching bookings",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Fetched bookings:', data);
      return data;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category?.toLowerCase().includes('car')) {
      return <Car className="w-5 h-5" />;
    } else if (category?.toLowerCase().includes('property') || category?.toLowerCase().includes('real estate')) {
      return <Home className="w-5 h-5" />;
    } else {
      return <Building className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <Button variant="outline">
          Filter Bookings
        </Button>
      </div>

      <div className="grid gap-6">
        {bookings?.map((booking) => (
          <Card key={booking.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{booking.businesses?.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      {getCategoryIcon(booking.businesses?.category)}
                      <span>{booking.businesses?.category}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(booking.appointment_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(booking.appointment_date).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {[
                        booking.businesses?.address,
                        booking.businesses?.city,
                        booking.businesses?.state
                      ].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[120px]">
                {booking.status === 'pending' && (
                  <>
                    <Button 
                      variant="default"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Coming soon",
                          description: "This feature will be available soon",
                        });
                      }}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                    <Button 
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Coming soon",
                          description: "This feature will be available soon",
                        });
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {bookings?.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-gray-500">No bookings found</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBookings;