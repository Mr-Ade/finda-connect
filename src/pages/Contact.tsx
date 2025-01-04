import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/Map";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-white/80">
              Get in touch with us to explore business opportunities and partnerships
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 -mt-16 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+1 234 567 8901</p>
            <p className="text-gray-600">+1 234 567 8902</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">info@example.com</p>
            <p className="text-gray-600">support@example.com</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">123 Business Avenue</p>
            <p className="text-gray-600">New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
              </div>
              <div>
                <Input placeholder="Subject" />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;