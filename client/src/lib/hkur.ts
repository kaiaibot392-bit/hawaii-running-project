export type HkurResult = {
  firstName: string;
  lastName: string;
  distance: string;
  startTime: string;
  endTime: string;
  totalTime: string;
  waveStart: string;
  whichWave: string;
};

// The sheet has no date column — the race day is encoded in the wave a runner
// chose. Waves: 6am Sat & 7pm Sat (July 25), 6am Sun (July 26). Derive a
// readable date from that. Values without an explicit day (e.g. "6 am start")
// default to Saturday, the race's opening day.
export function waveStartDate(whichWave: string): string {
  const w = whichWave.toLowerCase();
  if (w.includes("sun")) return "Sun, Jul 26";
  if (w.includes("sat")) return "Sat, Jul 25";
  if (/\d\s*(am|pm)/.test(w)) return "Sat, Jul 25";
  return "";
}

// Fetches the live HKUR results. `cache: "no-store"` ensures the browser
// never serves a stale copy — results are refetched on every page load.
export async function fetchHkurResults(): Promise<HkurResult[]> {
  const res = await fetch("/api/hkur-results", { cache: "no-store" });
  if (!res.ok) throw new Error(`results fetch failed: ${res.status}`);
  const data = (await res.json()) as { results: HkurResult[] };
  return data.results;
}
