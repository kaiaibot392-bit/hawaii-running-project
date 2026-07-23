import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Partner = {
  eyebrow: string;
  name: string;
  person: string;
  credentials: string;
  role: string;
  paragraphs: string[];
  image: string;
  href: string;
  domain: string;
};

const PARTNERS: Partner[] = [
  {
    eyebrow: "Coaching Partner",
    name: "Run Akamai",
    person: "Coach Naomi Morita",
    credentials: "HRP Training &amp; Coaching Leader",
    role: "Personal Run Coaching",
    paragraphs: [
      "Other coaches tell you what to do; I work with each runner to figure out their unique and personal how — proper form, more speed or distance, or injury prevention.",
      "Running enhances life in different ways as we journey through it. My job is to help you find the fun, beauty and power in the sport, and meet you wherever you are on that path.",
      "Every coaching plan includes a dynamic race-prep structure and unlimited access via text or email between sessions.",
    ],
    image: "/coach-naomi.png",
    href: "https://runakamai.com",
    domain: "runakamai.com",
  },
  {
    eyebrow: "Physical Therapy",
    name: "Enphysio Health",
    person: "Dr. Tanner Crass",
    credentials: "PT, DPT, CSCS, FAFS",
    role: "2025 HRP Vice-Chair · Columbia DPT ’16",
    paragraphs: [
      "Tanner is one of the island's best physical therapists and a speedy runner himself. Many HRP runners have seen him for their aches and come back to better health and better form.",
      "Tanner specializes in Manual Therapy and Applied Functional Science across orthopedics, sports, vestibular, and geriatrics — getting patients moving again with precision and care.",
      "Outside of the clinic, he's an avid runner, golfer, weightlifter, and a proud new father.",
    ],
    image: "/dr-tanner.png",
    href: "https://enphysiohealth.com",
    domain: "enphysiohealth.com",
  },
];

const Coaching = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Coaching &amp; PT</p>
            <div className="display-rule mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Expert guidance for every stride.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Take your running further with personalized coaching and
              evidence-based physical therapy from HRP's trusted partners.
              Both are deeply involved in the club and understand our runners
              firsthand.
            </p>
          </div>
        </div>

        <div className="space-y-24">
          {PARTNERS.map((partner, idx) => (
            <article
              key={partner.name}
              className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            >
              <div
                className={`lg:col-span-5 ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.person}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-display text-xl font-semibold text-foreground">
                    {partner.person}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {partner.credentials}
                  </p>
                  <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground mt-3">
                    {partner.role}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="eyebrow mb-4">{partner.eyebrow}</p>
                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-8">
                  {partner.name}
                </h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  {partner.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-block"
                >
                  <Button className="gap-2">
                    Visit {partner.domain}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coaching;
