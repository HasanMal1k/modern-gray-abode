import { Link } from "react-router-dom";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Linkedin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter">
            <span className="text-white">GrayScale</span>
            <span className="text-muted-foreground">Realtors</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Premium properties crafted for discerning individuals. We connect extraordinary homes with extraordinary people.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://www.instagram.com/grayscalerealtors?igsh=ZGlyOHRmYmZ4NWlj" className="text-muted-foreground hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/in/gray-scale-realtors-122a93322" className="text-muted-foreground hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://x.com/GSRealtorsNaija?t=G9eJovXr0zdFnvRv77DXZQ&s=08" className="text-muted-foreground hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              <img src="/images/tik-tok.svg" alt="TikTok" className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100076065139029&mibextid=ZbWKwL" className="text-muted-foreground hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-white tracking-wider uppercase">Navigation</h3>
          <ul className="space-y-2">
            {['Home', 'Properties', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>{item}</span>
                  <ArrowRight className="ml-1 w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-white tracking-wider uppercase">Properties</h3>
          <ul className="space-y-2">
            {['Luxury Homes', 'Penthouses', 'Apartments', 'Villas', 'Commercial'].map((item) => (
              <li key={item}>
                <Link 
                  to="/properties"
                  className="text-muted-foreground hover:text-white transition-colors text-sm flex items-center group"
                >
                  <span>{item}</span>
                  <ArrowRight className="ml-1 w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-white tracking-wider uppercase">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start text-sm">
              <MapPin className="mr-3 w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">1/5 Owel-Linkso Road, Lekki Penninsula II, Lekki</span>
            </li>
            <li className="flex items-center text-sm">
              <Phone className="mr-3 w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">+2348066429700</span>
            </li>
            <li className="flex items-center text-sm">
              <Mail className="mr-3 w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">sabi@grayscalerealtors.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GrayScale Realtors. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;