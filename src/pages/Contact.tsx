import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map } from "@/components/Map";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-1 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Your Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Your Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Mobile
                  </label>
                  <Input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 256 548 7542"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Type Your Subject"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                Send Message
              </Button>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-red-500">Address info:</h3>
              <p className="text-gray-600">
                1354 Green Street Nashville Drive, Dodge City, KS 67801 United States
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-red-500">Call Us:</h3>
              <h4 className="font-medium mb-2">Customer Care:</h4>
              <p className="text-gray-600">
                <a href="tel:+914587536924" className="hover:text-red-500">
                  +91 458 753 6924
                </a>
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-red-500">Drop A Mail:</h3>
              <p className="text-gray-600 mb-2">
                Drop mail we will contact you within 24 hours.
              </p>
              <a 
                href="mailto:dhananjaypreet@gmail.com" 
                className="text-gray-800 hover:text-red-500"
              >
                dhananjaypreet@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;