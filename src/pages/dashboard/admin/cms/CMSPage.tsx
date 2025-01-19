import { AdminRoute } from "@/components/auth/AdminRoute";
import { CMSPageForm } from "@/components/admin/cms/CMSPageForm";
import { CMSPageList } from "@/components/admin/cms/CMSPageList";
import { useParams } from "react-router-dom";

const CMSPage = () => {
  const { id } = useParams();

  return (
    <AdminRoute requireSuperAdmin>
      {id ? (
        <CMSPageForm id={id} />
      ) : (
        <CMSPageList />
      )}
    </AdminRoute>
  );
};

export default CMSPage;