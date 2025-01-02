import React from "react";
import { Card } from "@/components/ui/card";
import { Star, Heart, Layers } from "lucide-react";

export const RecentActivities = () => {
  const activities = [
    {
      icon: <Layers className="text-purple-500" />,
      message: <>Your listing <strong>Hotel The Lalit</strong> has been approved!</>,
      bgColor: "bg-purple-100"
    },
    {
      icon: <Star className="text-green-500" />,
      message: <>Christopher K. Allen left a review on <strong>Bluchee Burger</strong></>,
      bgColor: "bg-green-100"
    },
    {
      icon: <Heart className="text-yellow-500" />,
      message: <>Someone bookmarked your <strong>Snow Valley House</strong> listing!</>,
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${activity.bgColor}`}>
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-gray-600">{activity.message}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">×</button>
          </div>
        ))}
      </div>
    </Card>
  );
};