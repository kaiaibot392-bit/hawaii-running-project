import Hero from "@/components/Hero";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Calendar,
  HeartHandshake,
  Mountain,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const HIGHLIGHTS = [
  {
    title: "Schedule",
    description:
      "Four weekly group runs across Oʻahu. Every pace, every level, always free.",
    icon: Calendar,
    link: "/schedule",
    cta: "See the week",
  },
  {
    title: "Membership",
    description:
      "Three tiers from free to supporter. Run with us, or help fund the club.",
    icon: Users,
    link: "/join",
    cta: "Join the club",
  },
  {
    title: "Coaching",
    description:
      "Personal coaching and physical therapy from our trusted partners.",
    icon: HeartHandshake,
    link: "/coaching",
    cta: "Work with a coach",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      <Link
        to="/hkur"
        className="group block bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <div className="section-container px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-primary-foreground/70">
            <Mountain className="h-4 w-4" />
            July 25–26, 2026
          </span>
          <p className="font-display text-lg md:text-xl font-semibold leading-tight flex-1">
            The Hawaii Kai Ultra Run is back — from half marathon to 100 miles.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            Race details & live results
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>

      <UpcomingEvent />

      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">Get started</p>
              <div className="display-rule mb-8" />
              <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                However you run, there's a place for you here.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hawaii Running Project is a 501(c)(3) nonprofit with four weekly
                runs, a full calendar of races, and free programs across the
                island. Start wherever you are.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <Link
                  key={h.title}
                  to={h.link}
                  className="group bg-background p-10 lg:p-12 flex flex-col transition-colors hover:bg-muted/40"
                >
                  <Icon className="h-6 w-6 text-primary mb-10" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    {h.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-10 flex-1">
                    {h.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {h.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs tracking-[0.22em] uppercase text-primary-foreground/60 mb-6">
                Our mission
              </p>
              <p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Improve overall health in the State of Hawaiʻi by making
                running free, social, and available to everyone.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary gap-2"
                >
                  More about HRP
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
