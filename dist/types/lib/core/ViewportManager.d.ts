import { Map as MapLibreMap } from 'maplibre-gl';
import { ViewportInfo } from '../loaders/streaming-types';
/**
 * Options for the ViewportManager
 */
export interface ViewportManagerOptions {
    /**
     * Debounce time for viewport changes in ms
     * @default 150
     */
    debounceMs?: number;
    /**
     * Minimum zoom level to start loading high-detail nodes
     * @default 10
     */
    minDetailZoom?: number;
    /**
     * Maximum octree depth to load
     * @default 20
     */
    maxOctreeDepth?: number;
    /**
     * Octree spacing value from COPC file (for more accurate depth calculation)
     */
    spacing?: number;
}
/**
 * Manages viewport state and triggers node loading based on map view changes.
 * Listens to MapLibre GL map events and calculates the appropriate octree
 * depth for the current zoom level and pitch.
 */
export declare class ViewportManager {
    private _map;
    private _debounceMs;
    private _onViewportChange;
    private _debouncedHandler;
    private _isActive;
    private _minDetailZoom;
    private _maxOctreeDepth;
    private _spacing;
    /**
     * Creates a new ViewportManager instance.
     *
     * @param map - MapLibre GL map instance
     * @param onViewportChange - Callback fired when viewport changes
     * @param options - Configuration options
     */
    constructor(map: MapLibreMap, onViewportChange: (viewport: ViewportInfo) => void, options?: ViewportManagerOptions);
    /**
     * Starts listening to map viewport changes.
     */
    start(): void;
    /**
     * Stops listening to map viewport changes.
     */
    stop(): void;
    /**
     * Gets the current viewport information.
     *
     * @returns ViewportInfo object with bounds, center, zoom, pitch, and targetDepth
     */
    getCurrentViewport(): ViewportInfo;
    /**
     * Calculates target octree depth based on zoom level and pitch.
     *
     * Mapping strategy:
     * - Zoom 0-10: depth 0-2 (overview)
     * - Zoom 10-14: depth 2-6 (city level)
     * - Zoom 14-18: depth 6-12 (block level)
     * - Zoom 18+: depth 12+ (detail level)
     *
     * Pitch adjustment: higher pitch (3D view) reduces depth to avoid
     * loading too many nodes in the distance.
     *
     * @param zoom - Current map zoom level
     * @param pitch - Current map pitch in degrees
     * @returns Target octree depth
     */
    private _calculateTargetDepth;
    /**
     * Handles viewport change events.
     */
    private _handleViewportChange;
    /**
     * Forces a viewport update (e.g., after initial data load or fly animation).
     */
    forceUpdate(): void;
    /**
     * Updates the spacing value used for depth calculation.
     *
     * @param spacing - Octree spacing from COPC file
     */
    setSpacing(spacing: number): void;
    /**
     * Checks if the viewport manager is currently active.
     *
     * @returns True if listening for viewport changes
     */
    isActive(): boolean;
    /**
     * Destroys the viewport manager and removes all event listeners.
     */
    destroy(): void;
}
//# sourceMappingURL=ViewportManager.d.ts.map