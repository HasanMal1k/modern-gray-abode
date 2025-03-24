
import { useRef, useEffect } from "react";

const PARTNERS = [
  {
    name: "Lagos Development Corporation",
    logo: "https://images.unsplash.com/photo-1560179304-6fc1d8749b23?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Nigerian Property Group",
    logo: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Lekki Gardens",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Banana Island Developers",
    logo: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Victoria Island Properties",
    logo: "https://images.unsplash.com/photo-1550565496-f945581629f5?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Ikoyi Heights",
    logo: "https://images.unsplash.com/photo-1586075253856-b2754854f02b?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Ajah Development Ltd",
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Premium Homes Nigeria",
    logo: "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?q=80&w=500&auto=format&fit=crop"
  }
];

const PartnersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    
    // Only add animation if there's content to scroll
    if (scrollWidth > clientWidth) {
      const scrollAnim = () => {
        if (!scrollContainer) return;
        
        if (scrollContainer.scrollLeft >= scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      };
      
      const interval = setInterval(scrollAnim, 20);
      return () => clearInterval(interval);
    }
  }, []);

  // We duplicate the partners array to create a seamless loop
  const allPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-16 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to collaborate with these industry-leading companies across Lagos and Nigeria
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient overlay on the left side */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          
          {/* Gradient overlay on the right side */}
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div 
            ref={scrollRef}
            className="flex items-center space-x-12 overflow-x-auto scrollbar-none py-6"
            style={{ 
              whiteSpace: 'nowrap',
              scrollBehavior: 'smooth'
            }}
          >
            {allPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-40 h-20 bg-white rounded-md shadow-sm p-3 flex items-center justify-center"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
