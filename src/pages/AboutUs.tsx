import { Link } from "react-router-dom";
import { Newsletter } from "@/components/home/Newsletter";

const teamMembers = [
  {
    name: "James R. Smith",
    role: "Project Manager",
    image: "/team/t-1.png",
    isNew: true,
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Howard L. Gallegos",
    role: "Team Leader",
    image: "/team/t-2.png",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Patricia C. Foshee",
    role: "UI/UX Designer",
    image: "/team/t-3.png",
    isPopular: true,
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Helen A. Robbins",
    role: "Web Developer",
    image: "/team/t-4.png",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  }
];

const workingSteps = [
  {
    icon: "🔍",
    title: "Find Interesting Place",
    description: "Browse through our curated list of high-quality businesses and discover your next favorite spot."
  },
  {
    icon: "👥",
    title: "Contact A Few Owners",
    description: "Connect directly with business owners to get detailed information and special offers."
  },
  {
    icon: "📅",
    title: "Make A Reservation",
    description: "Book your spot quickly and easily with our streamlined reservation system."
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-32"
        style={{ backgroundImage: "url('/about-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Smart team always create better things and better solutions.
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
              Get Started
              <span className="ml-2">→</span>
            </button>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-sky-400 mb-2">07+</h3>
                <p className="text-white">Business Listing</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">06k+</h3>
                <p className="text-white">Popular Authors</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-400 mb-2">200+</h3>
                <p className="text-white">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-primary font-medium mb-2">Working Process</h6>
            <h2 className="text-3xl font-bold text-center mb-4">How It Working</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workingSteps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl bg-primary/10 rounded-full">
                  {step.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-primary font-medium mb-2">Our Team</h6>
            <h2 className="text-3xl font-bold">Goodup Expert team</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center group">
                <div className="relative">
                  {(member.isNew || member.isPopular) && (
                    <div className={`absolute top-4 left-4 px-3 py-1 text-sm text-white ${member.isNew ? 'bg-primary' : 'bg-yellow-500'} rounded`}>
                      {member.isNew ? 'New' : 'Popular'}
                    </div>
                  )}
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    {Object.entries(member.socialLinks).map(([platform, link]) => (
                      <a 
                        key={platform} 
                        href={link}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      >
                        <i className={`fab fa-${platform}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default AboutUs;