import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORES = [
  {
    name: "HRP Store",
    tagline: "Official club merch",
    description:
      "Running gear, apparel, and accessories. Every purchase funds our programs and keeps the club free and open to everyone.",
    href: "https://runsignup.com/Club/Store/HI/Honolulu/HawaiiRunningProject",
    cta: "Shop HRP",
  },
  {
    name: "HKUR Store",
    tagline: "Hawaii Kai Ultra Run",
    description:
      "Commemorate one of Hawaii's most challenging and scenic ultras with exclusive HKUR merchandise.",
    href: "https://runsignup.com/Race/Store/HI/Honolulu/HawaiiKaiUltraRunXTreme",
    cta: "Shop HKUR",
  },
];

const Store = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Store</p>
            <div className="display-rule mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Gear with a purpose.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a 501(c)(3) nonprofit. Every purchase goes directly to
              training, events, coaching, and community programs across
              Hawaiʻi. Mahalo for your support.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 border border-border">
          {STORES.map((store, idx) => (
            <div
              key={store.name}
              className={`p-10 lg:p-14 flex flex-col ${
                idx === 0 ? "border-b md:border-b-0 md:border-r border-border" : ""
              }`}
            >
              <p className="eyebrow mb-4">{store.tagline}</p>
              <h3 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                {store.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-10 flex-1">
                {store.description}
              </p>
              <a href={store.href} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  {store.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Store;
