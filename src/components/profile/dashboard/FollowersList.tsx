import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const FollowersList = () => {
  const followers = [
    {
      name: "Maryam Amiri",
      location: "New York, USA",
      avatar: "/avatars/01.jpg",
      status: "online"
    },
    {
      name: "Sarah Johnson",
      location: "London, UK", 
      avatar: "/avatars/02.jpg",
      status: "offline"
    },
    {
      name: "David Chen",
      location: "Toronto, CA",
      avatar: "/avatars/03.jpg",
      status: "online"
    },
    {
      name: "Emma Wilson",
      location: "Sydney, AU",
      avatar: "/avatars/04.jpg",
      status: "offline"
    },
  ];

  return (
    <div className="space-y-4">
      {followers.map((follower, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="relative">
            <Avatar>
              <AvatarImage src={follower.avatar} />
              <AvatarFallback>{follower.name[0]}</AvatarFallback>
            </Avatar>
            <span 
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                follower.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
              }`} 
            />
          </div>
          <div>
            <h6 className="font-medium">{follower.name}</h6>
            <p className="text-sm text-gray-500">{follower.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};