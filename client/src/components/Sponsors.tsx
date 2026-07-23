import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Sponsor = {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  cta: string;
};

const SPONSORS: Sponsor[] = [
  {
    name: "HOKA",
    subtitle: "Ala Moana · Official Footwear Partner",
    description:
      "HRP members get free shipping, 60-day returns, and exclusive access to HOKA run club events in Ala Moana.",
    image: "/hoka.png",
    link: "https://www.hoka.com",
    cta: "Join HOKA Fly",
  },
  {
    name: "Queen Kapiolani Hotel",
    subtitle: "Waikiki · Hospitality Partner",
    description:
      "Authentic Hawaiian hospitality in the heart of Waikiki, with special packages for the HRP running community.",
    image: "/queen-kapiolani-hotel.png",
    link: "https://www.queenkapiolani.com/packages.htm",
    cta: "View packages",
  },
];

const Sponsors = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Sponsors</p>
            <div className="display-rule mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Partners who back the club.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our sponsors make the free programs, weekly runs, and races
              possible. They also bring real perks to HRP members — discounts,
              early access, and experiences on and off the road.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {SPONSORS.map((sponsor) => (
            <article
              key={sponsor.name}
              className="bg-card border border-border flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <p className="eyebrow mb-3">{sponsor.subtitle}</p>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                  {sponsor.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                  {sponsor.description}
                </p>
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    {sponsor.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-border max-w-2xl">
          <p className="eyebrow mb-4">Partner with us</p>
          <p className="text-foreground text-lg leading-relaxed">
            Interested in sponsoring HRP? Reach out — we'd love to talk about
            ways to support Hawaiʻi's running community together.
          </p>
          <a
            href="mailto:hawaiirunningproject@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            hawaiirunningproject@gmail.com
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
