import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Newsletter } from "@/components/home/Newsletter";

const contactInfo = [
  {
    icon: <MapPin className="w-12 h-12 text-primary" />,
    title: "Reach Us",
    details: ["7742 Sadar Street Range Road", "United States"],
  },
  {
    icon: <Mail className="w-12 h-12 text-primary" />,
    title: "Drop A Mail",
    details: ["support@goodup.com", "info@goodup.com"],
  },
  {
    icon: <Phone className="w-12 h-12 text-primary" />,
    title: "Call Us",
    details: ["91 234 567 8765", "91 234 567 8765"],
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: "url('/contact-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-white/80">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-8 rounded-lg border hover:shadow-xl transition-shadow bg-white">
                <div className="flex justify-center mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h6 className="text-primary font-medium mb-2">Contact Form</h6>
              <h2 className="text-3xl font-bold">Get In Touch</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Input placeholder="Your Name" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Input placeholder="Subject" />
                  </div>
                  <div>
                    <Input type="tel" placeholder="Phone No." />
                  </div>
                </div>
                <div>
                  <Textarea 
                    placeholder="Message" 
                    className="min-h-[150px]"
                  />
                </div>
                <div className="text-center">
                  <Button size="lg" className="px-8">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596552044!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1644321750474!5m2!1sen!2s"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Contact;