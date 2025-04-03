
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BedDouble, Bath, Square, MapPin, ArrowLeft, Share2, Heart, ExternalLink, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
  type: string;
  category: string;
}

const PropertyDetail = ({ property }: { property: Property }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} at ${property.location} for ${property.price}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard");
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleContact = () => {
    window.open("https://wa.me/1234567890?text=I'm interested in " + property.title);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm mb-6 hover:text-white/90"
          >
            <ArrowLeft className="mr-1 w-4 h-4" />
            Back to Properties
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Media */}
            <div className="lg:col-span-2">
              <div className="h-[400px] md:h-[500px] relative overflow-hidden rounded-lg">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-md border-white/10 text-white rounded-full w-10 h-10 p-0"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`bg-black/50 hover:bg-black/70 backdrop-blur-md border-white/10 text-white rounded-full w-10 h-10 p-0 ${isFavorite ? 'text-red-500' : ''}`}
                    onClick={handleFavorite}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-medium">
                  {property.type}
                </div>
              </div>
            </div>
            
            {/* Property Info */}
            <div className="lg:col-span-1">
              <div className="glass-morphism p-6 rounded-lg h-full flex flex-col">
                <h1 className="text-2xl font-semibold mb-2">{property.title}</h1>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                
                <div className="text-2xl font-bold mb-6">{property.price}</div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                    <BedDouble className="w-5 h-5 mb-1" />
                    <span className="text-sm">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                    <Bath className="w-5 h-5 mb-1" />
                    <span className="text-sm">{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                    <Square className="w-5 h-5 mb-1" />
                    <span className="text-sm">{property.area} sqft</span>
                  </div>
                </div>
                
                <div className="mt-auto space-y-3">
                  <Button className="w-full" onClick={handleContact}>
                    <Phone className="mr-2 h-4 w-4" /> WhatsApp Contact
                  </Button>
                  <a href="mailto:info@graystays.com">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Email Inquiry
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Description */}
          <div className="mt-8 glass-morphism p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Property Description</h2>
            <p className="text-muted-foreground">
              This {property.bedrooms} bedroom, {property.bathrooms} bathroom {property.type.toLowerCase()} 
              offers {property.area} square feet of elegant living space in {property.location}. 
              The property showcases luxurious finishes, state-of-the-art amenities, and a prime location.
            </p>
          </div>
          
          {/* Map Section */}
          <div className="mt-8 glass-morphism p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="h-[300px] rounded-lg bg-white/5 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-3">Interactive map will be displayed here</p>
                <a 
                  href={`https://www.google.com/maps/search/${encodeURIComponent(property.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium hover:underline"
                >
                  View on Google Maps <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
