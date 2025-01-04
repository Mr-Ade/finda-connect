import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Link } from "react-router-dom";

const SiteMap = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Site Map", href: "#", active: true },
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
            <h1 className="text-4xl font-bold mb-8 text-center">Site Map</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Main Pages */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
                  <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
                  <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
                </ul>
              </div>
              {/* Add more sections with links */}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default SiteMap;