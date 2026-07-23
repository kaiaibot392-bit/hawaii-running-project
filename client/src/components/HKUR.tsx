import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Droplets,
  Flag,
  MapPin,
  Medal,
  Mountain,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchHkurResults, waveStartDate, type HkurResult } from "@/lib/hkur";

const REGISTER_URL =
  "https://runsignup.com/Race/HI/Honolulu/HawaiiKaiUltraRunXTreme";

const DISTANCES = [
  "Half Marathon",
  "30K",
  "Marathon",
  "50K",
  "50 Miles",
  "100K",
  "100 Miles",
];

const WAVE_STARTS = [
  "Saturday, July 25 — 6:00 AM",
  "Saturday, July 25 — 7:00 PM",
  "Sunday, July 26 — 6:00 AM",
];

const AID_STATIONS = [
  {
    name: "Aid Station #1 — Start / Finish",
    location: "Kalama Valley Park · 555 Kealahou St.",
  },
  {
    name: "Aid Station #2",
    location: "Kamiloʻiki Community Park · 7750 Hawaii Kai Dr.",
  },
  {
    name: "Aid Station #3",
    location: "Hahaione Neighborhood Park · 663 Pepeekeo St.",
  },
];

const FACTS = [
  {
    icon: CalendarDays,
    label: "Dates",
    value: "July 25 & 26, 2026",
    detail: "Saturday & Sunday, flexible start times",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kalama Valley Park",
    detail: "555 Kealahou St., Hawaii Kai — ~30 min from Waikiki",
  },
  {
    icon: Mountain,
    label: "Course",
    value: "9-mile loop",
    detail: "Includes Heartbreak Hill; aid stations every ~2.5 miles",
  },
  {
    icon: Medal,
    label: "Finishers",
    value: "Medals & certificates",
    detail: "Plus stickers for every registered finisher",
  },
];

const InfoResults = () => {
  const [results, setResults] = useState<HkurResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHkurResults()
      .then(setResults)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <header className="max-w-3xl mb-12">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <Flag className="h-3.5 w-3.5" />
            Live results
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Finishers as they cross the line.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Results are pulled straight from our scoring sheet and refresh every
            time you load this page. Keep an eye on it during race weekend.
          </p>
        </header>

        {error && (
          <div className="py-16 border-y border-border text-center text-destructive">
            Couldn't load results right now. Please try again later.
          </div>
        )}
        {!error && results === null && (
          <div className="py-16 border-y border-border text-center text-muted-foreground">
            Loading results…
          </div>
        )}
        {!error && results && results.length === 0 && (
          <div className="py-16 border-y border-border text-center text-muted-foreground">
            No finishers posted yet. Results will appear here live during the
            race — check back soon.
          </div>
        )}

        {!error && results && results.length > 0 && (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-medium text-foreground">Runner</th>
                  <th className="px-4 py-3 font-medium text-foreground">Distance</th>
                  <th className="px-4 py-3 font-medium text-foreground">Total time</th>
                  <th className="px-4 py-3 font-medium text-foreground hidden sm:table-cell">
                    Start
                  </th>
                  <th className="px-4 py-3 font-medium text-foreground hidden sm:table-cell">
                    Finish
                  </th>
                  <th className="px-4 py-3 font-medium text-foreground hidden md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={`${r.firstName}-${r.lastName}-${i}`}
                    className="border-t border-border"
                  >
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                      {[r.firstName, r.lastName].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {r.distance || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground whitespace-nowrap">
                      {r.totalTime || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                      {r.startTime || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                      {r.endTime || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden md:table-cell">
                      {waveStartDate(r.whichWave) || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

const HKUR = () => {
  return (
    <div>
      {/* Hero / overview */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4">Hawaii Kai Ultra Run · XTreme 2026</p>
              <div className="display-rule mb-8" />
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight">
                Pick a distance. Run the loop. Chase the sunrise — twice.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                A looped ultra through Hawaii Kai over two days, from a half
                marathon all the way to 100 miles. Aid stations every couple of
                miles, one legendary Heartbreak Hill, and a whole lot of aloha.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-sm bg-accent-muted px-3 py-1.5 text-sm font-medium text-accent">
                <Droplets className="h-4 w-4" />
                New for 2026 — HKUR is going cupless. Bring your own bottle.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full gap-2">
                  Register on RunSignup
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Registration opens January 1, 2026.
              </p>
            </div>
          </div>

          {/* Quick facts */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {FACTS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="bg-background p-8">
                  <Icon className="h-5 w-5 text-primary mb-6" />
                  <p className="eyebrow mb-2">{f.label}</p>
                  <p className="font-display text-xl font-semibold text-foreground">
                    {f.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Distances, starts, aid stations */}
      <section className="section-padding bg-muted/40 border-y border-border">
        <div className="section-container grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <Mountain className="h-3.5 w-3.5" />
              Distances
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Seven ways to run it.
            </h2>
            <ul className="space-y-3">
              {DISTANCES.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <Timer className="h-3.5 w-3.5" />
              Start times
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Three waves.
            </h2>
            <ul className="space-y-4">
              {WAVE_STARTS.map((w, i) => (
                <li key={w} className="flex items-start gap-3">
                  <span className="font-display text-lg font-semibold text-primary leading-none">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{w}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Open starts are available too — you just need to begin by noon on
              Sunday, July 26, unless you've arranged otherwise with the race
              director.
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 flex items-center gap-2">
              <Droplets className="h-3.5 w-3.5" />
              Aid stations
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Roughly every 2.5 miles.
            </h2>
            <ul className="space-y-5">
              {AID_STATIONS.map((a) => (
                <li key={a.name}>
                  <p className="font-medium text-foreground">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.location}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Every station has water, electrolytes, snacks, and public
              restrooms.
            </p>
          </div>
        </div>
      </section>

      {/* Shirts / details strip */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">Finisher shirts</p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                Pre-order by July 6.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Finisher shirts are $25 when you pre-order by July 6, 2026. A
                limited supply will be available on race day for $35. All
                registered finishers receive a certificate, a medal, and
                stickers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live results */}
      <InfoResults />
    </div>
  );
};

export default HKUR;
