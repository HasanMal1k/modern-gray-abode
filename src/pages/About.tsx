
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Building, Award, Landmark, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const valueData = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Client-Centered Approach",
    description: "We place your needs and aspirations at the heart of everything we do, tailoring our services to your unique vision."
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Architectural Excellence",
    description: "We celebrate and champion properties that exemplify exceptional design, craftsmanship, and innovation."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Integrity & Transparency",
    description: "We operate with unwavering honesty, ensuring every transaction and interaction is conducted with complete clarity."
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Market Expertise",
    description: "Our deep understanding of luxury real estate markets allows us to provide unparalleled insights and guidance."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Exclusive Access",
    description: "Our network grants you access to premier properties, many of which never reach the public market."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Investment Vision",
    description: "We help you see beyond today, identifying properties with exceptional long-term value and potential."
  }
];

const milestoneData = [
  {
    year: "2005",
    title: "Founded in Los Angeles",
    description: "EstateNoir was established with a vision to redefine luxury real estate services."
  },
  {
    year: "2010",
    title: "Expanded to New York",
    description: "Opened our second office in Manhattan to serve the East Coast luxury market."
  },
  {
    year: "2013",
    title: "International Network",
    description: "Formed strategic partnerships with premium agencies across Europe and Asia."
  },
  {
    year: "2017",
    title: "Digital Transformation",
    description: "Pioneered immersive virtual property tours and AI-driven property matching."
  },
  {
    year: "2020",
    title: "Sustainability Initiative",
    description: "Launched our commitment to promoting eco-conscious luxury properties."
  },
  {
    year: "2023",
    title: "Portfolio Milestone",
    description: "Surpassed $10 billion in total property transactions across global markets."
  }
];

const teamData = [
  {
    name: "Alexandra Reynolds",
    position: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    bio: "With over 20 years in luxury real estate, Alexandra founded EstateNoir with a vision to elevate the property experience for discerning clients."
  },
  {
    name: "Marcus Chen",
    position: "Chief Design Officer",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop",
    bio: "A renowned architect turned real estate visionary, Marcus ensures every property in our portfolio meets exceptional design standards."
  },
  {
    name: "Sophia Daniels",
    position: "Head of Client Relations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    bio: "Sophia's background in hospitality shapes our signature concierge approach, ensuring clients receive personalized attention at every step."
  },
  {
    name: "Jonathan Pierce",
    position: "Investment Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    bio: "With expertise in global finance, Jonathan provides strategic investment guidance for clients building property portfolios."
  }
];

const About = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-section').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-section').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-6 py-1 px-3 border border-white/10 rounded-full">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Our Story & Vision</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-12">
              EstateNoir was founded on the belief that finding your ideal property should be an extraordinary experience—one that combines expertise, personalization, and a deep appreciation for architectural excellence.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/contact"
                className="px-8 py-3 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 text-sm"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section id="mission" className={`py-24 px-6 animate-section ${visibleElements.has("mission") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                  Our Philosophy
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission & Approach</h2>
                <p className="text-muted-foreground mb-6">
                  At EstateNoir, we've reimagined the real estate experience. We don't simply match clients with properties—we connect individuals with spaces that resonate with their aspirations, lifestyle, and aesthetic sensibilities.
                </p>
                <p className="text-muted-foreground mb-8">
                  Our approach is built on three foundational principles: uncompromising quality in every property we represent, personalized service that anticipates your needs, and a commitment to architectural integrity that celebrates design excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="glass-morphism rounded-lg px-6 py-4 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">18+</h3>
                    <p className="text-muted-foreground text-sm">Years of Excellence</p>
                  </div>
                  <div className="glass-morphism rounded-lg px-6 py-4 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">2500+</h3>
                    <p className="text-muted-foreground text-sm">Properties Sold</p>
                  </div>
                  <div className="glass-morphism rounded-lg px-6 py-4 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
                    <p className="text-muted-foreground text-sm">Client Satisfaction</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-xl glass-morphism">
                  <img 
                    src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop" 
                    alt="Our mission" 
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div className="image-shimmer"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 neo-blur rounded-xl w-64">
                  <p className="text-sm text-white/80 italic">
                    "We don't just sell properties; we curate living experiences that inspire."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section id="values" className={`py-24 px-6 animate-section ${visibleElements.has("values") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                Guiding Principles
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles define our approach to every client relationship and property transaction.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valueData.map((value, index) => (
                <div key={index} className="glass-morphism rounded-xl p-8 transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mb-6 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Journey / Timeline */}
        <section id="journey" className={`py-24 px-6 animate-section ${visibleElements.has("journey") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                Our History
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The EstateNoir Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From our founding vision to our current position as leaders in luxury real estate.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:translate-x-[-0.5px]"></div>
              
              {/* Timeline Events */}
              <div className="space-y-12">
                {milestoneData.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-background border-2 border-white/20 rounded-full transform translate-x-[-14px] md:translate-x-[-14px] flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className="glass-morphism rounded-xl p-6">
                        <span className="inline-block text-sm font-medium bg-white/10 px-3 py-1 rounded-full mb-4">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-medium mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section id="team" className={`py-24 px-6 animate-section ${visibleElements.has("team") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                Our Experts
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Leadership Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Exceptional professionals dedicated to providing unparalleled real estate experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamData.map((member, index) => (
                <div key={index} className="glass-morphism rounded-xl overflow-hidden group">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover filter grayscale transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="image-shimmer"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                      <p className="text-white/70 text-sm">{member.position}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link 
                to="/contact"
                className="px-8 py-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-white text-sm"
              >
                Connect With Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
