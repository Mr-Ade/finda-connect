import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Users, Mail, Linkedin } from "lucide-react";

const OurTeam = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Team", href: "#", active: true },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Co-founder",
      photo: "/photo-1581092795360-fd1ca04f0952",
      bio: "With over 15 years of experience in digital transformation, Sarah leads Finda's mission to revolutionize business discovery in Nigeria.",
      linkedin: "#",
      email: "sarah@finda.com"
    },
    {
      name: "Michael Okonkwo",
      position: "CTO",
      photo: "/photo-1485827404703-89b55fcc595e",
      bio: "A tech veteran with expertise in scalable platforms, Michael ensures Finda's technology infrastructure meets the highest standards.",
      linkedin: "#",
      email: "michael@finda.com"
    },
    {
      name: "Amina Yusuf",
      position: "Marketing Manager",
      photo: "/photo-1581091226825-a6a2a5aee158",
      bio: "Amina brings creative marketing strategies that help connect Nigerian businesses with their ideal customers.",
      linkedin: "#",
      email: "amina@finda.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Users className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Our Team</h1>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      <a 
                        href={member.linkedin}
                        className="text-gray-600 hover:text-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-gray-600 hover:text-primary transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default OurTeam;