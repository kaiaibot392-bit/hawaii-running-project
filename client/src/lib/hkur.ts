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

// Fetches the live HKUR results. `cache: "no-store"` ensures the browser
// never serves a stale copy — results are refetched on every page load.
export async function fetchHkurResults(): Promise<HkurResult[]> {
  const res = await fetch("/api/hkur-results", { cache: "no-store" });
  if (!res.ok) throw new Error(`results fetch failed: ${res.status}`);
  const data = (await res.json()) as { results: HkurResult[] };
  return data.results;
}
