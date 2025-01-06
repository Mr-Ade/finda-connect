import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        {/* 404 Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-lg mx-auto">
              <img 
                src="/lovable-uploads/466c2f0b-adaf-4844-b5dc-0b430e8e3f2c.png" 
                alt="404 Error" 
                className="w-full h-auto mb-8"
              />
              <h1 className="text-3xl font-bold mb-4">
                Whoops! That page doesn't exist.
              </h1>
              <p className="text-gray-600 mb-8">
                The page you requested could not be found
              </p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
              >
                Go To Home Page
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <div className="bg-[#03343b]">
          <Newsletter />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;