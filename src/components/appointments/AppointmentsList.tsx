import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useEffect } from "react";
import { 
  Calendar,
  CircleDollarSign,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
  Users
} from "lucide-react";
import type { Appointment, AppointmentStatus } from "@/types/supabase/appointment";

interface AppointmentsListProps {
  isBusinessOwner?: boolean;
}

export const AppointmentsList = ({ isBusinessOwner }: AppointmentsListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      console.log("Fetching appointments...");
      const query = supabase
        .from("appointments")
        .select(`
          *,
          business:businesses(name)
        `)
        .order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      console.log("Fetched appointments:", data);
      return data as unknown as Appointment[];
    },
  });

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        (payload) => {
          console.log('Appointment update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['appointments'] });
          
          // Show toast notification for status changes
          if (payload.eventType === 'UPDATE') {
            const newData = payload.new as Appointment;
            const oldData = payload.old as Appointment;
            
            if (newData.status !== oldData.status) {
              toast({
                title: "Appointment Status Updated",
                description: `Appointment status changed to ${newData.status}`,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Appointment status updated",
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast({
        title: "Error",
        description: "Failed to update appointment status",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading appointments</div>;
  }

  return (
    <div className="dashboard-list-wraps bg-white rounded mb-4">
      <div className="dashboard-list-wraps-head border-b py-3 px-3">
        <div className="dashboard-list-wraps-flx">
          <h4 className="mb-0 font-medium text-lg">
            <Calendar className="inline-block mr-2 text-primary" size={20} />
            All Bookings
          </h4>
        </div>
      </div>

      <div className="dashboard-list-wraps-body py-3 px-3">
        <div className="dashboard-bookings-wraps space-y-4">
          {appointments?.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h5 className="text-lg font-semibold flex items-center">
                    <User className="mr-2" size={20} />
                    {appointment.name}
                    <span className="text-sm text-gray-500 ml-2">
                      {format(new Date(appointment.created_at), "dd MMM yyyy")}
                    </span>
                  </h5>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  {appointment.payment_method && (
                    <div className="px-2 py-1 text-sm bg-green-50 text-green-600 rounded">
                      Paid via {appointment.payment_method}
                    </div>
                  )}
                  <div className={`px-2 py-1 text-sm rounded ${
                    appointment.status === "confirmed" 
                      ? "bg-green-50 text-green-600"
                      : appointment.status === "pending"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-600"
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 text-gray-400" size={18} />
                  <span className="text-gray-600">{appointment.business.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 text-gray-400" size={18} />
                  <span className="text-gray-600">
                    {format(new Date(appointment.appointment_date), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-400" size={18} />
                  <span className="text-gray-600">
                    {format(new Date(appointment.appointment_date), "hh:mm a")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 text-gray-400" size={18} />
                  <span className="text-gray-600">{appointment.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 text-gray-400" size={18} />
                  <span className="text-gray-600">{appointment.phone}</span>
                </div>
                {appointment.amount && (
                  <div className="flex items-center">
                    <CircleDollarSign className="mr-2 text-gray-400" size={18} />
                    <span className="text-gray-600">${appointment.amount}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleStatusChange(appointment.id, "confirmed")}
                  disabled={appointment.status === "confirmed"}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleStatusChange(appointment.id, "cancelled")}
                  disabled={appointment.status === "cancelled"}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
