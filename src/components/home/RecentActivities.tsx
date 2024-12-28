import { Card } from "@/components/ui/card";
import { Activity, Award, Bell, Calendar, MessageSquare, Star, ThumbsUp, Heart } from "lucide-react";

const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "review",
    user: "Sarah M.",
    action: "left a review",
    business: "The Gold Hotel Lalit",
    time: "2 hours ago",
    icon: MessageSquare,
    color: "text-blue-500"
  },
  {
    id: 2,
    type: "rating",
    user: "John D.",
    action: "rated 5 stars",
    business: "Rajwara Marriage Home",
    time: "3 hours ago",
    icon: Star,
    color: "text-yellow-500"
  },
  {
    id: 3,
    type: "achievement",
    user: "Pizza Delight",
    action: "received an award",
    business: "Best Local Restaurant 2024",
    time: "5 hours ago",
    icon: Award,
    color: "text-purple-500"
  },
  {
    id: 4,
    type: "like",
    user: "Mike R.",
    action: "liked",
    business: "Fitness Revolution Gym",
    time: "6 hours ago",
    icon: ThumbsUp,
    color: "text-green-500"
  },
  {
    id: 5,
    type: "booking",
    user: "Emma S.",
    action: "booked an appointment at",
    business: "Pretty Woman Smart Batra",
    time: "8 hours ago",
    icon: Calendar,
    color: "text-red-500"
  },
  {
    id: 6,
    type: "notification",
    user: "The Sartaj Blue Night",
    action: "announced a special event",
    business: "Weekend Jazz Night",
    time: "10 hours ago",
    icon: Bell,
    color: "text-orange-500"
  },
  {
    id: 7,
    type: "activity",
    user: "David L.",
    action: "checked in at",
    business: "Decathlon Sport House",
    time: "12 hours ago",
    icon: Activity,
    color: "text-indigo-500"
  },
  {
    id: 8,
    type: "favorite",
    user: "Lisa K.",
    action: "bookmarked",
    business: "The Decore Allante Shop",
    time: "14 hours ago",
    icon: Heart,
    color: "text-pink-500"
  }
];

export const RecentActivities = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary text-sm font-medium">Latest Updates</h6>
          <h2 className="text-3xl font-bold mt-2">Recent Activities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECENT_ACTIVITIES.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gray-50 ${activity.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.action} {activity.business}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
};