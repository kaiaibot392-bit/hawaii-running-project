import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Schedule", href: "/schedule" },
  { name: "HKUR", href: "/hkur" },
  { name: "Coaching", href: "/coaching" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Store", href: "/store" },
  { name: "Donate", href: "/donate" },
];

const LOGO_URL = "/hrp-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Hawaii Running Project"
              className="h-8 w-8 object-contain"
            />
            <span className="font-display text-base font-semibold tracking-tight text-foreground">
              Hawaii Running Project
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button
              onClick={() => navigate("/join")}
              size="sm"
              className="ml-2"
            >
              Join
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-border py-6 space-y-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "block py-3 text-base font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button
              className="w-full mt-4"
              onClick={() => navigate("/join")}
            >
              Join
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
