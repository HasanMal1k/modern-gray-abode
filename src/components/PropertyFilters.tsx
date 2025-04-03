
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/types/property.types";

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  bedroomFilter: number | null;
  setBedroomFilter: (bedrooms: number | null) => void;
  bathroomFilter: number | null;
  setBathroomFilter: (bathrooms: number | null) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const PropertyFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: PropertyFiltersProps) => {
  return (
    <div>
      {/* Search & Category Filter */}
      <div className="max-w-3xl mx-auto">
        <div className="glass-morphism rounded-lg p-1 flex flex-col md:flex-row">
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
          <div className="md:border-l border-white/10 mx-2 my-1 hidden md:block" />
          <div className="px-4 py-2 md:w-[220px]">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full border-none bg-transparent text-white focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-md font-medium text-sm hover:bg-white/90 transition-colors m-1">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
