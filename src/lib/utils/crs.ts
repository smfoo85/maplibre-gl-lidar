import proj4 from 'proj4';

// ---------------------------------------------------------------------------
// Statically-bundled definitions for CRS codes that may be absent or
// unreliable on epsg.io. These are registered once at module load time so
// they are available synchronously — no network request needed.
// ---------------------------------------------------------------------------

// EPSG:29874 — GDM2000 / East Malaysia BRSO (Borneo RSO)
// Commonly used for LiDAR surveys in Sabah & Sarawak, Malaysia.
proj4.defs(
  'EPSG:29874',
  '+proj=omerc +no_uoff +lat_0=4 +lonc=115 +alpha=53.3158204722222' +
  ' +gamma=53.1301023611111 +k=0.99984 +x_0=2000000 +y_0=5000000' +
  ' +ellps=evrstSS +towgs84=-679,669,-48,0,0,0,0 +units=m +no_defs +type=crs',
);

// EPSG:2180 — ETRS89 / Poland CS92
proj4.defs(
  'EPSG:2180',
  '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000' +
  ' +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);

// ---------------------------------------------------------------------------
// Coordinate-range heuristics
// Each entry defines the expected X/Y bounding box for a known projected CRS.
// A file whose raw header bounds fall inside the box (with some tolerance) is
// assumed to be in that CRS.  Entries are tested in order; the first match
// wins.  Keep entries as tight as possible to avoid false positives.
// ---------------------------------------------------------------------------

interface CrsHint {
  epsg: string;
  label: string;
  minX: number; maxX: number;
  minY: number; maxY: number;
}

const CRS_HINTS: CrsHint[] = [
  {
    // GDM2000 / East Malaysia BRSO (Borneo RSO)
    // False origin: E=2,000,000  N=5,000,000
    // Covers Sabah, Sarawak and Brunei
    epsg: 'EPSG:29874',
    label: 'GDM2000 / East Malaysia BRSO',
    minX: 1_400_000, maxX: 2_700_000,
    minY: 4_600_000, maxY: 5_600_000,
  },
  {
    // ETRS89 / Poland CS92
    // False origin: E=500,000  N=−5,300,000
    epsg: 'EPSG:2180',
    label: 'ETRS89 / Poland CS92',
    minX: 170_000,  maxX: 860_000,
    minY: 140_000,  maxY: 780_000,
  },
];

/**
 * Detects a likely CRS from raw header bounding-box values.
 *
 * Returns the EPSG string (e.g. "EPSG:29874") when the bounds fall inside a
 * known projected coordinate range, or `null` when no match is found.
 *
 * This is a last-resort heuristic for files that carry no embedded WKT.
 * It runs only when `fallbackCrs` is not set.
 */
export function detectCrsFromBounds(
  minX: number, minY: number,
  maxX: number, maxY: number,
): string | null {
  for (const hint of CRS_HINTS) {
    if (
      minX >= hint.minX && maxX <= hint.maxX &&
      minY >= hint.minY && maxY <= hint.maxY
    ) {
      console.info(`[CRS] Bounds match ${hint.epsg} (${hint.label}) — applying auto-detection`);
      return hint.epsg;
    }
  }
  return null;
}

// Cache for fetched proj4 definitions to avoid duplicate network requests
const _defCache = new Map<string, string>();

/**
 * Normalises a CRS identifier to a canonical form.
 * Returns { kind, code } where kind is 'epsg' | 'proj4' | 'wkt'.
 */
function parseCrsString(crs: string): { kind: 'epsg'; code: number } | { kind: 'proj4' | 'wkt'; raw: string } {
  const trimmed = crs.trim();
  const epsgMatch = trimmed.match(/^(?:EPSG|epsg):(\d+)$/);
  if (epsgMatch) return { kind: 'epsg', code: parseInt(epsgMatch[1], 10) };
  if (trimmed.startsWith('+proj=') || trimmed.startsWith('+init=')) return { kind: 'proj4', raw: trimmed };
  return { kind: 'wkt', raw: trimmed };
}

/**
 * Resolves a CRS string to a proj4 forward-transform function (source → WGS84).
 *
 * Accepts:
 *   - `"EPSG:29874"` – fetches the proj4 definition from epsg.io if not already registered
 *   - `"+proj=omerc …"` – used directly as a proj4 definition string
 *   - A WKT string – passed directly to proj4
 *
 * Returns null when the CRS cannot be resolved (logs a warning).
 */
export async function resolveCrs(
  crs: string
): Promise<((coord: [number, number]) => [number, number]) | null> {
  const parsed = parseCrsString(crs);

  if (parsed.kind === 'epsg') {
    const epsgKey = `EPSG:${parsed.code}`;

    // Check if proj4 already has this definition
    try {
      const converter = proj4(epsgKey, 'EPSG:4326');
      return (coord) => converter.forward(coord) as [number, number];
    } catch {
      // Not registered yet — fetch and register
    }

    // Try to fetch from epsg.io
    try {
      let def = _defCache.get(epsgKey);
      if (!def) {
        const response = await fetch(`https://epsg.io/${parsed.code}.proj4`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        def = (await response.text()).trim();
        if (!def || !def.startsWith('+')) throw new Error('Unexpected response');
        _defCache.set(epsgKey, def);
      }
      proj4.defs(epsgKey, def);
      const converter = proj4(epsgKey, 'EPSG:4326');
      return (coord) => converter.forward(coord) as [number, number];
    } catch (e) {
      console.warn(`[CRS] Could not resolve ${epsgKey}:`, e);
      return null;
    }
  }

  // proj4 string or WKT — try directly
  try {
    const converter = proj4(parsed.raw, 'EPSG:4326');
    return (coord) => converter.forward(coord) as [number, number];
  } catch (e) {
    console.warn('[CRS] Could not parse CRS string:', e);
    return null;
  }
}
