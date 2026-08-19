import proj4 from 'proj4';

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
