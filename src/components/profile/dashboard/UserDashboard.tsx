import { ActivityOverview } from "./ActivityOverview";
import { RecentReviews } from "./RecentReviews";
import { BookmarkedBusinesses } from "./BookmarkedBusinesses";
import { CheckInHistory } from "./CheckInHistory";

export const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <ActivityOverview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentReviews />
        <BookmarkedBusinesses />
      </div>
      <CheckInHistory />
    </div>
  );
};