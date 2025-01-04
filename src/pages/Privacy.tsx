import { MainLayout } from "@/components/layouts/MainLayout";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const Privacy = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "#" },
    { label: "Privacy", href: "/privacy", active: true },
  ];

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8">Privacy & Policy</h2>
            
            <div className="space-y-6 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique 
                sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum 
                facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil 
                impedit quo minus id quod maxime placeat facere possimus.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                dicta sunt explicabo.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h3>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem 
                ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Data Security</h3>
              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
                vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto 
                odio dignissimos ducimus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Privacy;