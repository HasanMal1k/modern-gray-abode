
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MouseFollower from "./MouseFollower";
import HeroBuilding3D from "./HeroBuilding3D";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden grain-effect">
      {/* Mouse follower */}
      <MouseFollower />
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/70 via-black/60 to-background z-10"></div>
      
      {/* Background video/image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full animate-[pulse-slow_5s_infinite]">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')] bg-center bg-no-repeat bg-cover"
            style={{ 
              filter: "grayscale(90%) sepia(20%) brightness(0.7) contrast(110%)",
              transform: "scale(1.05)",
            }}
          />
        </div>
      </div>
      
      {/* 3D Building Model */}
      <div className="absolute inset-0 w-full h-full z-5">
        <HeroBuilding3D />
      </div>
      
      {/* Content */}
      <div className="relative z-20 container px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <p className="inline-block text-sm tracking-wider uppercase text-white/80 mb-6 py-1 px-3 border border-white/10 backdrop-blur-sm rounded-full">Premium Real Estate</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight text-balance mb-6">
              <span className="block">Luxury Living</span>
              <span className="block text-balance text-accent/90">Reimagined</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Discover exceptional properties that define modern luxury and sophistication in prime locations.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/properties"
              className="px-8 py-3 rounded-md bg-accent text-white font-medium hover:bg-accent/90 transition-all duration-300 text-sm orange-glow"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/10 hover:bg-white/20 transition-all duration-300 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer">
        <ChevronDown className="w-6 h-6 text-white/70" />
      </div>
    </div>
  );
};

export default HeroSection;
