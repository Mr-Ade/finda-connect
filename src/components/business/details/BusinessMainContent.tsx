import { BusinessInfo } from "@/components/business/BusinessInfo";
import { MenuItems } from "@/components/business/MenuItems";
import { Amenities } from "@/components/business/Amenities";
import { FAQ } from "@/components/business/FAQ";
import { BusinessGallery } from "@/components/business/BusinessGallery";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import type { Business } from "@/types/business";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

interface BusinessMainContentProps {
  business: Business;
}

export const BusinessMainContent = ({ business }: BusinessMainContentProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Gallery Section */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
        <BusinessGallery photos={business.business_photos || []} />
        <div className="absolute bottom-4 right-4">
          <Button variant="secondary">See 20+ Photos</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">About the Business</h2>
            <p className="text-gray-600">{business.description}</p>
          </section>

          {/* Menu Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Business Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {business.menu_items?.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-primary font-semibold mt-2">${item.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Amenities Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Amenities and More</h2>
            <Amenities amenities={[
              { name: "Health Score 8.7/10", available: true },
              { name: "Offers Delivery", available: true },
              { name: "Reservations", available: true },
              { name: "Staff wears masks", available: true },
              { name: "Vegetarian Options", available: true },
              { name: "Accepts Credit Cards", available: true },
              { name: "Offers Catering", available: true },
              { name: "Good for Kids", available: true },
              { name: "Private Lot Parking", available: true },
              { name: "Beer & Wine", available: true },
              { name: "Free WiFi", available: true },
              { name: "Brunch, Lunch, Dinner", available: true },
            ]} />
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <FAQ faqs={[
              {
                question: "What are your hours?",
                answer: "We are open Monday through Sunday from 11:00 AM to 10:00 PM"
              },
              {
                question: "Do you offer delivery?",
                answer: "Yes, we offer delivery through our partners and our own delivery service"
              },
              {
                question: "Is there parking available?",
                answer: "Yes, we have a private parking lot for our customers"
              }
            ]} />
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Order Food</h3>
            <div className="flex justify-between text-sm mb-4">
              <span>$0-$9+ delivery fee</span>
              <span>25-35 mins</span>
            </div>
            <Input 
              placeholder="Enter delivery address"
              className="mb-4"
            />
            <Button className="w-full">Start Your Order</Button>
          </Card>

          {/* Business Info Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={business.owner?.avatar_url || "/placeholder.svg"}
                alt={business.owner?.username || "Owner"}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{business.owner?.full_name || business.owner?.username}</h3>
                <p className="text-sm text-gray-500">Business Owner</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <a href={business.website} className="text-primary hover:underline">{business.website}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <a href={`mailto:${business.email}`} className="text-primary hover:underline">{business.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <a href={`tel:${business.phone}`} className="text-primary hover:underline">{business.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <address className="text-gray-600 not-italic">
                  {business.address}, {business.city}, {business.state} {business.zip_code}
                </address>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1">Message</Button>
              <Button variant="outline" className="flex-1">Follow</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};