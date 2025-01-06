import { Link } from "react-router-dom";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const teamMembers = [
  {
    name: "James R. Smith",
    role: "Project Manager",
    image: "/team/t-1.png",
    isNew: true
  },
  {
    name: "Howard L. Gallegos",
    role: "Team Leader",
    image: "/team/t-2.png"
  },
  {
    name: "Patricia C. Foshee",
    role: "UI/UX Designer",
    image: "/team/t-3.png",
    isPopular: true
  },
  {
    name: "Helen A. Robbins",
    role: "Web Developer",
    image: "/team/t-4.png"
  }
];

const workingSteps = [
  {
    icon: <i className="ti-map-alt text-success" />,
    title: "Find Interesting Place",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti"
  },
  {
    icon: <i className="ti-user theme-cl" />,
    title: "Contact A Few Owners",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti"
  },
  {
    icon: <i className="ti-shield text-sky" />,
    title: "Make A Reservation",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti"
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-primary font-medium mb-2">Working Process</h6>
            <h2 className="text-3xl font-bold">How It Working</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {workingSteps.map((step, index) => (
              <div key={index} className="p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="mb-4">{step.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-primary font-medium mb-2">Our Team</h6>
            <h2 className="text-3xl font-bold">Finda Expert Team</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {(member.isNew || member.isPopular) && (
                  <div className={`px-3 py-1 text-sm text-white ${member.isNew ? 'bg-primary' : 'bg-yellow-500'} absolute`}>
                    {member.isNew ? 'New' : 'Popular'}
                  </div>
                )}
                <div className="p-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-lg font-semibold text-center mb-1">{member.name}</h4>
                  <p className="text-gray-600 text-center mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-facebook" /></a>
                    <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-twitter" /></a>
                    <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-instagram" /></a>
                    <a href="#" className="text-gray-400 hover:text-primary"><i className="fab fa-linkedin" /></a>
                  </div>
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