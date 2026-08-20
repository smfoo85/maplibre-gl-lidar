import { DeckOverlay } from '../core/DeckOverlay';
import { PointCloudData } from '../loaders/types';
import { ColorScheme, PointCloudBounds, ColormapName, ColorRangeConfig } from '../core/types';
import { PointCloudLayerOptions, PickedPointInfo } from './types';
/**
 * Manages deck.gl PointCloudLayer instances for visualization.
 */
export declare class PointCloudManager {
    private _deckOverlay;
    private _pointClouds;
    private _options;
    private _colorProcessor;
    private _lastComputedBounds?;
    constructor(deckOverlay: DeckOverlay, options?: Partial<PointCloudLayerOptions>);
    /**
     * Sets the hover callback.
     *
     * @param callback - Function called when a point is hovered
     */
    setOnHover(callback: ((info: PickedPointInfo | null) => void) | undefined): void;
    /**
     * Adds a point cloud to the visualization.
     *
     * @param id - Unique identifier for the point cloud
     * @param data - Point cloud data (positions are already offsets from coordinateOrigin)
     */
    addPointCloud(id: string, data: PointCloudData): void;
    /**
     * Updates an existing point cloud with new data.
     * Used for streaming/incremental loading where points are added over time.
     *
     * @param id - Unique identifier for the point cloud
     * @param data - Updated point cloud data
     */
    updatePointCloud(id: string, data: PointCloudData): void;
    /**
     * Gets the current point count for a point cloud.
     *
     * @param id - Point cloud ID
     * @returns Point count or 0 if not found
     */
    getPointCount(id: string): number;
    /**
     * Removes a point cloud from the visualization.
     *
     * @param id - ID of the point cloud to remove
     */
    removePointCloud(id: string): void;
    /**
     * Checks if a point cloud exists.
     *
     * @param id - Point cloud ID
     * @returns True if exists
     */
    hasPointCloud(id: string): boolean;
    /**
     * Gets all point cloud IDs.
     *
     * @returns Array of point cloud IDs
     */
    getPointCloudIds(): string[];
    /**
     * Gets the bounds of a point cloud.
     *
     * @param id - Point cloud ID
     * @returns Bounds or undefined if not found
     */
    getPointCloudBounds(id: string): PointCloudBounds | undefined;
    /**
     * Updates styling options for all point clouds.
     *
     * @param options - New style options
     */
    updateStyle(options: Partial<PointCloudLayerOptions>): void;
    /**
     * Sets the point size.
     *
     * @param size - Point size in pixels
     */
    setPointSize(size: number): void;
    /**
     * Sets the global opacity for all point clouds.
     * This also clears any per-layer opacity overrides so the global value takes effect.
     *
     * @param opacity - Opacity value (0-1)
     */
    setOpacity(opacity: number): void;
    /**
     * Sets the color scheme.
     *
     * @param scheme - Color scheme to apply
     */
    setColorScheme(scheme: ColorScheme): void;
    /**
     * Sets whether to use percentile range for elevation/intensity coloring.
     *
     * @param usePercentile - Whether to use percentile range (2-98%)
     */
    setUsePercentile(usePercentile: boolean): void;
    /**
     * Sets the colormap for elevation/intensity coloring.
     *
     * @param colormap - Colormap name
     */
    setColormap(colormap: ColormapName): void;
    /**
     * Sets the color range configuration.
     *
     * @param colorRange - Color range configuration
     */
    setColorRange(colorRange: ColorRangeConfig): void;
    /**
     * Sets the elevation range filter.
     *
     * @param range - [min, max] elevation or null to disable
     */
    setElevationRange(range: [number, number] | null): void;
    /**
     * Sets whether points are pickable (enables hover/click interactions).
     *
     * @param pickable - Whether points should be pickable
     */
    setPickable(pickable: boolean): void;
    /**
     * Sets the Z offset for vertical adjustment.
     *
     * @param offset - Z offset in meters
     */
    setZOffset(offset: number): void;
    /**
     * Sets the hidden classifications for filtering.
     *
     * @param hidden - Set of classification codes to hide
     */
    setHiddenClassifications(hidden: Set<number>): void;
    /**
     * Sets visibility for a specific point cloud.
     *
     * @param id - Point cloud ID
     * @param visible - Whether the point cloud should be visible
     */
    setPointCloudVisibility(id: string, visible: boolean): void;
    /**
     * Gets visibility for a specific point cloud.
     *
     * @param id - Point cloud ID
     * @returns Whether the point cloud is visible, or undefined if not found
     */
    getPointCloudVisibility(id: string): boolean | undefined;
    /**
     * Sets opacity for a specific point cloud.
     *
     * @param id - Point cloud ID
     * @param opacity - Opacity value (0-1), or null to use global opacity
     */
    setPointCloudOpacity(id: string, opacity: number | null): void;
    /**
     * Gets opacity for a specific point cloud.
     *
     * @param id - Point cloud ID
     * @returns Opacity value (0-1), or undefined if not found
     */
    getPointCloudOpacity(id: string): number | undefined;
    /**
     * Clears all point clouds.
     */
    clear(): void;
    /**
     * Gets the current options.
     */
    getOptions(): PointCloudLayerOptions;
    /**
     * Gets the last computed color bounds.
     * Used for displaying accurate colorbar min/max values.
     */
    getLastComputedBounds(): {
        min: number;
        max: number;
    } | undefined;
    /**
     * Gets merged point cloud data from all loaded point clouds.
     * Used for cross-section profile extraction.
     *
     * @returns Merged point cloud data or null if no data loaded
     */
    getMergedPointCloudData(): PointCloudData | null;
    /**
     * Creates a deck.gl layer for a point cloud.
     * Chunks large point clouds into multiple layers to avoid WebGL buffer limits.
     * Uses coordinateOrigin + LNGLAT_OFFSETS to maintain Float32 precision.
     * Applies elevation filter if set.
     */
    private _createLayer;
    /**
     * Updates all layers with current options.
     */
    private _updateAllLayers;
}
//# sourceMappingURL=PointCloudManager.d.ts.map