import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { CMSPageForm } from "@/components/admin/cms/CMSPageForm";
import { CMSPageHeader } from "@/components/admin/cms/CMSPageHeader";

const CMSPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPage = id === 'new';

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
  <AdminRoute requireSuperAdmin>
    <CMSPage />
  </AdminRoute>
);