import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  appointment_date: string;
  name: string;
  email: string;
  phone: string;
  status: string;
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

      // If viewing as business owner, get all appointments for their businesses
      // Otherwise, get user's appointments
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
      return data as Appointment[];
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
    <Card>
      <CardHeader>
        <CardTitle>
          {isBusinessOwner ? "Manage Appointments" : "My Appointments"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!appointments?.length ? (
          <div className="text-center py-8 text-muted-foreground">
            No appointments found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                {!isBusinessOwner && <TableHead>Business</TableHead>}
                <TableHead>Status</TableHead>
                {isBusinessOwner && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(appointment.appointment_date), "PPp")}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>
                    <div>
                      <div>{appointment.email}</div>
                      <div className="text-sm text-muted-foreground">{appointment.phone}</div>
                    </div>
                  </TableCell>
                  {!isBusinessOwner && (
                    <TableCell>{appointment.business.name}</TableCell>
                  )}
                  <TableCell>
                    <Badge 
                      variant={
                        appointment.status === 'confirmed' ? 'default' :
                        appointment.status === 'cancelled' ? 'destructive' :
                        'secondary'
                      }
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  {isBusinessOwner && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                          disabled={appointment.status === 'confirmed'}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          disabled={appointment.status === 'cancelled'}
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
