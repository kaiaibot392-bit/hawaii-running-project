import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIERS = [
  {
    name: "Pathfinder",
    price: "Free",
    priceNote:
      "Volunteer at two of our races or events in exchange for membership.",
    benefits: [
      "Unlimited group workouts",
      "Access to coaching",
      "A welcoming community of runners",
    ],
    cta: "Start your journey",
  },
  {
    name: "Pace Setter",
    price: "$30",
    benefits: [
      "Everything in Pathfinder",
      "HRP T-shirt",
      "Half off Hawaii Kai Ultra",
    ],
    cta: "Pick up speed",
    featured: true,
  },
  {
    name: "Shaka Sprinter",
    price: "$100",
    benefits: [
      "Everything in Pace Setter",
      "Champion our mission",
      "Half off annual banquet",
    ],
    cta: "Lead the pack",
  },
];

const SIGNUP_URL =
  "https://runsignup.com/Club/HI/Honolulu/HawaiiRunningProject";

const JoinUs = () => {
  return (
    <section className="section-padding bg-muted/40">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Membership</p>
            <div className="display-rule mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Become a member.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Running with us is always free. Membership funds our training,
              events, coaching, and community programs — and gets you some
              perks along the way.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border border-border bg-background">
          {TIERS.map((tier, idx) => (
            <div
              key={tier.name}
              className={`p-8 lg:p-10 flex flex-col ${
                idx < TIERS.length - 1
                  ? "border-b md:border-b-0 md:border-r border-border"
                  : ""
              } ${tier.featured ? "bg-primary text-primary-foreground" : ""}`}
            >
              <div
                className={`eyebrow mb-4 ${
                  tier.featured
                    ? "text-primary-foreground/70"
                    : ""
                }`}
              >
                {tier.name}
              </div>
              <div className="mb-6">
                <span className="font-display text-5xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                {tier.priceNote && (
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      tier.featured
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tier.priceNote}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        tier.featured
                          ? "text-primary-foreground"
                          : "text-primary"
                      }`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  className={`w-full gap-2 ${
                    tier.featured
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : ""
                  }`}
                >
                  {tier.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="eyebrow mb-2">Ready to commit?</p>
            <p className="text-foreground text-lg">
              Sign our membership form &amp; waiver to get started.
            </p>
          </div>
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              Sign up
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
