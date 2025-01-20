import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { CMSPageForm } from "@/components/admin/cms/CMSPageForm";
import { CMSPageHeader } from "@/components/admin/cms/CMSPageHeader";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CMSPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPage = id === 'new';

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  const { data: page, isLoading } = useQuery({
    queryKey: ['cms-page', id],
    queryFn: async () => {
      if (isNewPage) return null;
      
      console.log('Fetching CMS page:', id);
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching CMS page:', error);
        throw error;
      }

      return data;
    },
    enabled: !isNewPage
  });

  // Check if user has permission to manage CMS
  const canManageCMS = profile?.role === 'super_admin' || profile?.role === 'admin';

  if (!canManageCMS) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <FileText className="h-16 w-16 text-gray-400" />
          <h2 className="text-2xl font-semibold">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to access the CMS.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 max-w-4xl">
        <CMSPageHeader 
          isNewPage={isNewPage} 
          onBack={() => navigate('/dashboard/admin/cms')} 
        />
        
        <CMSPageForm 
          id={id} 
          initialData={page}
          onSuccess={() => {
            if (isNewPage) {
              navigate('/dashboard/admin/cms');
            }
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <AdminRoute>
    <CMSPage />
  </AdminRoute>
);