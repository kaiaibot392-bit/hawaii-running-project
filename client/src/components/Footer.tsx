import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Events", href: "#events" },
    { name: "Join Us", href: "#join" },
    { name: "Contact", href: "#contact" }
  ];

  const programs = [
    "Community Run Clubs",
    "School Programs", 
    "Corporate Wellness",
    "Specialized Support"
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/HawaiiRunningProject?ref=embed_page", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                <img 
                  src="https://hawaiirunningproject.wordpress.com/wp-content/uploads/2025/01/cropped-cropped-hrp-transparent.png" 
                  alt="Hawaii Running Project Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Hawaii Running Project
                </h3>
                <p className="text-sm text-background/70">
                  Healthy Communities & Running Club
                </p>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed mb-6">
              Building healthier communities across Hawaii through accessible running programs, 
              wellness education, and the spirit of aloha.
            </p>
            <Button className="btn-sunset">
              Join Our Community
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-background/80 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-6">
              Our Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program}>
                  <span className="text-background/80">
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-6">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-background/80">
                    Multiple Locations Across<br />
                    Hawaiian Islands
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-background/80">(808) 555-ALOHA</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-background/80">HawaiiRunningProject@gmail.com</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-background/80 hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm text-center md:text-left">
              © 2026 Hawaii Running Project. All rights reserved. Made with ❤️ in Hawaii.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;