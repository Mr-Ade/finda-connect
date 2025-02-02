import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQ as FAQComponent } from "@/components/business/FAQ";

const FAQ = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "#" },
    { label: "FAQ's", href: "/faq", active: true },
  ];

  const basicFaqs = [
    {
      id: "1",
      question: "What's Included in Finda Listing?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "John Doe",
      answeredBy: "Support Team",
      date: "2024-01-20"
    },
    {
      id: "2",
      question: "What is the difference between Finda and Other Listings?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Jane Smith",
      answeredBy: "Support Team",
      date: "2024-01-21"
    },
    {
      id: "3",
      question: "How many websites can we launch with Finda?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Mike Johnson",
      answeredBy: "Support Team",
      date: "2024-01-22"
    }
  ];

  const paymentFaqs = [
    {
      id: "4",
      question: "Which license is better for business purpose?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Sarah Wilson",
      answeredBy: "Support Team",
      date: "2024-01-23"
    },
    {
      id: "5",
      question: "After purchase can we resell Finda on any other marketplace?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "David Brown",
      answeredBy: "Support Team",
      date: "2024-01-24"
    },
    {
      id: "6",
      question: "Can we get any offer for Finda?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Emily Davis",
      answeredBy: "Support Team",
      date: "2024-01-25"
    }
  ];

  const advancedFaqs = [
    {
      id: "7",
      question: "Can I get Finda listing for free?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Alex Thompson",
      answeredBy: "Support Team",
      date: "2024-01-26"
    },
    {
      id: "8",
      question: "How to Permanently Delete Files From Windows?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Chris Martin",
      answeredBy: "Support Team",
      date: "2024-01-27"
    },
    {
      id: "9",
      question: "Can I get Finda listing for free?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      askedBy: "Lisa Anderson",
      answeredBy: "Support Team",
      date: "2024-01-28"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">FAQ's Section</h1>
            <h3 className="text-2xl text-gray-600">Frequently Asked Questions</h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Basic FAQ's:</h4>
              <FAQComponent businessId="basic" questions={basicFaqs} />
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Payment and Data's FAQ's:</h4>
              <FAQComponent businessId="payment" questions={paymentFaqs} />
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Advanced FAQ's:</h4>
              <FAQComponent businessId="advanced" questions={advancedFaqs} />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default FAQ;