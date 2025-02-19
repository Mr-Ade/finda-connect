import { Business } from "@/types/business";
import { AboutSection } from "./AboutSection";
import { MenuItems } from "./MenuItems";
import { PhotoGallery } from "./PhotoGallery";
import { Amenities } from "./Amenities";
import { FAQ } from "./FAQ";
import { ReviewSection } from "./ReviewSection";
import { BusinessHours } from "./BusinessHours";

interface MainContentProps {
  business: Business;
  isOwner: boolean;
}

export const MainContent = ({ business, isOwner }: MainContentProps) => {
  // Transform amenities from JSON to array format
  const amenitiesList = business.amenities ? 
    (typeof business.amenities === 'string' ? 
      JSON.parse(business.amenities) : 
      Object.entries(business.amenities || {}).map(([name, available]) => ({
        name,
        available: !!available
      }))
    ) : [];

  // Transform FAQs from JSON to array format with proper typing
  const questionsList = business.faqs ? 
    (typeof business.faqs === 'string' ? 
      JSON.parse(business.faqs) : 
      business.faqs
    ) : [];

  // Transform reviews to match expected format
  const transformedReviews = business.reviews?.map(review => ({
    id: review.id,
    rating: review.rating,
    comment: review.review_text, // Map review_text to comment
    created_at: review.created_at,
    helpful_count: review.helpful_votes,
    reply_count: review.reply_count,
    user_id: review.user_id,
    profiles: review.profiles,
    review_responses: review.review_responses,
    review_photos: review.review_photos
  })) || [];

  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <AboutSection name={business.name} description={business.description || ''} />
      </div>
      {business.menu_items && business.menu_items.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <MenuItems businessId={business.id} menuItems={business.menu_items} />
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <PhotoGallery 
          businessId={business.id} 
          isOwner={isOwner} 
        />
      </div>
      {amenitiesList.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Amenities amenities={amenitiesList} />
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <BusinessHours businessId={business.id} business={business} />
      </div>
      {questionsList.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <FAQ businessId={business.id} questions={questionsList} />
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ReviewSection 
          businessId={business.id} 
          reviews={transformedReviews}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
};