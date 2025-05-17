import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import MouseFollower from "@/components/MouseFollower";


import { 
  Building, Shield, Users, FileText, Home, CreditCard, Wrench, BadgePercent, Search, Clock, MapPin
} from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  items?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, image, items }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="glass-morphism rounded-xl overflow-hidden group transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
        />
        <div className="image-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex items-center mb-2">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg mr-3">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {items && items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        )}
        
        <a 
          href="https://wa.me/2348066429700" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-accent hover:text-accent/80 text-sm font-medium"
        >
          Learn More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quickInfoRef = useRef<HTMLDivElement>(null);
  const servicesIntroRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const services: ServiceCardProps[] = [
    {
      title: "Comprehensive Property Management",
      description: "Complete property management solutions tailored to meet the unique needs of property owners and investors.",
      icon: <Building className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1974&auto=format&fit=crop",
      items: [
        "Day-to-day operations management",
        "Tenant relationship management",
        "Property value maximization",
        "Regular property inspections"
      ]
    },
    {
      title: "Tenant Screening",
      description: "Thorough evaluation of potential tenants to ensure reliability, trustworthiness, and financial stability.",
      icon: <Users className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      items: [
        "Application review and verification",
        "Credit and background checks",
        "Employment and income verification",
        "Rental history assessment",
        "Co-signer evaluation (if applicable)"
      ]
    },
    {
      title: "Rent Collection",
      description: "Streamlined rent collection process ensuring timely and hassle-free payments from tenants.",
      icon: <CreditCard className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
      items: [
        "Clear and concise rent invoices sent to tenants",
        "Automated payment processing for ease and convenience",
        "Prompt payment confirmation and receipts",
        "Late fee application and account reconciliation"
      ]
    },
    {
      title: "Financial Management",
      description: "Expert financial services designed to maximize returns and minimize risks for property owners.",
      icon: <BadgePercent className="w-5 h-5 text-white" />,
      image: "/images/finance.jpg",
      items: [
        "Detailed income statements",
        "Balance sheets",
        "Cash flow statements",
        "Budget planning and execution"
      ]
    },
    {
      title: "Property Maintenance & Repairs",
      description: "Comprehensive maintenance services to preserve your property's value and ensure tenant satisfaction.",
      icon: <Wrench className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Maintenance: Inspections, landscaping, roof gutter cleaning, power washing",
        "Repairs: Plumbing, electrical, carpentry, appliance repairs, patchwork painting",
        "24/7 Emergency maintenance",
        "Preventative programs, energy upgrades, renovations"
      ]
    },
    {
      title: "Legal Compliance & Risk Management",
      description: "Ensuring your property management activities remain compliant with all relevant laws and regulations.",
      icon: <Shield className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Lease agreement reviews and preparation",
        "Contract management",
        "Regulatory compliance (Fair housing advocates, Lasrera compliant)",
        "Litigation support",
        "Liability protection and property damage prevention"
      ]
    },
    {
      title: "Sales & Acquisitions",
      description: "Expert property sales and acquisition services backed by over 200 successful home sales and placements.",
      icon: <Home className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1974&auto=format&fit=crop",
      items: [
        "Property valuation and market analysis",
        "Marketing and property showcase",
        "Negotiation and transaction management",
        "Strong relationships with trustworthy builders and real estate investors"
      ]
    },
    {
      title: "Property Marketing & Promotion",
      description: "Strategic marketing services to attract quality tenants and maximize rental income for property owners.",
      icon: <Search className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      items: [
        "Property Advertising (online, print, social media)",
        "Property Listing (online platforms)",
        "Property Showcasing (virtual tours, photos, videos)",
        "Market Research and Analysis",
        "Tenant Referral Programs and Property Events"
      ]
    },
    {
      title: "360 Live Inspection Service",
      description: "Experience real-time, immersive property inspections from the comfort of your home or office.",
      icon: <Clock className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Real-time virtual property tours",
        "Interactive live communication during inspections",
        "High-definition 360° video walkthroughs",
        "Instant feedback and Q&A with property agents",
        "Accessible from mobile and desktop devices"
      ]
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(".hero-label", 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out" 
        }
      );

      gsap.fromTo(".hero-title", 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.2, 
          ease: "power3.out" 
        }
      );

      gsap.fromTo([".hero-description", ".hero-cta"], 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.2, 
          ease: "power3.out" 
        }
      );

      // Quick Info Section
      if (quickInfoRef.current) {
        gsap.fromTo(quickInfoRef.current.children, 
          { opacity: 0, y: 50 }, 
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: quickInfoRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Services Introduction
      if (servicesIntroRef.current) {
        gsap.fromTo(servicesIntroRef.current.children, 
          { opacity: 0, y: 50 }, 
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: servicesIntroRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Services Grid
      if (servicesGridRef.current) {
        gsap.fromTo(servicesGridRef.current.querySelectorAll('.service-card'), 
          { opacity: 0, y: 50 }, 
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: servicesGridRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // CTA Section
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.children, 
          { opacity: 0, y: 50 }, 
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert(); // cleanup on component unmount
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" ref={sectionRef}>
      <MouseFollower />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-28">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Property" 
              className="w-full h-full object-cover filter brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
            <div className="max-w-3xl">
              <span className="hero-label inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                Comprehensive Property Management Services
              </span>
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                GrayScale Realtors<br />Property Management
              </h1>
              <p className="hero-description text-lg text-white/80 mb-8 max-w-2xl">
              At GrayScale Realtors, we deliver end-to-end property solutions—designed for buyers, owners, and investors who demand excellence. We handle every detail from tenant screening and rent collection to maintenance, legal compliance, and financial reporting. In addition, experience cutting-edge LIVE 360° Remote Home Inspections from anywhere you are in the world and hassle-free Facility Management services—all tailored to protect and grow your investments.
              </p>
              <Link 
                to="/contact" 
                onClick={() => {
                  sessionStorage.setItem('scrollToContactForm', 'true');
                }}
                className="hero-cta px-8 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-all duration-300 text-sm orange-glow"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
          
          {/* Decorative Element */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Quick Contact Info Section */}
        <section className="py-16 bg-[#151515]" ref={quickInfoRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="glass-morphism text-center p-6">
                <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Property Management</h3>
                <p className="text-white/70">200+ properties managed</p>
              </div>
              
              <div className="glass-morphism text-center p-6">
                <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Tenant Management</h3>
                <p className="text-white/70">Reliable tenant placements</p>
              </div>
              
              <div className="glass-morphism text-center p-6">
                <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">24/7 Service</h3>
                <p className="text-white/70">Always available support</p>
              </div>
              
              <div className="glass-morphism text-center p-6">
                <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Lagos Experts</h3>
                <p className="text-white/70">Local market knowledge</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Introduction */}
        <section className="py-16 px-6" ref={servicesIntroRef}>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Range of Services</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              From tenant screening and rent collection to financial management and property maintenance, legal compliance and financial account management - we cover all aspects of property management to ensure your investment thrives.
            </p>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-10 px-6" ref={servicesGridRef}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="service-card"
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-24 px-6 relative" ref={ctaRef}>
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1974&auto=format&fit=crop" 
              alt="Luxury Property" 
              className="w-full h-full object-cover filter brightness-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-black/70 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Premium Property Management?</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Our team of experts is ready to help you maximize your property's potential. Contact us today to schedule a consultation.
            </p>
            <Link 
              to="/contact"
              onClick={() => {
                sessionStorage.setItem('scrollToContactForm', 'true');
              }}
              className="px-8 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-all duration-300 text-sm orange-glow"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;