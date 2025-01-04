import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MainLayout } from "@/components/layouts/MainLayout";

const SavedPlaces = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Saved Places", href: "#", active: true },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-900 py-3">
          <div className="container mx-auto px-4">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Saved Places</h1>
            <p className="text-gray-600 text-center mb-8">
              View and manage your saved locations and favorites
            </p>
            {/* Add saved places grid here */}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default SavedPlaces;