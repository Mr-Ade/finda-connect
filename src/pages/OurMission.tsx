import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Target, Flag, Handshake } from "lucide-react";

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
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">Mission Statement</h2>
              </div>
              <p className="text-gray-600 text-lg italic mb-8">
                "To empower Nigerian businesses to thrive by providing a reliable and accessible platform that connects them with their target audience."
              </p>

              <div className="flex items-center mb-6">
                <Flag className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">Vision Statement</h2>
              </div>
              <p className="text-gray-600 text-lg italic mb-8">
                "To become the leading online business directory in Nigeria, trusted by both businesses and consumers for comprehensive and accurate information."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Handshake className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">Our Objectives</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Business Growth</h3>
                    <p className="text-gray-600">Expand the number of listed businesses across all sectors in Nigeria</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">User Engagement</h3>
                    <p className="text-gray-600">Increase user engagement and platform usage through innovative features</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Platform Enhancement</h3>
                    <p className="text-gray-600">Develop new features and services to enhance the user experience</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Partnerships</h3>
                    <p className="text-gray-600">Build strong partnerships with local businesses and organizations</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Economic Growth</h3>
                    <p className="text-gray-600">Promote the growth of the Nigerian economy through digital connectivity</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                    <p className="text-gray-600">Stay at the forefront of technological advancement in business directory services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default OurMission;