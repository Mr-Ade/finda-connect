import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const OurMission = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Mission", href: "#", active: true },
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
          <h1 className="text-4xl font-bold mb-8 text-center">Our Mission</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              Our mission is to empower businesses and consumers by creating meaningful connections
              and providing a platform that makes business discovery and engagement seamless.
            </p>
            {/* Add more mission-related content */}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default OurMission;