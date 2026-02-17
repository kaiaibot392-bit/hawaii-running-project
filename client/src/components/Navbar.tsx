import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Workout Schedule", href: "/schedule" },
    { name: "Store", href: "/store" },
    { name: "Coaching & PT", href: "/coaching" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Donate", href: "/donate" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
              <img 
                src="https://hawaiirunningproject.wordpress.com/wp-content/uploads/2025/01/cropped-cropped-hrp-transparent.png" 
                alt="Hawaii Running Project Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gradient-ocean">
                Hawaii Running Project
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Healthy Communities & Running Club
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 text-foreground hover:text-secondary transition-colors duration-300 font-medium whitespace-nowrap text-sm"
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="ml-2 btn-ocean"
              onClick={() => navigate('/join')}
              size="sm"
            >
              Join
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-large">
            <div className="px-6 py-4 space-y-4">
                            {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-foreground hover:text-green-700 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                className="btn-ocean w-full mt-4"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/join');
                }}
              >
                Join Our Community
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;