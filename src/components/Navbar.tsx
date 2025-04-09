
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import grayscaleLogo from "../../public/images/Grayscale.png"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12",
        isScrolled 
          ? "backdrop-blur-md bg-background/90 shadow-md py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-lg md:text-2xl tracking-tighter flex flex-row justify-center items-center gap-2 md:gap-4">
          <img className="h-9 md:h-14" src={grayscaleLogo} alt="" />
            <div>
              <span className="text-white font-light">GrayScale </span>
              <span className="text-muted-foreground font-bold">Realtors</span>
            </div>
          </h1>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-muted-foreground hover:text-white transition-colors relative group text-sm tracking-wide"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-5 py-2 rounded-md bg-white/10 hover:bg-white/15 text-white text-sm transition-all duration-300 border border-white/10"
          >
            Schedule Viewing
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg transition-all duration-300 ease-in-out overflow-hidden md:hidden",
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block py-2 text-muted-foreground hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block py-2 mt-2 text-center rounded-md bg-white/10 hover:bg-white/15 text-white transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Schedule Viewing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
