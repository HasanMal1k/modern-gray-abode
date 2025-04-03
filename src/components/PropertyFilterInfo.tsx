
import { Property } from "@/types/property.types";

interface PropertyFilterInfoProps {
  filteredProperties: Property[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetAllFilters: () => void;
}

const PropertyFilterInfo = ({
  filteredProperties,
  searchTerm,
  setSearchTerm,
  resetAllFilters
}: PropertyFilterInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
      <h2 className="text-2xl font-semibold mb-4 md:mb-0">
        {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Available
      </h2>
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-16">
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
