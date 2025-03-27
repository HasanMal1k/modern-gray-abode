
import { useState, useEffect, useRef } from "react";
import { Send, MapPin, Phone, Mail, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. We'll be in touch shortly.",
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 animate-on-scroll text-center">
          <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Whether you're looking to buy, sell, or simply explore the possibilities, our team is ready to assist you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <div className="glass-morphism rounded-xl p-8">
              <h3 className="text-xl font-medium mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm text-muted-foreground mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || isSuccess}
                    className={`flex items-center justify-center w-full rounded-md py-2.5 px-4 text-sm font-medium transition-all duration-300 ${
                      isSuccess 
                        ? 'bg-white/20 text-white cursor-default'
                        : 'bg-white text-black hover:bg-white/90'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : isSuccess ? (
                      <span className="flex items-center">
                        <Check className="w-4 h-4 mr-2" />
                        Sent Successfully
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8 animate-on-scroll">
            <div className="glass-morphism rounded-xl p-8">
              <h3 className="text-xl font-medium mb-6">Our Contact Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Office Address</h4>
                    <p className="text-muted-foreground">1/5 Owel-Linkso Road, Lekki Penninsula II, Lekki</p>
                    <p className="text-muted-foreground">106104, Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone Number</h4>
                    <p className="text-muted-foreground">+234 806 642 9700</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email Address</h4>
                    <p className="text-muted-foreground">sabi@grayscalerealtors.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-morphism rounded-xl p-8">
              <h3 className="text-xl font-medium mb-6">Office Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-white">By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
