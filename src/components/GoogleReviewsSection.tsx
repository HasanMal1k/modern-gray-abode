
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
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    name: "Olumide Adeyemi",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=500&auto=format&fit=crop",
    rating: 5,
    comment: "Gray Listed helped me find my dream home in Ikoyi. Their team was professional and attentive throughout the entire process.",
    date: "3 months ago",
    screenshot: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Amara Okafor",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=500&auto=format&fit=crop",
    rating: 5,
    comment: "Exceptional service! The team at Gray Listed went above and beyond to ensure we found exactly what we were looking for in Lekki.",
    date: "2 months ago",
    screenshot: "https://images.unsplash.com/photo-1581488689077-ddb02c613b3c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Chinedu Eze",
    avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=500&auto=format&fit=crop",
    rating: 4,
    comment: "Very professional service. They have an excellent selection of luxury properties in Victoria Island. Highly recommend!",
    date: "1 month ago",
    screenshot: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Folake Johnson",
    avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=500&auto=format&fit=crop",
    rating: 5,
    comment: "Gray Listed made our property search stress-free. Their knowledge of the Lagos luxury market is unmatched.",
    date: "2 weeks ago",
    screenshot: "https://images.unsplash.com/photo-1610926950565-29bbd4ab29d6?q=80&w=800&auto=format&fit=crop"
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
                <div 
                  key={review.id} 
                  className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${activeIndex === index 
                    ? 'bg-gray-100 shadow-md' 
                    : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveIndex(index)}
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
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center animate-on-scroll">
          <a 
            href="https://g.page/your-business-review-link" 
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
