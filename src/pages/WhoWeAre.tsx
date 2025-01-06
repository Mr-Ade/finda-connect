import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Building, Award, Users, Target, Flag } from "lucide-react";

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
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">Our Story</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Founded in 2023, Finda emerged from a group of passionate Nigerian entrepreneurs who recognized a crucial gap in the market. Our journey began with a simple observation: finding reliable local businesses and service providers in Nigeria was unnecessarily challenging. This realization sparked the creation of what would become Nigeria's most comprehensive online business directory.
              </p>
              <p className="text-gray-600">
                As a proudly Nigerian-owned and operated platform, we're deeply invested in the success of our users and the growth of the local economy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Flag className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Our Values</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600"><strong>Reliability:</strong> Providing accurate and up-to-date business information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600"><strong>Accessibility:</strong> Making it easy for anyone to find the businesses they need</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600"><strong>Integrity:</strong> Operating with honesty and transparency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600"><strong>Community:</strong> Supporting and empowering Nigerian businesses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600"><strong>Innovation:</strong> Continuously improving our platform and services</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Achievements</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Successfully launched Finda in October 2023</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Onboarded 1,000+ businesses within first three months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Achieved 10,000+ monthly active users</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Consistently high user satisfaction ratings</span>
                  </li>
                </ul>
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

export default WhoWeAre;