import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES } from "@/types/property.types";
import { useState } from "react";

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
  isFilterOpen,
  setIsFilterOpen
}: PropertyFiltersProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Updated categories structure
  const NESTED_CATEGORIES = [
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

  return (
    <div className="max-w-3xl mx-auto relative">
      <div className="glass-morphism rounded-lg p-1 flex flex-col md:flex-row">
        {/* Search Input */}
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

        {/* Custom Category Dropdown - Updated with z-index and gray background */}
        <div className="relative px-4 py-2 md:w-[220px]">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex items-center justify-between bg-transparent text-white py-2 px-3 rounded border border-white/20 hover:bg-white/10 transition-colors"
          >
            <span>{selectedCategory}</span>
            {isCategoryOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {isCategoryOpen && (
            <div className="absolute z-50 w-full mt-1 bg-gray-800/95 backdrop-blur-sm text-white rounded-md shadow-lg border border-gray-600">
              {NESTED_CATEGORIES.map((categoryGroup) => (
                <div key={categoryGroup.mainCategory}>
                  <div
                    className={`px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-t ${
                      selectedCategory === categoryGroup.mainCategory ? 'bg-gray-700 font-medium' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory(categoryGroup.mainCategory);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {categoryGroup.mainCategory}
                  </div>

                  {selectedCategory === categoryGroup.mainCategory && (
                    <div className="pl-4 border-l-2 border-gray-500">
                      {categoryGroup.subCategories.map((subCategory) => (
                        <div
                          key={subCategory}
                          className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                            selectedCategory === subCategory ? 'bg-gray-700 font-medium' : ''
                          }`}
                          onClick={() => {
                            setSelectedCategory(subCategory);
                            setIsCategoryOpen(false);
                          }}
                        >
                          {subCategory}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="bg-white text-black px-6 py-3 rounded-md font-medium text-sm hover:bg-white/90 transition-colors m-1">
          Search
        </button>
      </div>

      {/* Additional Filters Toggle */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="text-white/80 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto"
        >
          {isFilterOpen ? 'Hide Filters' : 'Show More Filters'}
          {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;