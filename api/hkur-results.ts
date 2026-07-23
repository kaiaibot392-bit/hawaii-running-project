import type { IncomingMessage, ServerResponse } from 'http';

// Public "Results" tab of the HKUR 2026 scoring spreadsheet.
// gid=0 is the volunteer-instructions tab; the actual finisher table lives here.
const SHEET_ID = '1bWGErP4yhSlm4Y0iSoqH6WLR_DLfZAQzKTDEjTDQ8Eg';
const RESULTS_GID = '191008730';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${RESULTS_GID}`;

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

// Minimal RFC-4180-ish CSV parser: handles quoted fields, escaped quotes ("")
// and both \n and \r\n line breaks. Returns a matrix of rows/cells.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  // flush trailing field/row
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const norm = (s: string) => s.trim().toLowerCase();

// Locate the header row by looking for the expected column labels. The sheet
// begins with instructional text, so the real table can start anywhere.
function findHeader(rows: string[][]): { index: number; map: Record<string, number> } | null {
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].map(norm);
    const find = (re: RegExp) => cells.findIndex((c) => re.test(c));
    const map: Record<string, number> = {
      firstName: find(/first/),
      lastName: find(/last/),
      distance: find(/distance/),
      startTime: find(/^start|start time/),
      endTime: find(/^end|end time|finish/),
      totalTime: find(/total|elapsed/),
      whichWave: find(/which wave/),
      waveStart: find(/^wave|wave start/),
    };

    // Require the labels to live in *distinct* columns, not all crammed into
    // one instructional sentence like "...First Name Last Name". A genuine
    // header has several recognized labels spread across separate cells.
    const cols = Object.values(map).filter((idx) => idx >= 0);
    const distinctCols = new Set(cols);
    const nameHeader =
      map.firstName >= 0 && map.lastName >= 0 && map.firstName !== map.lastName;
    const distanceHeader =
      map.distance >= 0 && map.totalTime >= 0 && map.distance !== map.totalTime;

    if ((nameHeader || distanceHeader) && distinctCols.size >= 4) {
      return { index: i, map };
    }
  }
  return null;
}

export function parseResults(csv: string): HkurResult[] {
  const rows = parseCsv(csv);
  const header = findHeader(rows);
  if (!header) return [];

  const { index, map } = header;
  const at = (cells: string[], key: keyof HkurResult) => {
    const idx = map[key];
    return idx >= 0 ? (cells[idx] ?? '').trim() : '';
  };

  const out: HkurResult[] = [];
  for (let i = index + 1; i < rows.length; i++) {
    const cells = rows[i];
    const result: HkurResult = {
      firstName: at(cells, 'firstName'),
      lastName: at(cells, 'lastName'),
      distance: at(cells, 'distance'),
      startTime: at(cells, 'startTime'),
      endTime: at(cells, 'endTime'),
      totalTime: at(cells, 'totalTime'),
      waveStart: at(cells, 'waveStart'),
      whichWave: at(cells, 'whichWave'),
    };
    // Skip empty/placeholder rows — require at least a name or a distance.
    if (!result.firstName && !result.lastName && !result.distance) continue;
    out.push(result);
  }
  return out;
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const upstream = await fetch(CSV_URL, {
      headers: { 'User-Agent': 'hawaii-running-project' },
    });
    if (!upstream.ok) {
      throw new Error(`sheet fetch failed: ${upstream.status}`);
    }
    const csv = await upstream.text();
    const results = parseResults(csv);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // Always fresh: results are updated live during the race.
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.statusCode = 200;
    res.end(JSON.stringify({ results, updatedAt: new Date().toISOString() }));
  } catch (err) {
    console.error('hkur-results api error', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        error: 'Failed to fetch results',
        message: err instanceof Error ? err.message : String(err),
      })
    );
  }
}
