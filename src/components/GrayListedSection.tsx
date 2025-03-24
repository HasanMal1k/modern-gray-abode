
import { useState, useEffect, useRef } from "react";
import { Home, Building, Map, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PropertyCategoryCard = ({ 
  icon: Icon, 
  title, 
  count, 
  link 
}: { 
  icon: React.ElementType; 
  title: string; 
  count: number; 
  link: string;
}) => {
  return (
    <Card className="group overflow-hidden bg-white text-black border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <CardHeader className="bg-accent/10 p-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
          <Icon className="w-8 h-8 text-accent" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-3xl font-bold text-gray-800">{count}+</p>
        <p className="text-gray-600 mt-1">Available Listings</p>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 border-t border-gray-100">
        <Link 
          to={link} 
          className="inline-flex items-center text-sm text-gray-700 hover:text-accent transition-colors"
        >
          View Listings
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

const GrayListedSection = () => {
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

  const categories = [
    {
      icon: Home,
      title: "Homes for Sale",
      count: 125,
      link: "/listings/homes"
    },
    {
      icon: Building,
      title: "Off Plan Deals",
      count: 58,
      link: "/listings/off-plan"
    },
    {
      icon: Map,
      title: "Land Sales/Joint Ventures",
      count: 42,
      link: "/listings/land"
    },
    {
      icon: Key,
      title: "Rentals",
      count: 94,
      link: "/listings/rentals"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white" id="gray-listed">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-gray-600 mb-4 py-1 px-3 border border-gray-300 rounded-full">
            Property Listings
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Gray Listed</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            Explore our exclusive property listings across Lagos and find your perfect investment opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className={`animate-on-scroll ${visibleElements.has(document.querySelectorAll('.animate-on-scroll')[index + 1]) ? 'visible' : ''}`} style={{ transitionDelay: `${200 * index}ms` }}>
              <PropertyCategoryCard 
                icon={category.icon} 
                title={category.title} 
                count={category.count} 
                link={category.link} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrayListedSection;
