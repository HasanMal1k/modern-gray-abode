import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import MouseFollower from "@/components/MouseFollower";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, Clock, MapPin, ChevronRight, Video, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Panorama360Viewer from "@/components/Panorama360Viewer";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { toast } = useToast();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const liveViewingRef = useRef<HTMLDivElement>(null);
  
  const [showDemo, setShowDemo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleBookDemo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      
      console.log("Booking demo with data:", Object.fromEntries(formData));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setShowDemo(false);
      toast({
        title: "Demo Request Received",
        description: `Thank you ${name}! We'll contact you at ${email} soon to schedule your LIVE 360° viewing session.`,
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error booking demo:", error);
      setIsSubmitting(false);
      toast({
        title: "Failed to book demo",
        description: "An error occurred while submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    // Check if we came from the Services page wanting to scroll
    const shouldScroll = sessionStorage.getItem('scrollToContactForm');
    if (shouldScroll) {
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        // Small timeout ensures page has loaded
        setTimeout(() => {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear the flag
      sessionStorage.removeItem('scrollToContactForm');
    }
  }, []);
  
  const faqs = [
    {
      question: "Why do I need a property manager?",
      answer: "If you own property that you want to rent, you should consider using a property management company to handle tenants, collect rent, manage maintenance, and more. It allows you to be a hands-off landlord while we handle the day-to-day operations."
    },
    {
      question: "How do you find tenants for my property?",
      answer: "We attract quality tenants through our marketing strategies, detailed property listings with neighborhood information, and thorough screening processes. We conduct financial, social, and character background checks to ensure we find the best match for your property."
    },
    {
      question: "What is your screening process like for tenants?",
      answer: "We perform comprehensive checks on rental history, credit history, criminal background, and socio-economic fit. We contact work supervisors and previous landlords, and sometimes require guarantors. We keep valid IDs on file and ensure all applicants meet our high standards."
    },
    {
      question: "How much involvement do property owners have?",
      answer: "Property owners can be as involved as they wish. Many of our clients feel comfortable stepping back after the first year, trusting our expertise. We always provide regular updates and seek permission for decisions regarding your property."
    },
    {
      question: "What are your property management fees?",
      answer: "We charge a pocket-friendly annual management fee of 5% of the rental figure for renewed leases. For fresh leases where we handle everything including legal aspects, you pay nothing. Maintenance fees and legal expenses for evictions are covered by the homeowner, but we negotiate the best rates for these services."
    }
  ];

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const heroElements = heroRef.current?.querySelectorAll('.animate-hero');
    if (heroElements) {
      gsap.fromTo(heroElements, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out"
        }
      );
    }

    const contactInfoCards = contactInfoRef.current?.querySelectorAll('.animate-card');
    if (contactInfoCards) {
      gsap.fromTo(contactInfoCards, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%"
          }
        }
      );
    }

    const contactFormElements = contactFormRef.current?.querySelectorAll('.animate-section');
    if (contactFormElements) {
      gsap.fromTo(contactFormElements, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 80%"
          }
        }
      );
    }

    const ctaElements = ctaRef.current?.querySelectorAll('.animate-cta');
    if (ctaElements) {
      gsap.fromTo(ctaElements, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%"
          }
        }
      );
    }
    
    const liveViewingElements = liveViewingRef.current?.querySelectorAll('.animate-live-viewing');
    if (liveViewingElements) {
      gsap.fromTo(liveViewingElements, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: liveViewingRef.current,
            start: "top 80%"
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111] z-50" ref={pageRef}>
      <MouseFollower />
      <Navbar />
      
      <main className="pt-24">
        <section className="relative w-full py-20 lg:py-32" ref={heroRef}>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-6xl h-full flex items-center">
                {[...Array(7)].map((_, index) => (
                  <div 
                    key={index} 
                    className="absolute w-1/4 h-full bg-cover bg-center opacity-20 grayscale" 
                    style={{ 
                      backgroundImage: `url('/images/team-${index + 1}.jpg')`,
                      left: `${index * 14}%`,
                      zIndex: 7 - index
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block text-sm tracking-wider uppercase text-white mb-4 py-1 px-3 border border-white/20 rounded-full animate-hero">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight animate-hero">
                Contact GrayScale Realtors
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-hero">
                Reach out to us for all your property management service needs. Whether you prefer email, calls, or in-person meetings, we're here to assist you.
              </p>
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-8 animate-hero">
                <a href="#contact-form">
                  Get Free Consultation
                </a>
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111] to-transparent"></div>
        </section>
        
        <section className="py-16 bg-[#111] relative overflow-hidden" ref={liveViewingRef}>
          <div className="absolute inset-0 z-0 opacity-20">
            <Panorama360Viewer panoramaUrl="/images/team-1.jpg" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 to-[#111]/95"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2">
                <div className="rounded-lg overflow-hidden relative h-[400px] shadow-2xl border border-white/10 animate-live-viewing">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                    <div className="text-center px-6">
                      <Video className="w-16 h-16 mx-auto mb-4 text-white opacity-70" />
                      <h3 className="text-xl font-semibold text-white mb-2">LIVE 360° STREAM</h3>
                      <p className="text-white/70 mb-6">Coming Soon - Our exclusive remote viewing technology</p>
                      <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm border border-white/20">
                        Demo Available for Selected Properties
                      </div>
                    </div>
                  </div>
                  <Panorama360Viewer panoramaUrl="/images/team-1.jpg" />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 animate-live-viewing">
                <div className="mb-4 inline-block bg-white/10 px-4 py-1 rounded-full text-sm text-white/80">
                  EXCLUSIVE FEATURE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Experience Properties from Anywhere with LIVE 360° Viewing
                </h2>
                <p className="text-white/70 mb-8">
                  GrayScale Realtors brings you a revolutionary way to view properties without leaving your home. Our remote LIVE 360° viewing service allows you to experience immersive virtual tours of properties you're interested in, guided by our agents in real-time.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/10 p-2 rounded-full mt-1">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Immersive 360° Experience</h4>
                      <p className="text-white/70">View every corner of the property in stunning detail with our 360° cameras.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-white/10 p-2 rounded-full mt-1">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Flexible Scheduling</h4>
                      <p className="text-white/70">Book a viewing session at your convenience, from anywhere in the world.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-white/10 p-2 rounded-full mt-1">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Live Interaction</h4>
                      <p className="text-white/70">Ask questions and get real-time answers from our agents during the viewing.</p>
                    </div>
                  </div>
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="lg" className="bg-white text-black hover:bg-white/90">
                      <Calendar className="mr-2 w-4 h-4" /> Schedule a LIVE 360° Viewing
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-md bg-[#222]/90 backdrop-blur-lg border-white/10">
                    <SheetHeader>
                      <SheetTitle className="text-white">Book Your LIVE 360° Viewing</SheetTitle>
                      <SheetDescription className="text-white/70">
                        Fill out this form to schedule your personalized remote viewing session.
                      </SheetDescription>
                    </SheetHeader>
                    
                    <form onSubmit={handleBookDemo} className="space-y-6 mt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm text-white/80">
                              Full Name
                            </label>
                            <Input 
                              id="name" 
                              name="name" 
                              required 
                              className="bg-white/5 border-white/10 text-white"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm text-white/80">
                              Email
                            </label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              required 
                              className="bg-white/5 border-white/10 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm text-white/80">
                            Phone Number
                          </label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            required 
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="property" className="text-sm text-white/80">
                            Property Interest
                          </label>
                          <Input 
                            id="property" 
                            name="property" 
                            placeholder="Which property are you interested in?" 
                            required 
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm text-white/80">
                            Preferred Date & Time
                          </label>
                          <Input 
                            id="date" 
                            name="date" 
                            type="text" 
                            placeholder="e.g., April 15, 2PM" 
                            required 
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm text-white/80">
                            Additional Information
                          </label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            className="bg-white/5 border-white/10 text-white min-h-[100px]"
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" /> Book Viewing Session
                          </span>
                        )}
                      </Button>
                      
                      <div className="mt-4 text-sm text-white/60 text-center">
                        <p>You can also book directly via WhatsApp</p>
                        <a 
                          href="https://wa.me/2348066429700" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-white hover:text-white/80 mt-2"
                        >
                          <Phone className="w-4 h-4 mr-1" /> +234 806 642 9700
                        </a>
                      </div>
                    </form>
                  </SheetContent>
                </Sheet>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg" className="ml-0 mt-4 sm:ml-4 sm:mt-0 border-white/20 text-white hover:bg-white/10">
                      <Video className="mr-2 w-4 h-4" /> Watch Demo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl bg-[#222]/90 backdrop-blur-lg border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-white">LIVE 360° Viewing Demo</DialogTitle>
                      <DialogDescription className="text-white/70">
                        Experience a preview of our immersive 360° property viewing technology.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-4 rounded-lg overflow-hidden h-[400px] border border-white/10">
                      <Panorama360Viewer panoramaUrl="/images/team-1.jpg" />
                    </div>
                    
                    <p className="text-white/60 text-sm mt-4">
                      Note: This is a sample demo. The actual LIVE 360° viewing experience includes real-time interaction with our agents and more detailed property exploration.
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-[#151515]" ref={contactInfoRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-[#222]/50 border-white/10 backdrop-blur-lg text-center animate-card">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Call Us</h3>
                  <p className="text-white/70 mb-4">Speak directly with our team</p>
                  <a href="tel:+2348066429700" className="text-white hover:text-white/80 transition-colors">
                    +2348066429700
                  </a>
                </CardContent>
              </Card>
              
              <Card className="bg-[#222]/50 border-white/10 backdrop-blur-lg text-center animate-card">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Email Us</h3>
                  <p className="text-white/70 mb-4">Get answers to your queries</p>
                  <a href="mailto:sabi@grayscalerealtors.com" className="text-white hover:text-white/80 transition-colors">
                    sabi@grayscalerealtors.com
                  </a>
                </CardContent>
              </Card>
              
              <Card className="bg-[#222]/50 border-white/10 backdrop-blur-lg text-center animate-card">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">Office Location</h3>
                  <p className="text-white/70 mb-4">Visit us in person</p>
                  <p className="text-white">1/5 Owel-Linkso Road, Lekki Penninsula II</p>
                  <p className="text-white">Lekki, Nigeria</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-[#111] text-white" id="contact-form" ref={contactFormRef}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="animate-section">
                <ContactSection />
              </div>
              
              <div className="animate-section">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
                  <p className="text-white/70">
                    Find answers to common questions about our property management services.
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border border-white/10 rounded-lg px-6 py-2 bg-[#222]/30">
                      <AccordionTrigger className="text-left font-medium text-base text-white hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70 pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-8 p-6 border border-white/10 rounded-lg bg-[#222]/30">
                  <h3 className="text-xl font-medium mb-4 text-white">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Sunday</span>
                      <span className="text-white">By Appointment Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-[#151515]" ref={ctaRef}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white animate-cta">Ready to Get Started?</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto animate-cta">
              Contact us today to learn more about our property management services. Our team is ready to assist you with all your real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-cta">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-8">
                <a href="tel:+2348066429700">
                  Call Us Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <a href="mailto:sabi@grayscalerealtors.com">
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
