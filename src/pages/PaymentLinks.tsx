import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MainLayout } from "@/components/layouts/MainLayout";

const PaymentLinks = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Payment Links", href: "#", active: true },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-900 py-3">
          <div className="container mx-auto px-4">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Payment Links</h1>
            <p className="text-gray-600 text-center mb-8">
              Manage your payment links and transactions
            </p>
            {/* Add payment links management interface here */}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default PaymentLinks;