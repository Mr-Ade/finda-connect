import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const CheckInHistory = () => {
  const { data: checkins } = useQuery({
    queryKey: ['userCheckins'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session');

      const { data, error } = await supabase
        .from('checkins')
        .select(`
          *,
          businesses (
            id,
            name,
            city,
            state
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Check-ins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checkins?.map((checkin) => (
            <div key={checkin.id} className="flex items-start space-x-4">
              <div>
                <Link 
                  to={`/business/${checkin.business_id}`}
                  className="font-medium hover:underline"
                >
                  {checkin.businesses?.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {checkin.businesses?.city}, {checkin.businesses?.state}
                </p>
                <p className="text-xs text-gray-400">
                  Checked in on {new Date(checkin.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {(!checkins || checkins.length === 0) && (
            <p className="text-gray-500">No check-ins yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};