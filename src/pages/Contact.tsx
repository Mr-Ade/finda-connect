import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
    toast({
      title: "Message sent",
      description: "We'll get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Name *</label>
                  <Input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Email *</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile</label>
                  <Input 
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Your Mobile Number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <Input 
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Message Subject"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Your Message..."
                    className="h-32"
                  />
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-primary font-medium mb-3">Address info:</h4>
                <p className="text-gray-600">1354 Green Street Nashville Drive Dodge City,<br/> KS 67801 United States</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="text-primary font-medium mb-3">Call Us:</h4>
                <h6 className="font-medium mb-1">Customer Care:</h6>
                <p className="text-gray-600">+91 458 753 6924</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="text-primary font-medium mb-3">Drop A Mail:</h4>
                <p className="text-gray-600">Drop mail we will contact you within 24 hours.</p>
                <p className="text-gray-900">dhananjaypreet@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;