
import { useState } from "react";
import { Search, Filter, List, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CATEGORIES } from "@/types/property.types";
import { formatPrice } from "@/utils/property.utils";

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
  priceRange,
  setPriceRange,
  bedroomFilter,
  setBedroomFilter,
  bathroomFilter,
  setBathroomFilter,
  isFilterOpen,
  setIsFilterOpen
}: PropertyFiltersProps) => {
  const resetFilters = () => {
    setPriceRange([0, 10000000]);
    setBedroomFilter(null);
    setBathroomFilter(null);
  };

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

      {/* Advanced Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10">
        <div className="flex space-x-3">
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
                  <div className="pt-5 pb-2">
                    <Slider
                      defaultValue={[0, 10000000]}
                      value={priceRange}
                      max={10000000}
                      step={100000}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
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
      </div>
    </div>
  );
};

export default PropertyFilters;
