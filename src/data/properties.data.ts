
import { Property, GrayListedPropertyType } from "../types/property.types";

export const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Elegant Penthouse Suite",
    location: "Downtown Metropolitan",
    price: "$4,500,000",
    price_numeric: 4500000,
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3200,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
    featured: true,
    type: "Penthouse",
    category: "Homes for Sale",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Modern Waterfront Villa",
    location: "Coastal Heights",
    price: "$6,750,000",
    price_numeric: 6750000,
    bedrooms: 5,
    bathrooms: 4.5,
    area: 5800,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    featured: true,
    type: "Villa",
    category: "Homes for Sale",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Contemporary Loft Apartment",
    location: "Art District",
    price: "$1,890,000",
    price_numeric: 1890000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    type: "Loft",
    category: "Rentals",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    title: "Minimalist City Townhouse",
    location: "Historic Quarter",
    price: "$3,250,000",
    price_numeric: 3250000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2900,
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2069&auto=format&fit=crop",
    featured: true,
    type: "Townhouse",
    category: "Off Plan Deals",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "5",
    title: "Ultra Luxury Beachfront Estate",
    location: "Oceanfront Drive",
    price: "$12,900,000",
    price_numeric: 12900000,
    bedrooms: 6,
    bathrooms: 7.5,
    area: 8500,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    type: "Estate",
    category: "Land for Sale/Joint Ventures",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "6",
    title: "Downtown Executive Condo",
    location: "Financial District",
    price: "$2,350,000",
    price_numeric: 2350000,
    bedrooms: 2,
    bathrooms: 2.5,
    area: 1950,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    type: "Condo",
    category: "Off Plan Deals",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "7",
    title: "Luxury High-Rise Apartment",
    location: "City Center",
    price: "$3,150,000",
    price_numeric: 3150000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2400,
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop",
    featured: false,
    type: "Apartment",
    category: "Gray Stays~Shortlet Listings",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "8",
    title: "Historic Mansion Renovation",
    location: "Heritage District",
    price: "$8,750,000",
    price_numeric: 8750000,
    bedrooms: 7,
    bathrooms: 5.5,
    area: 7200,
    image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?q=80&w=1974&auto=format&fit=crop",
    featured: false,
    type: "Mansion",
    category: "Rentals",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Gray Listed Properties
export const GRAY_LISTED_PROPERTIES: GrayListedPropertyType[] = [
  {
    id: 101,
    title: "The Bachelor(ette)",
    subtitle: "Experience vibrant nightlife and convenience in Lekki Phase 1, surrounded by bars, restaurants, and shopping steps away.",
    location: "Lekki Phase 1, Lagos",
    price: "N250,000",
    priceNumeric: 250000,
    powerSupply: "24/7",
    style: "2-Bedroom 2.5 Baths Open Plan Kitchen Gym & Pool",
    highlights: ["Central", "Secure", "Brand new Listing"],
    rating: 5.0,
    bedrooms: 2,
    bathrooms: 2.5,
    services: [
      "Airport Pickup/Drop Off",
      "Concierge",
      "Personal Chauffeur",
      "Personal Massusse",
      "Personal Chef"
    ],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
    ],
    video: "https://example.com/bachelor-video",
    category: "Gray Stays~Shortlet Listings"
  },
  {
    id: 102,
    title: "Ocean Breeze",
    subtitle: "Feel at home in Lekki, surrounded by bars, restaurants, and shopping.",
    location: "Ologolo Lekki, Lagos",
    price: "N280,000",
    priceNumeric: 280000,
    powerSupply: "24/7",
    style: "3-Bedroom 3.5 Baths Fully detached home",
    highlights: ["Private", "Secure", "Brand new Listing"],
    rating: 5.0,
    bedrooms: 3,
    bathrooms: 3.5,
    services: [
      "Airport Pickup/Drop Off",
      "Concierge",
      "Personal Chauffeur",
      "Onsite Runner available 24/7",
      "Walkie Talkie Comms System"
    ],
    images: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=2070&auto=format&fit=crop"
    ],
    video: "https://example.com/ocean-breeze-video",
    category: "Gray Stays~Shortlet Listings"
  },
  // Shortened for brevity - remaining properties would be included here
  {
    id: 110,
    title: "Luxurious Living in Banana Island",
    subtitle: "Discover Luxurious Living in Banana Island, Ikoyi",
    location: "Banana Island, Ikoyi",
    price: "N180,000",
    priceNumeric: 180000,
    description: "Step into the epitome of luxury with our stunning 2-bedroom apartment, nestled within the prestigious Banana Island, Ikoyi. Known for its exclusivity and serene environment, Banana Island offers an unparalleled living experience, surrounded by some of Lagos's most affluent residents.",
    bedrooms: 2,
    bathrooms: 2.5,
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Gray Stays~Shortlet Listings"
  }
];
