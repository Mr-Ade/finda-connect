import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AppointmentBookingFormProps {
  businessId: string;
  businessName: string;
}

export const AppointmentBookingForm = ({ businessId, businessName }: AppointmentBookingFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const bookAppointmentMutation = useMutation({
    mutationFn: async (values: {
      date: Date;
      name: string;
      email: string;
      phone: string;
    }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      const { error } = await supabase
        .from('appointments')
        .insert({
          business_id: businessId,
          user_id: session.user.id,
          appointment_date: values.date.toISOString(),
          name: values.name,
          email: values.email,
          phone: values.phone,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Appointment Booked",
        description: `Your appointment with ${businessName} has been scheduled.`,
      });
      // Reset form
      setDate(new Date());
      setName("");
      setEmail("");
      setPhone("");
    },
    onError: (error) => {
      console.error("Error booking appointment:", error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    bookAppointmentMutation.mutate({
      date,
      name,
      email,
      phone,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book an Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Select Date</label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow p-3"
                disabled={(date) => date < new Date()}
              />
            </div>
            
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium block">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium block">Phone</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            disabled={bookAppointmentMutation.isPending}
          >
            {bookAppointmentMutation.isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Booking...
              </div>
            ) : (
              'Book Appointment'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};