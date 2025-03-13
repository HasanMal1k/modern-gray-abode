
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  // Intersection Observer to animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturedProperties />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
