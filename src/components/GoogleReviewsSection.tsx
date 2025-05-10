import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

interface GoogleReview {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  screenshot: string;
  reviewUrl: string;
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    name: "Charity Ejiro",
    avatar: "/images/Eijro.png",
    rating: 5,
    comment: "I had a fantastic experience staying at this Airbnb. The host was incredibly welcoming and accommodating, making sure every detail was taken care of. The location was perfect, close to amenities and easy to navigate around. The cleanliness of the place was impeccable I highly recommend this Apartment to anyone looking for a cozy and convenient place to stay",
    date: "2 months ago",
    screenshot: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop",
    reviewUrl: "https://g.co/kgs/KF3LKTu",
  },
  {
    id: 2,
    name: "Oneme Metitiri",
    avatar: "/images/onome.png",
    rating: 5,
    comment: "Gray Scale Realtors are truly changing the property experience for a lot people with property requirements in Nigeria. My clients were opportune to get an office space lease in the Lekki area through them and the level of professionalism coupled with feedback and followup mechanism they brought to the table was unlike what I had experienced hitherto in the Nigerian property market. Very commendable. We were all very impressed.",
    date: "3  months ago",
    screenshot: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=800&auto=format&fit=crop",
    reviewUrl: "https://www.google.com/maps/contrib/106166884173393239904/reviews/@6.4333439,3.5413695,17z/data=!3m1!4b1!4m3!8m2!3m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDUwNi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
  },
  {
    id: 3,
    name: "Andrea ajogan",
    avatar: "/images/andrea.png",
    rating: 5,
    comment: "I bought an off plan unit in Lekki through Gray Scale its been 5 years, the units interior was finished and it was rented out by G.S.R.. Year in year out, rent comes like clock work all maintenance are done by them too. The trip is I have never physically seen this house.I would recommend GSR to all who wants a trustworthy business to take care of your house, which you know is hard to find.",
    date: "1 month ago",
    screenshot: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=800&auto=format&fit=crop",
    reviewUrl: "https://g.co/kgs/DSeU9pD"
  },
  {
    id: 4,
    name: "Daddy Oliseh",
    avatar: "/images/daddy.png",
    rating: 5,
    comment: "If competency was another word I will call it grayscale realtors . Their level of relationship and delivery is top notch and I recommend anyone willing to Acquire a property to deal with this company without fear as your satisfaction is surely guaranteed. I am glad I did",
    date: "2 weeks ago",
    screenshot: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop",
    reviewUrl: "https://g.co/kgs/VXoD4kk"
  }
];

const GoogleReviewsSection = () => {
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (section) {
        const elements = section.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-white text-gray-900">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-16 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-gray-500 mb-4 py-1 px-3 border border-gray-300 rounded-full">
            Google Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What Our Clients Say on Google</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear directly from our satisfied clients about their experience with Gray Listed
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-on-scroll">
          {/* Review Screenshot Showcase */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={GOOGLE_REVIEWS[activeIndex].screenshot} 
                alt="Google Review Screenshot" 
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(GOOGLE_REVIEWS[activeIndex].rating)}
                </div>
                <p className="text-white font-medium text-sm">
                  Posted on Google by {GOOGLE_REVIEWS[activeIndex].name}
                </p>
              </div>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="order-1 md:order-2">
            <div className="space-y-6">
              {GOOGLE_REVIEWS.map((review, index) => (
                <a
                  key={review.id}
                  href={review.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 rounded-xl transition-all duration-300 ${activeIndex === index 
                    ? 'bg-gray-100 shadow-md' 
                    : 'hover:bg-gray-50'}`}
                  onClick={(e) => {
                    // Prevent default to allow clicking to change the active index
                    e.preventDefault();
                    setActiveIndex(index);
                    // Optional: Open the review URL in a new tab after a slight delay
                    setTimeout(() => {
                      window.open(review.reviewUrl, '_blank');
                    }, 300);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{review.name}</h4>
                      <div className="flex items-center space-x-1 my-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-gray-500 text-xs">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center animate-on-scroll">
          <a 
            href="https://www.google.com/search?sca_esv=152f6ce784128add&biw=1920&bih=945&sxsrf=AHTn8zqJIILMMF99Z5uRNN-BfxeCHYparg:1745476905803&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzQ1yJ2ei1UYw1OzU3HvqKBWzy7dQvGxkaIT7vYI4azcM0YW6V6tv_ffGrONtQLEhrtMHMh1zbLkZVM5CFtiC5wExHq63IqRcHCRldXxOz-sBuPwSYQ%3D%3D&q=Gray+Scale+Realtors+Reviews&sa=X&ved=2ahUKEwjYoLyXiPCMAxWzfKQEHbK9E4MQ0bkNegQIIhAE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 text-sm"
          >
            View All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;