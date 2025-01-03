import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AppointmentsList } from "@/components/appointments/AppointmentsList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Appointments = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Appointments</h1>
        <nav className="text-sm breadcrumbs">
          <ul className="flex gap-2 text-muted-foreground">
            <li>Home</li>
            <li className="before:content-['/'] before:mx-2">Dashboard</li>
            <li className="before:content-['/'] before:mx-2 text-primary">Appointments</li>
          </ul>
        </nav>
      </div>

      <AppointmentsList isBusinessOwner={profile?.business_owner} />
    </DashboardLayout>
  );
};

export default Appointments;