import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface CMSPageHeaderProps {
  isNewPage: boolean;
  onBack: () => void;
}

export const CMSPageHeader = ({ isNewPage, onBack }: CMSPageHeaderProps) => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admin", href: "/dashboard/admin" },
    { label: "Content Management", href: "/dashboard/admin/cms" },
    { label: isNewPage ? "New Page" : "Edit Page", href: "#", active: true }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">
            {isNewPage ? 'Create New Page' : 'Edit Page'}
          </h1>
        </div>
      </div>
    </>
  );
};