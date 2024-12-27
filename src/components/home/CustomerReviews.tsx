import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar } from "@/components/ui/avatar";

const REVIEWS = [
  {
    id: 1,
    name: "Mark Jevenue",
    role: "CEO of Addle",
    image: "/assets/img/t-1.png",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam esse cillum."
  },
  {
    id: 2,
    name: "Henna Bajaj",
    role: "Aqua Founder",
    image: "/assets/img/t-2.png",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua veniam esse cillum."
  },
  {
    id: 3,
    name: "John Cenna",
    role: "CEO of Plike",
    image: "/assets/img/t-3.png",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua velit esse cillum."
  },
  {
    id: 4,
    name: "Madhu Sharma",
    role: "Team Manager",
    image: "/assets/img/t-4.png",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboree voluptate velit esse cillum."
  }
];

export const CustomerReviews = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-gray-500 mb-2">Our Reviews</h6>
          <h2 className="text-3xl font-bold">
            What Our Customer <span className="text-primary">Saying</span>
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {REVIEWS.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/3">
                <div className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <img src={review.image} alt={review.name} className="rounded-full" />
                  </Avatar>
                  <div className="mb-4">
                    <h4 className="font-medium text-lg">{review.name}</h4>
                    <span className="text-primary text-sm">{review.role}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};