import { CustomLayerAdapter, LayerState } from 'maplibre-gl-layer-control';
import { LidarControl } from '../core/LidarControl';
/**
 * Adapter for integrating LiDAR point cloud layers with maplibre-gl-layer-control.
 *
 * This adapter allows LiDAR point clouds to appear in the layer control panel,
 * enabling visibility toggles and opacity sliders for each loaded point cloud.
 *
 * @example
 * ```typescript
 * import { LidarControl, LidarLayerAdapter } from 'maplibre-gl-lidar';
 * import { LayerControl } from 'maplibre-gl-layer-control';
 *
 * const lidarControl = new LidarControl({ ... });
 * map.addControl(lidarControl, 'top-right');
 *
 * // Create adapter after adding lidar control
 * const lidarAdapter = new LidarLayerAdapter(lidarControl);
 *
 * // Add layer control with the adapter
 * const layerControl = new LayerControl({
 *   customLayerAdapters: [lidarAdapter],
 * });
 * map.addControl(layerControl, 'top-left');
 * ```
 */
export declare class LidarLayerAdapter implements CustomLayerAdapter {
    readonly type = "lidar";
    private _lidarControl;
    private _changeCallbacks;
    private _unsubscribe?;
    /**
     * Creates a new LidarLayerAdapter.
     *
     * @param lidarControl - The LidarControl instance to adapt
     */
    constructor(lidarControl: LidarControl);
    /**
     * Sets up event listeners on the LidarControl to detect layer changes.
     */
    private _setupEventListeners;
    /**
     * Gets all layer IDs managed by this adapter.
     *
     * @returns Array of point cloud layer IDs
     */
    getLayerIds(): string[];
    /**
     * Gets the current state of a layer.
     *
     * @param layerId - Point cloud ID
     * @returns LayerState or null if not found
     */
    getLayerState(layerId: string): LayerState | null;
    /**
     * Sets layer visibility.
     *
     * @param layerId - Point cloud ID
     * @param visible - Whether the layer should be visible
     */
    setVisibility(layerId: string, visible: boolean): void;
    /**
     * Sets layer opacity.
     *
     * @param layerId - Point cloud ID
     * @param opacity - Opacity value (0-1)
     */
    setOpacity(layerId: string, opacity: number): void;
    /**
     * Gets display name for a layer.
     *
     * @param layerId - Point cloud ID
     * @returns Display name for the layer
     */
    getName(layerId: string): string;
    /**
     * Gets layer symbol type for UI display.
     *
     * @param _layerId - Point cloud ID (unused)
     * @returns Symbol type string
     */
    getSymbolType(_layerId: string): string;
    /**
     * Removes a layer from the map by unloading the point cloud.
     *
     * @param layerId - Point cloud ID to remove
     */
    removeLayer(layerId: string): void;
    /**
     * Subscribes to layer changes (add/remove).
     *
     * @param callback - Function to call when layers are added or removed
     * @returns Unsubscribe function
     */
    onLayerChange(callback: (event: 'add' | 'remove', layerId: string) => void): () => void;
    /**
     * Notifies subscribers that a layer was added.
     *
     * @param layerId - ID of the added layer
     */
    private _notifyLayerAdded;
    /**
     * Notifies subscribers that a layer was removed.
     * Currently unused as unload events don't provide specific layer IDs.
     *
     * @param layerId - ID of the removed layer
     */
    notifyLayerRemoved(layerId: string): void;
    /**
     * Cleans up event listeners.
     */
    destroy(): void;
}
//# sourceMappingURL=LidarLayerAdapter.d.ts.map