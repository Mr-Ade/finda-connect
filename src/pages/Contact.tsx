import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Map } from "@/components/Map";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Thank you for subscribing to our newsletter!",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-white hover:text-primary">Home</Link>
            <span className="text-white">/</span>
            <Link to="#" className="text-white hover:text-primary">Pages</Link>
            <span className="text-white">/</span>
            <span className="text-primary">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Name *</label>
                  <Input placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Email *</label>
                  <Input type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile</label>
                  <Input type="tel" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <Input placeholder="Enter subject" />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <Textarea 
                  placeholder="Your message..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="mt-6">
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </div>
            </form>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-primary mb-3">Address info:</h4>
                <p className="text-gray-600">
                  1354 Green Street Nashville Drive Dodge City,<br/> 
                  KS 67801 United States
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-primary mb-3">Call Us:</h4>
                <h6 className="font-medium mb-1">Customer Care:</h6>
                <p className="text-gray-600">+91 458 753 6924</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-primary mb-3">Drop A Mail:</h4>
                <p className="text-gray-600 mb-2">Drop mail we will contact you within 24 hours.</p>
                <p className="text-gray-900">support@finda.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#03343b] bg-[url('/landing-bg.png')] bg-cover py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h6 className="text-white mb-2">Subscribe Now</h6>
            <h2 className="text-3xl font-bold text-white">Get All Updates & Advance Offers</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubscribe} className="bg-white rounded-lg p-1 flex">
              <Input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 focus-visible:ring-0"
              />
              <Button type="submit" className="ml-2">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;