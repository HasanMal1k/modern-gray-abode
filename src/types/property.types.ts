
export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  priceNumeric: number; // Added for price filtering
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
  type: string;
  category: string;
}

export interface GrayListedPropertyType {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  priceNumeric: number;
  images: string[];
  video?: string;
  features?: string[];
  services?: string[];
  highlights?: string[];
  rating?: number;
  bedrooms: number;
  bathrooms: number;
  powerSupply?: string;
  style?: string;
  description?: string;
  category: string;
}

// Property categories
export const CATEGORIES = [
  "All Properties",
  "Gray Stays~Shortlet Listings",
  "Homes for Sale",
  "Off Plan Deals",
  "Land for Sale/Joint Ventures",
  "Rentals"
];
