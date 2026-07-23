import { Dumbbell, HeartPulse, Target, Trophy } from "lucide-react";

const PILLARS = [
  {
    icon: HeartPulse,
    title: "Run · Fitness · Nutrition",
    description:
      "Accessible training, wellness education, and real advice for every level.",
  },
  {
    icon: Dumbbell,
    title: "Coaching",
    description:
      "Personalized coaching, form work, and strength guidance from certified pros.",
  },
  {
    icon: Target,
    title: "Weekly Runs",
    description:
      "Group runs four nights a week across the island. Every pace welcome.",
  },
  {
    icon: Trophy,
    title: "Races & Events",
    description:
      "Community events and races throughout the year — from keiki fun runs to marathons.",
  },
];

const PROGRAMS = [
  "Community run clubs",
  "Public events and races",
  "Corporate running programs",
  "Programs for overweight and obese residents",
  "Programs for unhoused residents",
  "Programs for those recovering from substance abuse",
  "Keiki programs",
  "Women's programs",
  "Programs for people with physical challenges",
  "Single-parent programs",
  "Ex-offender programs",
  "Programs for overworked two-income families",
];

const BOARD = [
  { name: "Kawika Carlson", role: "Founder" },
  { name: "Weni Amrich", role: "Chair" },
  { name: "Peter Hill", role: "Vice-Chair" },
  { name: "Moana Wong", role: "Secretary" },
  { name: "Tim Ferber", role: "Treasurer" },
  { name: "Seth August", role: "Past Chair" },
];

const About = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">About</p>
            <div className="display-rule mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              A running club on a public-health mission.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-2">
            <p className="text-xl text-foreground leading-relaxed">
              The Hawaii Running Project is an ambitious, one-of-a-kind
              nonprofit working to address many of Hawaiʻi's health and social
              problems through the simple act of running together.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We run four nights a week across Oʻahu — all paces, all ages, all
              abilities. Our programs reach into schools, workplaces, and
              communities that traditional fitness services miss. Everything we
              do is free.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-y border-border">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`p-8 lg:p-10 border-border ${
                  idx < PILLARS.length - 1
                    ? "border-b md:border-b-0 md:border-r last:border-r-0"
                    : ""
                }`}
              >
                <Icon className="h-5 w-5 text-primary mb-6" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border my-24">
          <div className="bg-background p-10 lg:p-14">
            <p className="eyebrow mb-4">Mission</p>
            <p className="font-display text-2xl lg:text-3xl text-foreground leading-snug">
              Improve overall health in the State of Hawaiʻi and reduce obesity
              of its residents by creating running programs that are available
              to everyone.
            </p>
          </div>
          <div className="bg-background p-10 lg:p-14">
            <p className="eyebrow mb-4">Vision</p>
            <p className="font-display text-2xl lg:text-3xl text-foreground leading-snug">
              Community-service running programs that meet the health and
              wellness needs of every resident, regardless of circumstance.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Programs</p>
            <h3 className="font-display text-3xl font-semibold text-foreground leading-tight">
              Running, reaching everyone.
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We design specialized programs to serve communities that aren't
              always welcomed by traditional fitness culture.
            </p>
          </div>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-4 lg:pt-4">
            {PROGRAMS.map((program) => (
              <li
                key={program}
                className="flex items-start gap-3 text-foreground border-t border-border pt-4"
              >
                <span className="h-px w-4 bg-primary mt-3 flex-shrink-0" />
                <span>{program}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-16 border-t border-border">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Leadership</p>
              <h3 className="font-display text-3xl font-semibold text-foreground leading-tight">
                Board &amp; Committee
              </h3>
            </div>
            <p className="lg:col-span-8 text-muted-foreground leading-relaxed lg:pt-4">
              Our board and committee give direction to the Hawaii Running
              Project by voicing the community, identifying needs, and setting
              priorities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {BOARD.map((m) => (
              <div key={m.name} className="bg-background p-8">
                <p className="font-display text-lg font-semibold text-foreground">
                  {m.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
