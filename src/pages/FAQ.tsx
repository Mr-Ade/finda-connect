import { CommunityQuestion } from "@/types/business";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

const generalQuestions: CommunityQuestion[] = [
  {
    id: "1",
    question: "What is Lovable?",
    answer: "Lovable is a local business directory and review platform that helps you discover and connect with great local businesses. Our platform provides detailed business information, customer reviews, and photos to help you make informed decisions about where to shop, eat, and find services in your area.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  },
  {
    id: "2",
    question: "Is Lovable free to use?",
    answer: "Yes, Lovable is completely free for consumers to use. You can search for businesses, read reviews, and create an account without any cost. Business owners may have premium features available for a fee.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  },
  {
    id: "3",
    question: "How do I create an account?",
    answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner of the page, enter your email address and create a password. You can also sign up using your Google or Facebook account for quicker access.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  }
];

const businessQuestions: CommunityQuestion[] = [
  {
    id: "4",
    question: "How do I claim my business?",
    answer: "To claim your business, search for your business on Lovable and click the 'Claim This Business' button on your business page. You'll need to verify your ownership through our verification process, which may include providing business documentation and completing a phone verification.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  },
  {
    id: "5",
    question: "How can I update my business information?",
    answer: "Once you've claimed your business, you can update your business information by logging into your business account and accessing the business dashboard. From there, you can edit your business details, hours, photos, and more.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  },
  {
    id: "6",
    question: "What are the benefits of claiming my business?",
    answer: "Claiming your business gives you control over your business profile, allowing you to respond to reviews, update business information, add photos, and access analytics about how customers interact with your page. You can also access promotional tools and features to help grow your business.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  }
];

const reviewQuestions: CommunityQuestion[] = [
  {
    id: "7",
    question: "How do I write a review?",
    answer: "To write a review, first find the business you want to review using our search feature. On the business page, click the 'Write a Review' button. You'll need to be logged in to submit a review. Rate your experience, write your review, and optionally add photos to help others understand your experience.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  },
  {
    id: "8",
    question: "Can I edit or delete my review?",
    answer: "Yes, you can edit or delete your reviews at any time. Go to your profile, find the review you want to modify, and click the edit or delete button. Keep in mind that maintaining honest and accurate reviews helps our community.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  },
  {
    id: "9",
    question: "What are the guidelines for writing reviews?",
    answer: "We encourage honest, respectful, and detailed reviews. Focus on your personal experience, be specific, and avoid personal attacks or inappropriate content. Reviews should be helpful to both businesses and other users. Photos should be relevant to your experience.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    askedBy: "Admin",
    answeredBy: "Team Lovable",
    date: new Date().toISOString()
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    { id: "general", name: "General Questions" },
    { id: "business", name: "For Business Owners" },
    { id: "reviews", name: "Reviews & Community" },
  ];

  const getQuestionsByCategory = () => {
    switch (activeCategory) {
      case "business":
        return businessQuestions;
      case "reviews":
        return reviewQuestions;
      default:
        return generalQuestions;
    }
  };

  const filteredQuestions = getQuestionsByCategory().filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {filteredQuestions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-6 space-y-4"
              >
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}