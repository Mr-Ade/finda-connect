import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};