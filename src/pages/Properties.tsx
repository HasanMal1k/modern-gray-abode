import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BedDouble, Bath, Square, MapPin, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseFollower from "@/components/MouseFollower";
gsap.registerPlugin(ScrollTrigger);

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
  {
    id: 5,
    title: "Ultra Luxury Beachfront Estate",
    location: "Oceanfront Drive",
    price: "$12,900,000",
    bedrooms: 6,
    bathrooms: 7.5,
    area: 8500,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    type: "Estate",
  },
  {
    id: 6,
    title: "Downtown Executive Condo",
    location: "Financial District",
    price: "$2,350,000",
    bedrooms: 2,
    bathrooms: 2.5,
    area: 1950,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    type: "Condo",
  },
  {
    id: 7,
    title: "Luxury High-Rise Apartment",
    location: "City Center",
    price: "$3,150,000",
    bedrooms: 3,
    bathrooms: 3,
    area: 2400,
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop",
    featured: false,
    type: "Apartment",
  },
  {
    id: 8,
    title: "Historic Mansion Renovation",
    location: "Heritage District",
    price: "$8,750,000",
    bedrooms: 7,
    bathrooms: 5.5,
    area: 7200,
    image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?q=80&w=1974&auto=format&fit=crop",
    featured: false,
    type: "Mansion",
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
          View Details
          <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const propertiesContainerRef = useRef<HTMLDivElement>(null);

  // Filter properties based on search term
  const filteredProperties = PROPERTIES.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setIsVisible(true);

    // Animate properties once section is in view
    const container = propertiesContainerRef.current;
    if (container) {
      const cards = container.children;
      
      gsap.fromTo(cards, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 80%"
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <MouseFollower />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-black/70 to-background relative">
          <div className="max-w-7xl mx-auto">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
                Discover Our Exclusive Properties
              </h1>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Browse our handpicked selection of luxury properties across prime locations.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <div className="glass-morphism rounded-lg p-1 flex">
                <div className="flex-1 flex items-center pl-4">
                  <Search className="w-5 h-5 text-muted-foreground mr-2" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or features..."
                    className="w-full bg-transparent border-none text-white focus:outline-none py-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-white text-black px-6 py-3 rounded-md font-medium text-sm hover:bg-white/90 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Property Listings */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters and Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <h2 className="text-2xl font-semibold mb-4 md:mb-0">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Available
              </h2>
              
              <button className="flex items-center space-x-2 px-5 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white text-sm transition-all duration-300 border border-white/10">
                <Filter className="w-4 h-4" />
                <span>Filter Properties</span>
              </button>
            </div>
            
            {/* Properties Grid */}
            <div 
              ref={propertiesContainerRef} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((property) => (
                <div key={property.id}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No properties match your search criteria.</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/15 transition-colors text-white text-sm rounded-md"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;