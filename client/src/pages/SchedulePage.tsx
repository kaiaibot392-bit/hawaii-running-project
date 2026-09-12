import { useSearchParams } from "react-router-dom";
import { CalendarDays, Mail, Rows3 } from "lucide-react";
import WeekView from "@/components/schedule/WeekView";
import MonthView from "@/components/schedule/MonthView";

const TABS = [
  { id: "week", label: "This week", icon: Rows3 },
  { id: "month", label: "Month", icon: CalendarDays },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SchedulePage = () => {
  // ?view=month keeps the calendar linkable and survives a refresh.
  const [params, setParams] = useSearchParams();
  const view: TabId = params.get("view") === "month" ? "month" : "week";

  const select = (id: TabId) => {
    if (id === "week") params.delete("view");
    else params.set("view", id);
    setParams(params, { replace: true });
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="section-container">
          <header className="max-w-3xl mb-12">
            <p className="eyebrow mb-4">Schedule</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              {view === "week" ? "This week's runs." : "What's ahead."}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our calendar updates live. All runs are free and open to everyone —
              show up, lace up, and we'll see you out there.
            </p>
          </header>

          <div
            role="tablist"
            aria-label="Schedule view"
            className="inline-flex border border-border mb-12"
          >
            {TABS.map((tab) => {
              const active = tab.id === view;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => select(tab.id)}
                  className={[
                    "flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors",
                    "border-r border-border last:border-r-0",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  ].join(" ")}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {view === "week" ? <WeekView /> : <MonthView />}

          <div className="mt-20 pt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="eyebrow mb-2">Questions</p>
              <p className="text-foreground text-lg">
                New to running? Returning after a break? Reach out — we've got you.
              </p>
            </div>
            <a
              href="mailto:hawaiirunningproject@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              hawaiirunningproject@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
