import { Property, CATEGORIES } from "@/types/property.types";
import { Filter, List, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PropertyFilterInfoProps {
  filteredProperties: Property[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetAllFilters: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  bedroomFilter: number | null;
  setBedroomFilter: (bedrooms: number | null) => void;
  bathroomFilter: number | null;
  setBathroomFilter: (bathrooms: number | null) => void;
}

const PropertyFilterInfo = ({
  filteredProperties,
  searchTerm,
  setSearchTerm,
  resetAllFilters,
  selectedCategory,
  setSelectedCategory,
  isFilterOpen,
  setIsFilterOpen,
  priceRange,
  setPriceRange,
  bedroomFilter,
  setBedroomFilter,
  bathroomFilter,
  setBathroomFilter
}: PropertyFilterInfoProps) => {
  const resetFilters = () => {
    setPriceRange([0, 10000000]);
    setBedroomFilter(null);
    setBathroomFilter(null);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
      <h2 className="text-2xl font-semibold mb-4 md:mb-0">
        {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Available
      </h2>
      
      {filteredProperties.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 px-5 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white text-sm transition-all duration-300 border border-white/10">
              <List className="w-4 h-4" />
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 backdrop-blur-md border border-white/10">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  className={`${selectedCategory === category ? 'bg-white/10' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <button 
                className="flex items-center space-x-2 px-5 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white text-sm transition-all duration-300 border border-white/10"
              >
                <Filter className="w-4 h-4" />
                <span>Filter Properties</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-background/95 backdrop-blur-md border border-white/10">
              <div className="space-y-4">
                <h3 className="font-medium text-white">Filter Options</h3>
                
                {/* Price Range Filter */}
                <div className="space-y-2">
                  <h4 className="text-sm text-muted-foreground">Price Range</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min={0}
                      max={10000000}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground">{priceRange[0]}</span>
                    <span className="text-sm text-muted-foreground"> - </span>
                    <span className="text-sm text-muted-foreground">{priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Bedrooms Filter */}
                <div className="space-y-2">
                  <h4 className="text-sm text-muted-foreground">Bedrooms</h4>
                  <div className="flex space-x-2">
                    {[null, 1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num === null ? 'any' : num}
                        className={`px-3 py-1.5 rounded-md text-xs ${
                          bedroomFilter === num 
                            ? 'bg-white text-black' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        onClick={() => setBedroomFilter(num)}
                      >
                        {num === null ? 'Any' : num + '+'}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bathrooms Filter */}
                <div className="space-y-2">
                  <h4 className="text-sm text-muted-foreground">Bathrooms</h4>
                  <div className="flex space-x-2">
                    {[null, 1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num === null ? 'any' : num}
                        className={`px-3 py-1.5 rounded-md text-xs ${
                          bathroomFilter === num 
                            ? 'bg-white text-black' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        onClick={() => setBathroomFilter(num)}
                      >
                        {num === null ? 'Any' : num + '+'}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters */}
                <button
                  className="w-full py-2 mt-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-sm transition-colors"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-16 w-full">
          <p className="text-xl text-muted-foreground">No properties match your search criteria.</p>
          <div className="mt-6 space-x-4">
            <button 
              onClick={() => setSearchTerm("")}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/15 transition-colors text-white text-sm rounded-md"
            >
              Clear Search
            </button>
            <button 
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/15 transition-colors text-white text-sm rounded-md"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilterInfo;
