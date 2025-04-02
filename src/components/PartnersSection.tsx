import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set up GSAP animation
    const setupAnimation = () => {
      if (!scrollerRef.current || !containerRef.current) return;
        
        // Clone the scroller content to create infinite effect
        const scrollerContent = scrollerRef.current;
        const scrollWidth = scrollerContent.offsetWidth;
        
        // Create animation timeline
        let scrollTween = gsap.to(scrollerContent, {
          x: `-=${scrollWidth}`,
          ease: "none",
          duration: 100, // Adjust this value to control speed (higher = slower)
          repeat: -1, // Infinite repeat
          paused: false,
        });
        
        // Pause animation on hover
        containerRef.current.addEventListener('mouseenter', () => {
          scrollTween.pause();
        });
        
        // Resume animation on mouse leave
        containerRef.current.addEventListener('mouseleave', () => {
          scrollTween.play();
        });
        
        // Cleanup on component unmount
        return () => {
          scrollTween.kill();
        };
    };
    
    setupAnimation();
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
        
        <div className="relative" ref={containerRef}>
          {/* Gradient overlay on the left side */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          
          {/* Gradient overlay on the right side */}
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* Outer container with hidden overflow */}
          <div className="overflow-hidden">
            {/* Inner container for GSAP animation */}
            <div 
              ref={scrollerRef}
              className="flex items-center py-6"
              style={{ width: "fit-content" }}
            >
              {allPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-40 h-20 flex items-center justify-center mx-8"
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
      </div>
    </section>
  );
};

export default PartnersSection;