
import { Property } from "../types/property.types";

// Format price for display
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

// Filter properties based on search criteria
export const filterProperties = (
  properties: Property[],
  searchTerm: string,
  selectedCategory: string,
  priceRange: [number, number],
  bedroomFilter: number | null,
  bathroomFilter: number | null
) => {
  return properties.filter(property => {
    // Check if property matches search term
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.type && property.type.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Check if it matches the selected category
    const matchesCategory = 
      selectedCategory === "All Properties" || 
      property.category === selectedCategory;
    
    // Check price range
    const priceValue = property.price_numeric;
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    
    // Check bedroom filter
    const matchesBedroom = bedroomFilter === null || property.bedrooms === bedroomFilter;
    
    // Check bathroom filter
    const matchesBathroom = bathroomFilter === null || Math.floor(property.bathrooms) === bathroomFilter;
    
    // Return true only if all conditions are met
    return matchesSearch && matchesCategory && matchesPrice && matchesBedroom && matchesBathroom;
  });
};
