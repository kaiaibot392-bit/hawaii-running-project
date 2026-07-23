import { ArrowUpRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const DONATE_URL =
  "https://runsignup.com/Club/Donate/HI/Honolulu/HawaiiRunningProject";

const Donate = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Donate</p>
            <div className="display-rule mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Keep the club running.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              HRP is a 501(c)(3) nonprofit. Every dollar goes directly to
              training, coaching, events, and programs that keep running
              accessible to everyone in Hawaiʻi — and your donation is
              tax-deductible.
            </p>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block"
            >
              <Button size="lg" className="gap-2">
                Donate now
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-16 border-t border-border">
          <div className="lg:col-span-5">
            <div className="bg-primary text-primary-foreground p-10 lg:p-14 aspect-square flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-primary-foreground/60 mb-4">
                  Member of
                </p>
                <p className="font-display text-5xl lg:text-6xl font-semibold leading-none">
                  RRCA
                </p>
                <p className="mt-3 text-primary-foreground/80">
                  Road Runners Club of America
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <span className="text-sm">
                  501(c)(3) · Tax-deductible
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed lg:pt-2">
            <p>
              Hawaii Running Project is officially a member of the Road Runners
              Club of America — the oldest and largest national association of
              runners and running organizations, championing community-based
              running since 1958.
            </p>
            <p>
              Our RRCA membership provides group 501(c)(3) nonprofit tax-exempt
              status with the IRS. That means donations to HRP are{" "}
              <span className="text-foreground font-medium">
                tax-deductible
              </span>
              , and 100% of every contribution funds activities that benefit
              HRP members and the Hawaiʻi running community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
