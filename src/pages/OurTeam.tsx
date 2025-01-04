import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const OurTeam = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Team", href: "#", active: true },
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
          <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
          <p className="text-gray-600 text-center mb-8">
            Meet the dedicated professionals behind our success
          </p>
          {/* Add team members grid here */}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default OurTeam;