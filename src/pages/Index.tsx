
import { Suspense, lazy } from "react";
import { Hero } from "@/components/home/Hero";
import { OffersSection } from "@/components/home/OffersSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { Footer } from "@/components/Footer";

// Lazy load components
const CustomerReviews = lazy(() => import("@/components/home/CustomerReviews"));
const LocationSearch = lazy(() => import("@/components/home/LocationSearch"));
const RecentListings = lazy(() => import("@/components/home/RecentListings"));
const Newsletter = lazy(() => import("@/components/home/Newsletter"));

// Loading fallbacks
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]" role="status">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" aria-hidden="true" />
    <span className="sr-only">Loading...</span>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>

      <Hero />
      
      <main id="main-content" tabIndex={-1}>
        <OffersSection />
        
        <Suspense fallback={<LoadingSpinner />}>
          <RecentListings />
        </Suspense>
        
        <PopularCategories />
        
        <Suspense fallback={<LoadingSpinner />}>
          <LocationSearch />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <CustomerReviews />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Newsletter />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
