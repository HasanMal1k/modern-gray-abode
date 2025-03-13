
import { useState, useEffect, useRef } from "react";
import { ArrowRight, BedDouble, Bath, Square, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
  type: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Elegant Penthouse Suite",
    location: "Downtown Metropolitan",
    price: "$4,500,000",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3200,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
    featured: true,
    type: "Penthouse",
  },
  {
    id: 2,
    title: "Modern Waterfront Villa",
    location: "Coastal Heights",
    price: "$6,750,000",
    bedrooms: 5,
    bathrooms: 4.5,
    area: 5800,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    featured: true,
    type: "Villa",
  },
  {
    id: 3,
    title: "Contemporary Loft Apartment",
    location: "Art District",
    price: "$1,890,000",
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    type: "Loft",
  },
  {
    id: 4,
    title: "Minimalist City Townhouse",
    location: "Historic Quarter",
    price: "$3,250,000",
    bedrooms: 4,
    bathrooms: 3,
    area: 2900,
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2069&auto=format&fit=crop",
    featured: true,
    type: "Townhouse",
  },
];

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="property-card glass-morphism group">
      <div className="image-container relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110 filter grayscale"
        />
        <div className="image-shimmer"></div>
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 text-xs rounded-full text-white/90">
          {property.type}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors truncate">{property.title}</h3>
            <div className="flex items-center text-muted-foreground gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <span className="text-white font-medium">{property.price}</span>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground border-t border-white/5 pt-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span className="text-sm">{property.bedrooms} <span className="hidden sm:inline">Beds</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.bathrooms} <span className="hidden sm:inline">Baths</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span className="text-sm">{property.area} <span className="hidden sm:inline">Sq Ft</span></span>
          </div>
        </div>
        
        <Link 
          to={`/properties/${property.id}`} 
          className="inline-flex items-center text-sm text-white group-hover:text-white/90 font-medium group"
        >
          View Property
          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
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

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
            Exclusive Properties
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Luxury Residences</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Our handpicked selection of premium properties that exemplify exceptional design, location, and lifestyle opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROPERTIES.map((property, index) => (
            <div key={property.id} className={`animate-on-scroll ${visibleElements.has(document.querySelectorAll('.animate-on-scroll')[index + 1]) ? 'visible' : ''}`} style={{ transitionDelay: `${200 * index}ms` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link
            to="/properties"
            className="inline-flex items-center px-8 py-3 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-white text-sm"
          >
            View All Properties
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
