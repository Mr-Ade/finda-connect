import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const WhoWeAre = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "#", active: true },
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
          <h1 className="text-4xl font-bold mb-8 text-center">Who We Are</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              We are a dedicated team committed to connecting businesses with their customers.
              Our platform makes it easy to discover, connect, and engage with local businesses.
            </p>
            {/* Add more content about the company */}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default WhoWeAre;