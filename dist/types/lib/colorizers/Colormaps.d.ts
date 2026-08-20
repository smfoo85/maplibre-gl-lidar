import { ColorRamp } from './types';
/**
 * Available colormap names (matplotlib-style)
 */
export type ColormapName = 'viridis' | 'plasma' | 'inferno' | 'magma' | 'cividis' | 'turbo' | 'jet' | 'rainbow' | 'terrain' | 'coolwarm' | 'gray';
/**
 * All available colormaps
 */
export declare const COLORMAPS: Record<ColormapName, ColorRamp>;
/**
 * List of all available colormap names
 */
export declare const COLORMAP_NAMES: ColormapName[];
/**
 * Human-readable display names for colormaps
 */
export declare const COLORMAP_LABELS: Record<ColormapName, string>;
/**
 * Gets a colormap by name.
 *
 * @param name - The colormap name
 * @returns The color ramp array
 */
export declare function getColormap(name: ColormapName): ColorRamp;
//# sourceMappingURL=Colormaps.d.ts.map