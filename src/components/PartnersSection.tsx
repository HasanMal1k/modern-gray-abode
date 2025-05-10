import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  {
    name: "Dune Atlantis",
    logo: "/images/partner1.jpg"
  },
  {
    name: "Amacuff Limited",
    logo: "/images/partner2.jpg"
  },
  {
    name: "Laogs State Real Estate",
    logo: "/images/partner3.jpg"
  },
  {
    name: "Sound Core",
    logo: "/images/partner4.jpg"
  },
  {
    name: "Jedmoon",
    logo: "/images/partner5.jpg"
  },
  {
    name: "Neat",
    logo: "/images/partner6.jpg"
  },
  
 
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
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to collaborate with these industry-leading companies across Lagos and Nigeria
          </p>
        </div>
        
        <div className="relative" ref={containerRef}>
          {/* Gradient overlay on the left side */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          
          {/* Gradient overlay on the right side */}
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          
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