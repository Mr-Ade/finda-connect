import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Mail, Phone, Building, DollarSign, CreditCard, Check, Trash2, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Appointment {
  id: string;
  appointment_date: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  amount: number | null; // Made nullable since we set a default
  payment_method: string | null; // Made nullable since we set a default
  business: {
    name: string;
  };
}

export const AppointmentsList = ({ isBusinessOwner = false }) => {
  const { toast } = useToast();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      let query = supabase
        .from('appointments')
        .select(`
          *,
          business:businesses(name)
        `);

      if (isBusinessOwner) {
        query = query.in('business_id', [
          supabase
            .from('businesses')
            .select('id')
            .eq('owner_id', session.user.id)
        ]);
      } else {
        query = query.eq('user_id', session.user.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as Appointment[]; // Type assertion after we've verified the shape
    },
  });

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: "Appointment status has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="goodup-dashboard-content">
      <div className="dashboard-tlbar d-block mb-5">
        <div className="row">
          <div className="colxl-12 col-lg-12 col-md-12">
            <h1 className="text-2xl font-medium">My Bookings</h1>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="text-muted">Home</li>
                <li className="text-muted">/</li>
                <li className="text-muted">Dashboard</li>
                <li className="text-muted">/</li>
                <li className="text-primary">My Bookings</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="dashboard-widg-bar d-block">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <Card className="dashboard-list-wraps bg-white rounded mb-4">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <h4 className="text-lg font-medium flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    All Bookings
                  </h4>
                </div>
              </div>

              <div className="p-4">
                {!appointments?.length ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No appointments found
                  </div>
                ) : (
                  <div className="dashboard-bookings-wraps space-y-6">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="dsd-single-bookings-wraps border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h5 className="text-lg font-medium">{appointment.name}</h5>
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(appointment.appointment_date), 'dd MMM yyyy')}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.business.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{format(new Date(appointment.appointment_date), 'PPp')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.phone}</span>
                              </div>
                              {appointment.amount && (
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <span>${appointment.amount}</span>
                                </div>
                              )}
                              {appointment.payment_method && (
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                                  <span>{appointment.payment_method}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 mt-4">
                              {isBusinessOwner && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                    disabled={appointment.status === 'confirmed'}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                    disabled={appointment.status === 'cancelled'}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};