import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const NotFound = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Page", href: "#" },
    { label: "Error Page", href: "#", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl text-center">
              {/* 404 Image */}
              <div className="mb-8">
                <img 
                  src="/lovable-uploads/466c2f0b-adaf-4844-b5dc-0b430e8e3f2c.png" 
                  alt="404 Error" 
                  className="w-full max-w-md mx-auto"
                />
              </div>

              {/* Content */}
              <h1 className="text-4xl font-bold mb-4">
                Whoops! That page doesn't exist.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                The page you requested could not be found
              </p>

              {/* Button */}
              <Button 
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
              >
                Go To Home Page
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;