
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property.types";

gsap.registerPlugin(ScrollTrigger);

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid = ({ properties }: PropertyGridProps) => {
  const propertiesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate properties once section is in view
    const container = propertiesContainerRef.current;
    if (container) {
      const cards = container.children;
      
      gsap.fromTo(cards, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 80%"
          }
        }
      );
    }
  }, [properties]);

  return (
    <div 
      ref={propertiesContainerRef} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {properties.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
