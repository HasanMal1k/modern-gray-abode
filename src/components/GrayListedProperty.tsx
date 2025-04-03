
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BedDouble, Bath, MapPin, ArrowLeft, Share2, Heart, ExternalLink, Phone, MessageSquare, Star, PlayCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface GrayListedPropertyType {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  price: string;
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

const GrayListedProperty = ({ property }: { property: GrayListedPropertyType }) => {
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

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890?text=I'm interested in " + property.title);
  };

  const handleVideoPlay = () => {
    // This would be replaced with actual video player functionality
    toast("Video playback would start here");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <MouseFollower />
      
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
              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index} className="h-[400px] md:h-[500px]">
                      <div className="h-full w-full relative rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${property.title} - Image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                  {property.video && (
                    <CarouselItem className="h-[400px] md:h-[500px]">
                      <div className="h-full w-full relative rounded-lg overflow-hidden bg-black/30 flex items-center justify-center cursor-pointer" onClick={handleVideoPlay}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <PlayCircle className="w-16 h-16 text-white z-10" />
                        <div className="absolute bottom-4 left-4 text-white font-medium z-10">Watch Video Tour</div>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 w-4 h-4" /> Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white ${isFavorite ? 'text-red-500' : ''}`}
                  onClick={handleFavorite}
                >
                  <Heart className={`mr-2 w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} /> Favorite
                </Button>
              </div>
            </div>
            
            {/* Property Info */}
            <div className="lg:col-span-1">
              <div className="glass-morphism p-6 rounded-lg h-full flex flex-col">
                <div className="mb-3">
                  {property.category === "Gray Stays~Shortlet Listings" && (
                    <span className="inline-block bg-accent/20 text-accent rounded-full px-3 py-1 text-xs font-medium">
                      Gray Stays™
                    </span>
                  )}
                </div>
              
                <h1 className="text-2xl font-semibold mb-1">{property.title}</h1>
                <p className="text-muted-foreground mb-3">{property.subtitle}</p>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                
                <div className="text-2xl font-bold mb-2">{property.price}</div>
                <p className="text-sm text-muted-foreground mb-6">
                  {property.price === "N120,000" ? "[$78.00]" : property.price === "N370,000" ? "[$240]" : ""}
                </p>
                
                {property.rating && (
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < property.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm">{property.rating?.toFixed(1)} rating</span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                    <BedDouble className="w-5 h-5 mb-1" />
                    <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                    <Bath className="w-5 h-5 mb-1" />
                    <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                </div>

                {property.style && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Style</h3>
                    <p className="text-sm text-muted-foreground">{property.style}</p>
                  </div>
                )}

                {property.powerSupply && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Power Supply</h3>
                    <p className="text-sm text-muted-foreground">{property.powerSupply}</p>
                  </div>
                )}
                
                <div className="mt-auto space-y-3">
                  <Button className="w-full" onClick={handleWhatsApp}>
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
          
          {/* Tabs for Details */}
          <div className="mt-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <div className="glass-morphism p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {property.description || `Experience the perfect stay at this beautiful ${property.bedrooms} bedroom property in ${property.location}.`}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="highlights" className="mt-4">
                <div className="glass-morphism p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                  {property.highlights && property.highlights.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {property.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2 p-1 bg-white/10 rounded-full">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No highlights have been specified for this property.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="mt-4">
                <div className="glass-morphism p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Services</h2>
                  {property.services && property.services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.services.map((service, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2 p-1 bg-white/10 rounded-full">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No additional services have been specified for this property.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="mt-4">
                <div className="glass-morphism p-6 rounded-lg">
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
              </TabsContent>
            </Tabs>
          </div>
          
          {/* CTA Section */}
          <div className="mt-8 glass-morphism p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Ready to Book This Property?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us now through WhatsApp for faster response or send us an email with your inquiry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleWhatsApp} size="lg">
                <Phone className="mr-2 h-4 w-4" /> WhatsApp Contact
              </Button>
              <a href="mailto:info@graystays.com">
                <Button variant="outline" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" /> Send Email Inquiry
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GrayListedProperty;
