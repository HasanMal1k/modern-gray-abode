import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Building, Shield, Users, Video, Wrench, 
  Search, Home, Settings, Map 
} from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  link 
}: ServiceProps) => {
  return (
    <div className="group glass-morphism p-8 rounded-xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Link to={link} className="inline-flex items-center text-sm text-white group-hover:text-accent transition-colors">
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
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
      icon: <Video className="w-6 h-6 text-accent" />,
      title: "360 Live Inspection Service",
      description: "Experience real-time, guided 360° property inspections from the comfort of your home.",
      link: "/services/360-live-inspection"
    },
    {
      icon: <Video className="w-6 h-6 text-accent" />,
      title: "LIVE 360° Property Inspections",
      description: "Immersive virtual tours with live agents, measurement tools, and detailed property analysis.",
      link: "/services/360-inspections"
    },
    {
      icon: <Building className="w-6 h-6 text-accent" />,
      title: "Property Management",
      description: "End-to-end management including maintenance, tenant relations, and financial reporting.",
      link: "/services/property-management"
    },
    {
      icon: <Wrench className="w-6 h-6 text-accent" />,
      title: "Facility Management",
      description: "Complete operational management for residential and commercial properties.",
      link: "/services/facility-management"
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Legal & Compliance",
      description: "Full legal support for contracts, purchases, and regulatory requirements.",
      link: "/services/legal-compliance"
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: "Tenant Screening",
      description: "Comprehensive background checks and financial vetting for tenants.",
      link: "/services/tenant-screening"
    },
    {
      icon: <Search className="w-6 h-6 text-accent" />,
      title: "Personalized Home Search",
      description: "AI-powered property matching based on your specific criteria.",
      link: "/services/home-search"
    },
    {
      icon: <Home className="w-6 h-6 text-accent" />,
      title: "Property Valuation",
      description: "Expert valuation services to help you understand the true worth of your property.",
      link: "/services/property-valuation"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Real Estate Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            GrayScale Realtors offers premium services covering every aspect of property ownership and investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`animate-on-scroll ${visibleElements.has(document.querySelectorAll('.animate-on-scroll')[index + 1]) ? 'visible' : ''}`} style={{ transitionDelay: `${200 * index}ms` }}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link to="/services" className="px-8 py-3 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-white text-sm">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
