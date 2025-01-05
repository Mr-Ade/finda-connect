import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const followers = [
  {
    name: "Maryam Amiri",
    location: "New York, USA",
    avatar: "/assets/img/t-1.png",
    status: "online"
  },
  {
    name: "Sarah Johnson",
    location: "Canada, USA",
    avatar: "/assets/img/t-2.png",
    status: "offline"
  },
  {
    name: "David Wilson",
    location: "Denver, USA",
    avatar: "/assets/img/t-3.png",
    status: "busy"
  },
  {
    name: "Emma Brown",
    location: "Liverpool, UK",
    avatar: "/assets/img/t-4.png",
    status: "away"
  },
  {
    name: "Michael Clark",
    location: "California",
    avatar: "/assets/img/t-5.png",
    status: "online"
  }
];

export const FollowersList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Followers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {followers.map((follower, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={follower.avatar} alt={follower.name} />
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                  ${follower.status === 'online' ? 'bg-green-500' :
                    follower.status === 'busy' ? 'bg-red-500' :
                    follower.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
              </div>
              <div>
                <h6 className="font-medium">{follower.name}</h6>
                <small className="text-gray-500">
                  <i className="mr-1">📍</i>{follower.location}
                </small>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};