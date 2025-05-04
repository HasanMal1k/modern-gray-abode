
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Building, Award, Landmark, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import MouseFollower from "@/components/MouseFollower";

const valueData = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Integrity",
    description: "We conduct our business with the highest ethical standards, ensuring transparency and honesty in all our dealings."
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Professionalism",
    description: "Our team of experts brings a wealth of knowledge and professionalism to every interaction, providing top-notch service to our clients."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Personalized Service",
    description: "We believe in a personalized approach, understanding that each client has unique needs and preferences."
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Local Expertise",
    description: "With deep roots in the Nigerian market, particularly in Lagos, we leverage our local knowledge to deliver the best results for our clients."
  }
];

const teamData = [
  {
    name: "Wale Aroloye",
    position: "Head~ Business/Client Relations",
    image: "../../public/images/Wale.jpg",
    bio: "Wale leads our business and client relations with over a decade of experience, ensuring seamless communication and lasting partnerships."
  },
  {
    name:"Bunmi Olaniyan",
    position:"HR and corporate strategist",
    image:"../../public/images/teammember.jpg",
    bio:" Bunmi Olaniyan brings a wealth of expertise from global giants like Deloitte and Pernod Ricard. Her sharp insights into talent optimization and business growth will help steer GrayScale Realtors toward greater innovation and client excellence."
 },
  {
    name: "Kolone Kargbo",
    position: "Sales and Marketing",
    image: "../../public/images/Kolone.jpg",
    bio: "Kolone drives sales and marketing with a sharp eye for strategy and a passion for connecting clients with their ideal properties."
  },
  {
    name: "Ayeloja Abdulwakil",
    position: "I.T",
    image: "../../public/images/Ayeloja.jpg",
    bio: "Ayeloja oversees our IT infrastructure, ensuring seamless digital operations and implementing tech solutions that enhance client experience."
  },
  {
    name: "Omotola Edeviwe",
    position: "Sales and Marketing",
    image: "../../public/images/Omotola.jpg",
    bio: "Omotola excels in sales and marketing, bringing creativity and strategic insight that amplify our brand and attract the right clientele."
  },
  {
    name: "Anayo Agbo Esq.",
    position: "Head of Legal",
    image: "../../public/images/Anayo.jpg",
    bio: "Anayo leads our legal department with precision and integrity, safeguarding all transactions and ensuring regulatory compliance at every step."
  },
 
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
      <MouseFollower />
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-6 relative bg-gradient-to-b from-background to-gray-900">
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-6 py-1 px-3 border border-white/10 rounded-full">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Premier Property Management<br />Firm in Lagos</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl mb-12">
              Built on trust, relationships and a passion to deliver world-class property management services
            </p>
            
            {/* Image Collage - Updated with African-focused images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-5xl mx-auto mt-12 mb-8">
              <div className="aspect-square overflow-hidden rounded-lg col-span-2 row-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1496947850313-7743325fa58c?q=80&w=2070&auto=format&fit=crop"
                  alt="African family at home" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="../../public/images/jakub-zerdzicki-sQMNLkUJi-g-unsplash.jpg"
                  alt="Nigerian business meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="../../public/images/nupo-deyon-daniel-67ruAEYmp4c-unsplash.jpg"
                  alt="Lagos skyline" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="../../public/images/trust-tru-katsande-sc5TYeefOTI-unsplash.jpg"
                  alt="Young African professionals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="../../public/images/todd-kent-178j8tJrNlc-unsplash.jpg"
                  alt="African neighborhood" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Link 
                to="/contact"
                onClick={() => {
                  sessionStorage.setItem('scrollToContactForm', 'true');
                }}
                className="px-8 py-3 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 text-sm"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
        
        {/* Welcome Section */}
        <section id="welcome" className={`py-20 px-6 bg-white text-black animate-section ${visibleElements.has("welcome") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Welcome to Gray Scale REALTORS (G.S.R.)</h2>
              <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
              <p className="text-gray-700 text-lg max-w-4xl mx-auto">
                At Gray Scale REALTORS, we are proud of our 360-degree real estate experience. With over 200 successful sales and placements, we understand that finding the perfect tenant for your home is just as crucial as the investment itself. Our mission is to bridge the gap between landlords and tenants in Nigeria by providing a seamless, professional, and personalized property management experience that matches our exceptional sales record.
              </p>
            </div>
          </div>
        </section>
        
        {/* Who We Are Section */}
        <section id="who-we-are" className={`py-24 px-6 animate-section ${visibleElements.has("who-we-are") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-sm tracking-wider uppercase text-white/70 mb-4 py-1 px-3 border border-white/10 rounded-full">
                  Our Identity
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
                <p className="text-muted-foreground mb-6">
                  Founded on the principles of integrity, expertise, and dedication, G.S.R. is a premier property management firm based in Lagos. Our name, Gray Scale, symbolizes our commitment to navigating the complexities of the Nigerian real estate market, where nothing is simply black and white. We embrace the nuances and challenges, delivering tailored solutions that meet each client's unique needs.
                </p>
                <div className="mt-10 space-y-8">
                  <div className="glass-morphism rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To provide exceptional property management services that ensure peace of mind for landlords and a pleasant living experience for tenants. We aim to create lasting relationships built on trust, reliability, and mutual respect.
                    </p>
                  </div>
                  <div className="glass-morphism rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be Nigeria's leading property management firm, known for our local expertise, personalized service, and unwavering commitment to excellence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-xl glass-morphism">
                  <img 
                    src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop" 
                    alt="Lagos skyline" 
                    className="w-full h-full object-cover filter"
                  />
                  <div className="image-shimmer"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 neo-blur rounded-xl w-64">
                  <p className="text-sm text-white/80 italic">
                    "Creating perfect matches between properties and people in Nigeria's vibrant real estate market."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section id="values" className={`py-24 px-6 bg-white text-black animate-section ${visibleElements.has("values") ? "animate-slide-up" : "opacity-0"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-sm tracking-wider uppercase text-gray-600 mb-4 py-1 px-3 border border-gray-200 rounded-full">
                Guiding Principles
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Core Values</h2>
              <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
              <p className="text-gray-700 max-w-2xl mx-auto">
                These principles define our approach to every client relationship and property transaction.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueData.map((value, index) => (
                <div key={index} className="bg-gray-50 shadow-md rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] border border-gray-100">
                  <div className="bg-accent/10 text-accent rounded-full w-12 h-12 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Exceptional professionals dedicated to providing unparalleled real estate experiences in Lagos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.map((member, index) => (
                <div key={index} className="glass-morphism rounded-xl overflow-hidden group">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                Work With Our Team
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
