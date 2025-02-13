
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ConversationList } from "@/components/messages/ConversationList";
import { MessageThread } from "@/components/messages/MessageThread";
import { useSearchParams } from "react-router-dom";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState<string>(
    searchParams.get("userId") || ""
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="md:col-span-3">
            <Card className="grid md:grid-cols-3 divide-x">
              <div className="md:col-span-1 border-r">
                <ConversationList
                  selectedUserId={selectedUserId}
                  onSelectConversation={setSelectedUserId}
                />
              </div>
              <div className="md:col-span-2">
                <MessageThread userId={selectedUserId} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
