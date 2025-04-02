import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import MouseFollower from "@/components/MouseFollower";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, Clock, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
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

    // Hero Section Animation
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

    // Contact Info Cards Animation
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

    // Contact Form and FAQ Animation
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

    // CTA Section Animation
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
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111] z-50" ref={pageRef}>
      <MouseFollower />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32" ref={heroRef}>
          {/* Background Overlay */}
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
                Contact Grayscale Realtors
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
          
          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111] to-transparent"></div>
        </section>
        
        {/* Quick Contact Info Section */}
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
                    +234 806 642 9700
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
                  <p className="text-white">1/5 Owel-Linkso Road, Lekki</p>
                  <p className="text-white">Lagos, Nigeria</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Contact Form and FAQ Section */}
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
        
        {/* CTA Section */}
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