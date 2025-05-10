
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Gray Scale's expertise and dedication transformed our property search from overwhelming to exhilarating. Their attention to our specific requirements led us to a home that exceeded our expectations.",
    author: "Alexander Bennett",
    position: "CEO, Bennett Enterprises",
    image: "/images/blackmen.jpg",
  },
  {
    id: 2,
    quote: "Working with Gray Scale to sell our family estate was seamless. Their strategic marketing approach and network of high-net-worth individuals ensured we received multiple competitive offers.",
    author: "Victoria Chambers",
    position: "Interior Designer",
    image: "/images/blackgirl.jpg",
  },
  {
    id: 3,
    quote: "As international investors, we needed a team who understood both the market and our vision. Gray Scale provided invaluable insights that guided our portfolio expansion in ways we hadn't considered.",
    author: "Adebayo & Folake Johnson",
    position: "Investment Director",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (section) {
        const elements = section.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden backdrop-blur-3xl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-16 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
            Client Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            The relationships we build with our clients are as important as the properties we represent.
          </p>
        </div>
        
        <div className="relative animate-on-scroll">
          <div className="glass-morphism rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Image */}
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  <img 
                    src={TESTIMONIALS[currentIndex].image} 
                    alt={TESTIMONIALS[currentIndex].author} 
                    className="w-full h-full object-cover filter grayscale transition-transform duration-700"
                  />
                  <div className="image-shimmer"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="md:col-span-8 order-1 md:order-2">
                <Quote className="w-12 h-12 text-white/20 mb-6" />
                <div key={currentIndex} className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                  <p className="text-xl text-white leading-relaxed mb-8">
                    "{TESTIMONIALS[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="text-white font-medium">{TESTIMONIALS[currentIndex].author}</h4>
                    <p className="text-muted-foreground text-sm">{TESTIMONIALS[currentIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex space-x-2 items-center">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-white' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
