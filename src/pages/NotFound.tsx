
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <MouseFollower />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-16">
          <div className="glass-morphism p-12 rounded-lg text-center max-w-md">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Oops! We couldn't find the page you're looking for.
            </p>
            <Link to="/" className="block">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
