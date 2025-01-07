import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { supabase } from "@/integrations/supabase/client";

const AuditLogs = () => {
  // Fetch audit logs
  const { data: auditLogs } = useQuery({
    queryKey: ['admin-audit-logs'],
    queryFn: async () => {
      console.log('Fetching audit logs...');
      const { data, error } = await supabase
        .from('admin_audit_logs')
        .select(`
          *,
          admin:profiles!admin_audit_logs_admin_id_fkey(
            full_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching audit logs:', error);
        throw error;
      }

      return data || [];
    }
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLogs?.map((log) => (
                <div 
                  key={log.id} 
                  className="p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {log.admin?.full_name || 'Unknown Admin'} - {log.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {log.entity_type} {log.entity_id}
                      </p>
                      {log.changes && (
                        <pre className="mt-2 p-2 bg-muted rounded text-sm overflow-x-auto">
                          {JSON.stringify(log.changes, null, 2)}
                        </pre>
                      )}
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </time>
                  </div>
                </div>
              ))}

              {(!auditLogs || auditLogs.length === 0) && (
                <p className="text-center text-muted-foreground py-4">
                  No audit logs found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <AuditLogs />
  </AdminRoute>
);