import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MainLayout } from "@/components/layouts/MainLayout";

const Security = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Security", href: "#", active: true },
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
            <h1 className="text-4xl font-bold mb-8 text-center">Security</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-600 mb-6">
                Learn about our commitment to keeping your data safe and secure.
                We implement industry-standard security measures to protect your information.
              </p>
              {/* Add more security-related content */}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Security;