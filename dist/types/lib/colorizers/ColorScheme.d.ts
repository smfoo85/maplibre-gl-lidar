import { PointCloudData } from '../loaders/types';
import { ColorScheme, ColormapName, ColorRangeConfig } from '../core/types';
import { ClassificationColorMap } from './types';
/**
 * ASPRS LAS classification standard colors
 */
export declare const CLASSIFICATION_COLORS: ClassificationColorMap;
/**
 * Options for color generation
 */
export interface ColorOptions {
    /** Whether to use percentile range (2-98%) for elevation/intensity coloring (deprecated) */
    usePercentile?: boolean;
    /** Colormap to use for elevation/intensity coloring */
    colormap?: ColormapName;
    /** Configuration for color range mapping */
    colorRange?: ColorRangeConfig;
    /** Set of classification codes to hide (set alpha to 0) */
    hiddenClassifications?: Set<number>;
}
/**
 * Result of color processing including computed bounds
 */
export interface ColorResult {
    /** The color array */
    colors: Uint8Array;
    /** The computed bounds used for coloring */
    bounds?: {
        min: number;
        max: number;
    };
}
/**
 * Processes point cloud data into color arrays based on color scheme.
 */
export declare class ColorSchemeProcessor {
    /** Last computed color bounds (for colorbar display) */
    private _lastComputedBounds?;
    /**
     * Generates a color array for the point cloud based on the color scheme.
     *
     * @param data - Point cloud data
     * @param scheme - Color scheme to apply
     * @param options - Optional color generation options
     * @returns Uint8Array of RGBA colors (length = pointCount * 4)
     */
    getColors(data: PointCloudData, scheme: ColorScheme, options?: ColorOptions): Uint8Array;
    /**
     * Generates a color array and returns the computed bounds.
     *
     * @param data - Point cloud data
     * @param scheme - Color scheme to apply
     * @param options - Optional color generation options
     * @returns ColorResult containing colors and computed bounds
     */
    getColorsWithBounds(data: PointCloudData, scheme: ColorScheme, options?: ColorOptions): ColorResult;
    /**
     * Gets the last computed color bounds (for colorbar display).
     *
     * @returns The last computed bounds or undefined
     */
    getLastComputedBounds(): {
        min: number;
        max: number;
    } | undefined;
    /**
     * Computes the color bounds based on the configuration.
     *
     * @param values - Array of values to compute bounds for
     * @param dataBounds - Data bounds (min/max)
     * @param colorRange - Color range configuration
     * @param usePercentile - Legacy percentile flag
     * @returns Computed min and max bounds
     */
    private _computeBounds;
    /**
     * Colors points by elevation using the specified colormap.
     *
     * @param data - Point cloud data
     * @param colors - Output color array
     * @param colormap - Colormap name to use
     * @param colorRange - Color range configuration
     * @param usePercentile - Legacy percentile flag
     * @returns ColorResult with colors and computed bounds
     */
    private _colorByElevation;
    /**
     * Colors points by intensity using the specified colormap.
     *
     * @param data - Point cloud data
     * @param colors - Output color array
     * @param colormap - Colormap name to use
     * @param colorRange - Color range configuration
     * @param usePercentile - Legacy percentile flag
     * @returns ColorResult with colors and computed bounds
     */
    private _colorByIntensity;
    /**
     * Colors points by classification using ASPRS standard colors.
     *
     * @param data - Point cloud data
     * @param colors - Output color array
     * @param hiddenClassifications - Optional set of classification codes to hide (alpha=0)
     * @returns Color array
     */
    private _colorByClassification;
    /**
     * Uses embedded RGB colors from the point cloud.
     *
     * @param data - Point cloud data
     * @param colors - Output color array
     * @returns Color array
     */
    private _colorByRGB;
    /**
     * Applies a custom color scheme configuration.
     *
     * @param data - Point cloud data
     * @param colors - Output color array
     * @param _config - Custom color scheme config
     * @param colormap - Colormap name to use
     * @param colorRange - Color range configuration
     * @param usePercentile - Legacy percentile flag
     * @returns Color array
     */
    private _colorByCustom;
    /**
     * Interpolates a color from a color ramp.
     *
     * @param ramp - Color ramp array
     * @param t - Interpolation parameter (0-1)
     * @returns Interpolated RGB color
     */
    private _interpolateRamp;
}
/**
 * Gets the name of a classification code.
 */
export declare function getClassificationName(code: number): string;
/**
 * Extracts the set of unique classification codes present in the point cloud data.
 *
 * @param data - Point cloud data
 * @returns Set of classification codes found in the data
 */
export declare function getAvailableClassifications(data: PointCloudData): Set<number>;
//# sourceMappingURL=ColorScheme.d.ts.map