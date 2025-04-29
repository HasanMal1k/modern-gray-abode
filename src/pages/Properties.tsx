import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyDetail from "@/components/PropertyDetail";
import GrayListedProperty from "@/components/GrayListedProperty";
import PropertyFilterInfo from "@/components/PropertyFilterInfo";
import { filterProperties } from "@/utils/property.utils";
import { useToast } from "@/components/ui/use-toast";
import { GRAY_LISTED_PROPERTIES } from "@/data/properties.data";
import type { Property, GrayListedPropertyType } from "@/types/property.types";

const PROPERTY_CATEGORIES = [
  {
    mainCategory: "All Properties",
    subCategories: [
      "Gray Stays - Shortlets",
      "Gray Sales - Homes for Sale",
      "Off-Plan units",
      "Gray Residential - Rental homes",
      "Gray Commercial - Commercial",
      "Gray JV's - Joint Venture Partnerships",
      "Gray Earth - Land parcels for sale"
    ]
  }
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Properties");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [bathroomFilter, setBathroomFilter] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ id: string }>();
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const transformedProperties = data.map(property => ({
        ...property,
        images: property.property_images
          ? property.property_images.map(img => img.image_url)
          : [],
        image: property.property_images?.find(img => img.is_primary)?.image_url || 
               property.property_images?.[0]?.image_url || 
               '/placeholder.svg'
      }));

      setProperties(transformedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const propertyId = params.id || null;
  
  const viewingGrayListed = GRAY_LISTED_PROPERTIES.some(p => 
    p.id.toString() === propertyId
  );
  
  const viewingProperty = propertyId 
    ? viewingGrayListed 
      ? GRAY_LISTED_PROPERTIES.find(p => p.id.toString() === propertyId) 
      : properties.find(p => p.id === propertyId)
    : null;

  const filteredProperties = filterProperties(
    properties,
    searchTerm,
    selectedCategory,
    priceRange,
    bedroomFilter,
    bathroomFilter
  );

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

  if (propertyId && viewingGrayListed && viewingProperty) {
    return <GrayListedProperty property={viewingProperty as GrayListedPropertyType} />;
  } else if (propertyId && viewingProperty) {
    return <PropertyDetail property={viewingProperty as Property} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <MouseFollower />

      <main className="pt-24">
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
                categories={PROPERTY_CATEGORIES}
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
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
              categories={PROPERTY_CATEGORIES}
            />
            
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : filteredProperties.length > 0 ? (
              <PropertyGrid properties={filteredProperties} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No properties found matching your criteria.</p>
                <button 
                  onClick={resetAllFilters}
                  className="mt-4 text-orange-500 hover:text-orange-600"
                >
                  Reset filters
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