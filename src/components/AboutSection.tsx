
import { useState, useEffect, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const features = [
    "Exclusive Property Portfolio",
    "Personalized Concierge Service",
    "Private Viewings & Consultations",
    "Global Network of Luxury Properties",
    "Investment Advisory Services",
    "Custom Home Design Solutions"
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="animate-on-scroll order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-xl glass-morphism">
                <img 
                  src="https://images.unsplash.com/photo-1542893868-4442ce2d3936?q=80&w=1974&auto=format&fit=crop" 
                  alt="Luxury Real Estate Team" 
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="image-shimmer"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 neo-blur rounded-xl w-64">
                <p className="text-sm text-white/80">
                  "Their attention to detail and understanding of our needs made finding our dream home an exceptional experience."
                </p>
                <p className="mt-4 text-xs text-white/60">
                  — Emily & David Richards
                </p>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="space-y-8 animate-on-scroll order-1 lg:order-2">
            <div>
              <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Redefining Luxury Real Estate Since 2005</h2>
              <p className="text-muted-foreground text-balance">
                EstateNoir is more than a real estate agency—we're curators of exceptional living experiences. Our approach combines deep market insight with a profound understanding of architectural excellence to connect discerning individuals with properties that transcend the ordinary.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-white/10 rounded-full p-1 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center text-white font-medium text-sm group"
              >
                Learn More About Our Approach
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
