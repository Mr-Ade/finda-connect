import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AppointmentsList } from "@/components/appointments/AppointmentsList";

const MyBookings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">My Bookings</h1>
          <nav className="text-sm breadcrumbs">
            <ul className="flex gap-2 text-muted-foreground">
              <li><a href="/">Home</a></li>
              <li className="before:content-['/'] before:mx-2">My Bookings</li>
            </ul>
          </nav>
        </div>

        <AppointmentsList />
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;