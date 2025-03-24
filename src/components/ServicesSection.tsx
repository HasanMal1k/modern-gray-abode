
import { useState, useEffect, useRef } from "react";
import { Building, Home, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  link: string;
}) => {
  return (
    <div className="group glass-morphism p-8 rounded-xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <Link to={link} className="inline-flex items-center text-sm text-white group-hover:text-accent transition-colors">
        Learn More
        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

const ServicesSection = () => {
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

  const services = [
    {
      icon: Building,
      title: "Property Management",
      description: "Comprehensive property management services to maximize your investment returns and maintain property value.",
      link: "/services/property-management"
    },
    {
      icon: ArrowRight,
      title: "Sales & Acquisition",
      description: "Expert guidance through the buying and selling process, ensuring optimal outcomes for all parties involved.",
      link: "/services/sales-acquisition"
    },
    {
      icon: Home,
      title: "Shortlets & Short Stay Apartments",
      description: "Luxurious short-term accommodation options perfect for business trips, holidays, or temporary relocations.",
      link: "/services/shortlets"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Real Estate Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            We offer a wide range of professional services tailored to meet all your real estate needs in Lagos and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`animate-on-scroll ${visibleElements.has(document.querySelectorAll('.animate-on-scroll')[index + 1]) ? 'visible' : ''}`} style={{ transitionDelay: `${200 * index}ms` }}>
              <ServiceCard 
                icon={service.icon} 
                title={service.title} 
                description={service.description} 
                link={service.link} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
