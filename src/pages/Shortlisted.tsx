import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const Shortlisted = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shortlisted", href: "#", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Shortlisted Items</h1>
          <p className="text-gray-600 text-center mb-8">
            View and manage your shortlisted businesses and listings
          </p>
          {/* Add shortlisted items grid here */}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Shortlisted;