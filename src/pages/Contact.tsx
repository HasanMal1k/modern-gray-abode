
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import MouseFollower from "@/components/MouseFollower";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  
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

    const section = heroRef.current;
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

  const faqs = [
    {
      question: "Why do I need a property manager?",
      answer: "If you own property that you want to rent, you should always consider using a property management company or property manager. These professionals specialize in managing properties and handling tenants, including collecting rent, dealing with clients and leases, and so much more. It's a great way to be a landlord with a hands-off approach. Property managers will deal with tenants, renting your property, collecting rent and any deposits, maintenance and repairs, and total property management for your unit, whether you've got one or 100 properties that need to be managed. You can get back to being a property investor and let someone else handle the less exciting stuff."
    },
    {
      question: "How do you find tenants for my property?",
      answer: "Our unique position as a property management company attracts some of the best tenants. We are visible and seen as a direct link to the homeowner, avoiding long chains of agents which ultimately results in complications and miscommunication. We position your home in all its glory, ensuring to promote its unique offering. A detailed neighborhood review with calculated distances to all malls, hospitals, gas stations, grocery stores, schools, and other desirable locations and services within proximity to your property accompanies your listing. Now that your home has eyeballs, it's time to screen the applicants. A detailed financial, social, and character background audit helps us find the best candidate for you all the time. Sometimes we find more than one; in such cases, we recommend our top choices and ask that you play mini mani mo with us. Whomever you pick, we are right there to ensure you both have the best relationship. We have systems in place that ensure the biggest pain points for landlords and tenants are handled with near zero friction, with timely rent payment and prompt maintenance/repair being high on that list. Tenants are just as happy dealing with GSR as landlords are."
    },
    {
      question: "What is your screening process like for tenants?",
      answer: "As touched on previously, we carry out purpose-driven checks to ascertain that the individual we are matching with you has a clean rental history, credit history, spotless criminal record, and is a socio-economic fit for the home being applied for. We speak with work supervisors and previous landlords, and sometimes require guarantors. The latter is usually unattainable for individuals who haven't kept good relationships over time, as no one wants to guarantee a ticking time bomb. Valid IDs are always required and kept on file. Please note that minor misdemeanors are not treated as criminal offenses but are reviewed to ensure that our applicants handle themselves respectably under each circumstance."
    },
    {
      question: "How much involvement do property owners have?",
      answer: "Property owners are as involved as they would like to be. Usually, we find that after a smooth first year with some of our new clients, they feel less of a need to get involved and trust our expertise and systems to care for their homes. Nonetheless, updates are frequently given, and permissions are always sought from us when it comes to decisions taken concerning your home. We are known industry-wide mainly for our approach to client relationships, with a GSR partner just a quick text or call away. If you are a busy bee, we understand because we are just as busy handling your home's unique needs."
    },
    {
      question: "What are your property management company's fees like?",
      answer: "We offer pocket-friendly fees at Gray Scale REALTORS because we realize that rent is a source of income, and we are not trying to tax your earnings. We are only here to alleviate the work it takes to earn; your job ended the day you paid for that property. Now sit back and earn. An annual management fee of 5% of the rental figure (excluding lease agreement, maintenance, or any other fees outside the annual figure) covers our fees on renewed leases. On fresh leases where we handle everything including legal, you pay nothing. However, maintenance fees and legal expenses tied to eviction processes are covered by the homeowner, but because we are a 360 service provider with years of established relationships, we can get you the best rates on these professional services. Besides paychecks, your fees help cover running costs tied to your unit such as phone bills and periodic visits for either routine or requested inspections."
    },
    {
      question: "Who does repairs on my property?",
      answer: "We handle everything, even the tenants' distress calls. We then go on to manage the situation as we reach out to you (if it's at a Godly hour). During this briefing session, we inform you of measures already taken to stop the bleeding and offer our suggestions on the best solutions. We can decide on the best approach together or leave the surgery to us; either way, you are required to sign off on the procedure before it takes place. Not to worry, at this point, the bleeding has already been stopped. The landlord funds all repairs, and we see that a perfect job is done and updates given."
    },
    {
      question: "What types of properties do you manage?",
      answer: "We manage residential and commercial units. We also manage gated communities with 20 or more homes. We manage short let apartments as well as a few beach houses. Our short experiences come with stress-free comforts like airport protocol for fast and easy exit from the arrival hall to your assigned vehicle and all the way to your accommodations. We also offer daily chauffeur services if you want to hop around for social events or meetings, not forgetting our concierge service day/night life chaperons and security if the need ever arose."
    },
    {
      question: "How do you collect rents?",
      answer: "We are pretty firm on rent collection as it's one of our core promises to landlords to receive their payment as at when due. We understand that we are all human and things don't always go according to plan, so for tenants who have genuine reasons for delaying rent, we have them write you through us requesting an extension which you are in your right to deny, adjust to suit your tolerance, or accept as is. We then draft an extension agreement and separate late fees attached, which the tenant is required to sign. Failure to clear outstanding at the expiration of the extension immediately sets eviction processes in motion. Again, you don't do much besides sign here and there; you will be updated at all times as things progress. All things being equal, rent is received as at when due to your assigned bank account with same-day value. In all things, we are firm but considerate, as we are aware that Naija is going through a rough patch, so we prioritize fair and humane treatment because at Gray Scale we know that 'Naija has never been Black and White'."
    },
    {
      question: "How long will it take to rent my unit?",
      answer: "As we all know, there's no finite timeline for renting properties; for us, it's more about the perfect match. However, we can assure you that from the day we sign you up, we get straight to work putting your listing in the faces of the right clientele and sieving through the pile of applications for your perfect match. Unit prep, Advertising, Tenant Screening, and Legal documentation are steps between our initial handshake and your keys going out, which has happened in a week and in some cases a couple more."
    },
    {
      question: "Do you have a waiting list?",
      answer: "Yes, we do. We have come to find that a waiting list is the only way to manage our high-demand properties, so most times, there is already a tenant waiting to snatch up our unlisted units. You can find our waiting list on our website; fill out the forms, and they will be time-stamped and filed for when the need arises. Or simply email us at: sabi@grayscalerealtors.com (those have time stamps too), but be sure to copy the listing title exactly as is and include it in your email requesting to be added to the waiting list."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <MouseFollower />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <div ref={heroRef} className="relative w-full py-24 overflow-hidden" style={{ backgroundColor: "#111" }}>
          {/* Background Faces Collage - Fixed visibility */}
          <div className="absolute inset-0 opacity-15">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 h-full">
              {[...Array(32)].map((_, index) => (
                <div key={index} className="bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url('/images/smile-${(index % 8) + 1}.jpg')`,
                    opacity: 0.6
                  }}>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll">
              <span className="inline-block text-sm tracking-wider uppercase text-white mb-4 py-1 px-3 border border-white/10 rounded-full">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Contact Grayscale Realtors for Property Management
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto text-balance">
                Reach out to Grayscale Realtors for all your property management service needs. Whether you prefer email, calls, texts, or chats, we're here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-8">
                  <Link to="#contact-form">
                    Get Free Consultation
                  </Link>
                </Button>
                <div className="text-sm text-white">
                  No credit card required.
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        {/* Quick Contact Info Section */}
        <section className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-morphism rounded-xl p-8 text-center flex flex-col items-center animate-on-scroll">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Call Us</h3>
                <p className="text-white/70 mb-4">Speak directly with our team</p>
                <a href="tel:+2348066429700" className="text-white hover:text-accent transition-colors">
                  +234 806 642 9700
                </a>
              </div>
              
              <div className="glass-morphism rounded-xl p-8 text-center flex flex-col items-center animate-on-scroll">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Email Us</h3>
                <p className="text-white/70 mb-4">Get answers to your queries</p>
                <a href="mailto:sabi@grayscalerealtors.com" className="text-white hover:text-accent transition-colors">
                  sabi@grayscalerealtors.com
                </a>
              </div>
              
              <div className="glass-morphism rounded-xl p-8 text-center flex flex-col items-center animate-on-scroll">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-white">Business Hours</h3>
                <p className="text-white/70 mb-4">We're available for you</p>
                <p className="text-white">Mon-Fri: 9AM-6PM</p>
                <p className="text-white">Sat: 10AM-4PM</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form and FAQ Section */}
        <section className="py-16 bg-background text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="animate-on-scroll" id="contact-form">
                {/* We'll use the existing ContactSection component */}
                <ContactSection />
              </div>
              
              <div className="animate-on-scroll">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
                  <p className="text-white/70">
                    Find answers to common questions about our property management services.
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border border-white/10 rounded-lg px-6 py-2">
                      <AccordionTrigger className="text-left font-medium text-base text-white">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70 pt-2 text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-card/30">
          <div className="max-w-4xl mx-auto px-6 text-center animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Fill out our contact form today to get started with our property management services. Our team is ready to assist you.
            </p>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 px-8">
              <a href="tel:+2348066429700">
                Call Us Now
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
