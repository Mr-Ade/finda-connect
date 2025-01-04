import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/Map";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-28 bg-gradient-to-r from-primary/90 to-primary">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px_16px]" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-white/90 text-lg">
              Start working with Goodup that can provide everything you need to generate awareness, drive traffic, connect.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container px-4 -mt-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground text-sm mb-1">The phrasal sequence of the is now so that many campaign and benefit</p>
                <a href="tel:+152534-468-854" className="text-primary hover:text-primary/90">+152 534-468-854</a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground text-sm mb-1">The phrasal sequence of the is now so that many campaign and benefit</p>
                <a href="mailto:contact@example.com" className="text-primary hover:text-primary/90">contact@example.com</a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground text-sm mb-1">The phrasal sequence of the is now so that many campaign and benefit</p>
                <span className="text-primary">View on Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Get in touch!</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Input 
                    placeholder="Name" 
                    className="bg-gray-50/50 border-0 focus-visible:ring-1"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-gray-50/50 border-0 focus-visible:ring-1"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Subject" 
                    className="bg-gray-50/50 border-0 focus-visible:ring-1"
                  />
                </div>
                <div>
                  <Input 
                    type="tel" 
                    placeholder="Phone" 
                    className="bg-gray-50/50 border-0 focus-visible:ring-1"
                  />
                </div>
              </div>
              <div>
                <Textarea 
                  placeholder="Message" 
                  className="min-h-[150px] bg-gray-50/50 border-0 focus-visible:ring-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;