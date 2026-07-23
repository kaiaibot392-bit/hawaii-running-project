import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hrp_k_banuet.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.22em] uppercase text-white/70 mb-6">
            Est. Honolulu · A running club for every pace
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.02] tracking-tight">
            Run the islands.
            <br />
            <span className="text-white/70">Together.</span>
          </h1>
          <p className="mt-8 text-lg text-white/85 max-w-xl leading-relaxed">
            Hawaii Running Project is a community of runners across Oʻahu —
            from first-timers to ultra athletes. Free group runs four nights a
            week, coaching, and races throughout the year.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/schedule">
              <Button size="lg" className="gap-2">
                This week's runs
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/join">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/40 hover:bg-white hover:text-primary"
              >
                Become a member
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15 border border-white/15">
          <Stat label="Years running" value="12" />
          <Stat label="Weekly runs" value="4" />
          <Stat label="Oʻahu routes" value="Multiple" />
          <Stat label="Price" value="Free" />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-black/30 backdrop-blur-sm px-6 py-5">
    <p className="text-xs tracking-[0.18em] uppercase text-white/60">{label}</p>
    <p className="mt-1 font-display text-2xl font-semibold text-white">
      {value}
    </p>
  </div>
);

export default Hero;
