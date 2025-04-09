
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyDetail from "@/components/PropertyDetail";
import GrayListedProperty from "@/components/GrayListedProperty";
import PropertyFilterInfo from "@/components/PropertyFilterInfo";
import { PROPERTIES, GRAY_LISTED_PROPERTIES } from "@/data/properties.data";
import { filterProperties } from "@/utils/property.utils";
import { useToast } from "@/components/ui/use-toast";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Properties");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [bathroomFilter, setBathroomFilter] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  // Handle viewing a specific property
  const propertyId = params.id || null;
  
  // Check if we're viewing a regular property or a gray listed property
  const viewingProperty = propertyId ? (
    PROPERTIES.find(p => p.id === propertyId) ||
    GRAY_LISTED_PROPERTIES.find(p => p.id.toString() === propertyId)
  ) : null;
  
  // Determine if we're viewing a gray listed property specifically
  const isGrayListed = viewingProperty && 
    'services' in viewingProperty && 
    GRAY_LISTED_PROPERTIES.some(p => p.id.toString() === propertyId);

  // Filter properties based on all filters
  const filteredProperties = filterProperties(
    PROPERTIES,
    searchTerm,
    selectedCategory,
    priceRange,
    bedroomFilter,
    bathroomFilter
  );

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Properties");
    setPriceRange([0, 10000000]);
    setBedroomFilter(null);
    setBathroomFilter(null);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (propertyId && isGrayListed) {
    const grayProperty = GRAY_LISTED_PROPERTIES.find(p => p.id.toString() === propertyId);
    if (grayProperty) {
      return <GrayListedProperty property={grayProperty} />;
    }
  } else if (propertyId && viewingProperty) {
    return <PropertyDetail property={viewingProperty as any} />;
  }

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
            
            {/* Search & Filters */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
              <PropertyFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                bedroomFilter={bedroomFilter}
                setBedroomFilter={setBedroomFilter}
                bathroomFilter={bathroomFilter}
                setBathroomFilter={setBathroomFilter}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
          </div>
        </section>
        
        {/* Property Listings */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Properties Info with Categories and Filters */}
            <PropertyFilterInfo
              filteredProperties={filteredProperties}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resetAllFilters={resetAllFilters}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              bedroomFilter={bedroomFilter}
              setBedroomFilter={setBedroomFilter}
              bathroomFilter={bathroomFilter}
              setBathroomFilter={setBathroomFilter}
            />
            
            {/* Properties Grid */}
            {filteredProperties.length > 0 && (
              <PropertyGrid properties={filteredProperties} />
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
