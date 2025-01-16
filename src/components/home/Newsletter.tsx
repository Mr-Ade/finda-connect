import { NewsletterForm } from "./newsletter/NewsletterForm";
import { SubscriptionStatus } from "./newsletter/SubscriptionStatus";

export const Newsletter = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <SubscriptionStatus 
            title="Subscribe to Our Newsletter"
            description="Stay updated with the latest listings and business opportunities"
          />
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};