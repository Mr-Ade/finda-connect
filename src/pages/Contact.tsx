import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/Map";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <div className="relative py-24 bg-gradient-to-r from-primary/90 to-primary">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px_16px]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 -mt-20 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Phone</h3>
            <p className="text-muted-foreground">Mon-Fri from 8am to 5pm</p>
            <a href="tel:+12345678901" className="text-lg text-primary hover:underline mt-2 block">
              +1 234 567 8901
            </a>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Email</h3>
            <p className="text-muted-foreground">Our friendly team is here to help</p>
            <a href="mailto:info@example.com" className="text-lg text-primary hover:underline mt-2 block">
              info@example.com
            </a>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Office</h3>
            <p className="text-muted-foreground">Come say hello at our office</p>
            <p className="text-lg mt-2">123 Business Avenue, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message"
                  placeholder="Your message here..." 
                  className="min-h-[150px] resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-card rounded-xl shadow-lg overflow-hidden h-[600px]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;