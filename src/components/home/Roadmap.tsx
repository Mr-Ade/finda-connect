import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const ROADMAP_ITEMS = [
  {
    status: "completed",
    title: "Business Listings",
    description: "Launch core business listing functionality with search and filters",
    date: "Q1 2024"
  },
  {
    status: "completed",
    title: "User Reviews & Ratings",
    description: "Enable users to leave reviews and ratings for businesses",
    date: "Q1 2024"
  },
  {
    status: "in-progress",
    title: "Appointment Booking",
    description: "Implement real-time appointment booking system",
    date: "Q2 2024"
  },
  {
    status: "planned",
    title: "Mobile App Launch",
    description: "Release native mobile applications for iOS and Android",
    date: "Q3 2024"
  },
  {
    status: "planned",
    title: "Business Analytics",
    description: "Advanced analytics and insights for business owners",
    date: "Q4 2024"
  },
  {
    status: "planned",
    title: "International Expansion",
    description: "Support for multiple languages and currencies",
    date: "Q1 2025"
  }
];

export const Roadmap = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary text-sm font-medium">Development Timeline</h6>
          <h2 className="text-3xl font-bold mt-2">Our Product Roadmap</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Follow our journey as we build and improve our platform. Here's what we've accomplished
            and what we're planning for the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROADMAP_ITEMS.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {item.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : item.status === "in-progress" ? (
                  <Clock className="w-5 h-5 text-blue-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-500">{item.date}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};