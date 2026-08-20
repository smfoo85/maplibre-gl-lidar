/**
 * Detects a likely CRS from raw header bounding-box values.
 *
 * Returns the EPSG string (e.g. "EPSG:29874") when the bounds fall inside a
 * known projected coordinate range, or `null` when no match is found.
 *
 * This is a last-resort heuristic for files that carry no embedded WKT.
 * It runs only when `fallbackCrs` is not set.
 */
export declare function detectCrsFromBounds(minX: number, minY: number, maxX: number, maxY: number): string | null;
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
export declare function resolveCrs(crs: string): Promise<((coord: [number, number]) => [number, number]) | null>;
//# sourceMappingURL=crs.d.ts.map