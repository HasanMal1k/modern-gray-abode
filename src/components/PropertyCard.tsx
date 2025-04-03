
import { BedDouble, Bath, Square, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/types/property.types";

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="property-card glass-morphism group">
      <div className="image-container relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110 filter grayscale"
        />
        <div className="image-shimmer"></div>
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 text-xs rounded-full text-white/90">
          {property.type}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors truncate">{property.title}</h3>
            <div className="flex items-center text-muted-foreground gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <span className="text-white font-medium">{property.price}</span>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground border-t border-white/5 pt-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span className="text-sm">{property.bedrooms} <span className="hidden sm:inline">Beds</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.bathrooms} <span className="hidden sm:inline">Baths</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span className="text-sm">{property.area} <span className="hidden sm:inline">Sq Ft</span></span>
          </div>
        </div>
        
        <Link 
          to={`/properties/${property.id}`} 
          className="inline-flex items-center text-sm text-white group-hover:text-white/90 font-medium group"
        >
          View Details
          <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
