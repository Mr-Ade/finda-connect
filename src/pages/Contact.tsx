import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Map } from "@/components/Map";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input placeholder="Your Name" required />
              </div>
              <div>
                <Input type="email" placeholder="Email Address" required />
              </div>
              <div>
                <Input placeholder="Subject" required />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="h-[300px] rounded-lg overflow-hidden">
              <Map 
                center={{ lat: 9.0820, lng: 8.6753 }}
                markers={[{ lat: 9.0820, lng: 8.6753 }]}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Business Avenue, Lagos, Nigeria
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">
                  <Link to="tel:+2341234567890">+234 123 456 7890</Link>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">
                  <Link to="mailto:contact@example.com">
                    contact@example.com
                  </Link>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Working Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;