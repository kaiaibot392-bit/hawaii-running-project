import { Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const LOGO_URL =
  "https://hawaiirunningproject.wordpress.com/wp-content/uploads/2025/01/cropped-cropped-hrp-transparent.png";

const NAV_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { name: "About", href: "/about" },
      { name: "Schedule", href: "/schedule" },
      { name: "Coaching", href: "/coaching" },
    ],
  },
  {
    heading: "Engage",
    links: [
      { name: "Join", href: "/join" },
      { name: "Sponsors", href: "/sponsors" },
      { name: "Store", href: "/store" },
      { name: "Donate", href: "/donate" },
    ],
  },
];

const SOCIAL = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/HawaiiRunningProject?ref=embed_page",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/hawaiirunningproject",
    label: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src={LOGO_URL}
                alt="Hawaii Running Project"
                className="h-10 w-10 object-contain bg-primary-foreground/10 rounded-sm p-1"
              />
              <span className="font-display text-lg font-semibold">
                Hawaii Running Project
              </span>
            </Link>
            <p className="text-primary-foreground/70 max-w-sm leading-relaxed">
              A nonprofit building healthier communities across the Hawaiian
              islands — one run at a time.
            </p>
          </div>

          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <h4 className="eyebrow text-primary-foreground/60 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h4 className="eyebrow text-primary-foreground/60 mb-5">Contact</h4>
            <a
              href="mailto:hawaiirunningproject@gmail.com"
              className="group flex items-start gap-3 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-70 group-hover:opacity-100" />
              <span>hawaiirunningproject@gmail.com</span>
            </a>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="h-9 w-9 inline-flex items-center justify-center border border-primary-foreground/20 rounded-sm hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Hawaii Running Project. 501(c)(3)
            nonprofit. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/60 tracking-[0.14em] uppercase">
            Made in Hawai‘i
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
