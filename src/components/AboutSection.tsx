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
    "Property Management",
    "Facility Management ",
    "LIVE 360 Remote Presence Home Inspections for Diaspora buyers",
    "Personalized House Hunting Services",
    "Real Estate Investment Advisory Services",
    "Legal & Compliance "
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-white text-gray-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-gray-100 blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-gray-100 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="animate-on-scroll order-2 lg:order-1 max-w-md mx-auto lg:mx-0 w-full">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-xl glass-morphism">
                <img 
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop" 
                  alt="Luxury Real Estate Team" 
                  className="w-full h-full object-cover"
                />
                <div className="image-shimmer"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 bg-white shadow-lg rounded-xl w-64">
                <p className="text-sm text-gray-700">
                  "Their attention to detail and understanding of our needs made finding our dream home an exceptional experience."
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  — Adebayo & Folake Johnson
                </p>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="space-y-8 animate-on-scroll order-1 lg:order-2">
            <div>
              <span className="inline-block text-sm tracking-wider uppercase text-gray-500 mb-4 py-1 px-3 border border-gray-300 rounded-full">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Luxury Real Estate, Lagos – A Michelin-Star Experience</h2>
              <p className="text-gray-600 text-balance">
              Indulge in an expertly crafted blend of bespoke services—seamless ownership, effortless management, and a refined nightcap of unrivalled peace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-accent/10 rounded-full p-1 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="https://api.whatsapp.com/send/?phone=+2348066429700"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-all duration-300 text-sm orange-glow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Free Consultation
              </a>
              
              <Link
                to="/about"
                className="inline-flex items-center text-gray-700 font-medium text-sm group"
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