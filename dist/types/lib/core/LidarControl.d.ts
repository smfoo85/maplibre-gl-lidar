import { IControl, Map as MapLibreMap } from 'maplibre-gl';
import { LidarControlOptions, LidarState, LidarControlEvent, LidarControlEventHandler, PointCloudInfo, ColorScheme, CopcLoadingMode, ColormapName, ColorRangeConfig, PointCloudFullMetadata, ElevationProfile, CrossSectionLine } from './types';
import { StreamingLoaderOptions } from '../loaders/streaming-types';
import { DeckOverlay } from './DeckOverlay';
import { CrossSectionPanel } from '../gui/CrossSectionPanel';
/**
 * A MapLibre GL control for visualizing and styling LiDAR point clouds.
 *
 * @example
 * ```typescript
 * const lidarControl = new LidarControl({
 *   title: 'LiDAR Viewer',
 *   collapsed: true,
 *   pointSize: 2,
 *   colorScheme: 'elevation',
 * });
 * map.addControl(lidarControl, 'top-right');
 *
 * // Load a point cloud
 * await lidarControl.loadPointCloud('https://example.com/pointcloud.laz');
 * ```
 */
export declare class LidarControl implements IControl {
    private _map?;
    private _mapContainer?;
    private _container?;
    private _panel?;
    private _options;
    private _state;
    private _eventHandlers;
    private _resizeHandler;
    private _mapResizeHandler;
    private _clickOutsideHandler;
    private _userPanelWidth;
    private _userPanelHeight;
    private _panelResizeCleanup;
    private _maxHeightExplicit;
    private _deckOverlay?;
    private _pointCloudManager?;
    private _loader;
    private _panelBuilder?;
    private _tooltip?;
    private _streamingLoaders;
    private _eptStreamingLoaders;
    private _viewportManagers;
    private _copcViewportRequestIds;
    private _eptViewportRequestIds;
    private _eptLastViewport;
    private _manualZOffset;
    private _metadataPanel?;
    private _fullMetadata;
    private _crossSectionTool?;
    private _crossSectionPanel?;
    private _currentProfile;
    /**
     * Creates a new LidarControl instance.
     *
     * @param options - Configuration options for the control
     */
    constructor(options?: Partial<LidarControlOptions>);
    /**
     * Called when the control is added to the map.
     * Implements the IControl interface.
     *
     * @param map - The MapLibre GL map instance
     * @returns The control's container element
     */
    onAdd(map: MapLibreMap): HTMLElement;
    /**
     * Called when the control is removed from the map.
     * Implements the IControl interface.
     */
    onRemove(): void;
    /**
     * Gets the current state of the control.
     *
     * @returns The current LiDAR state
     */
    getState(): LidarState;
    /**
     * Creates a shareable URL that restores URL-loaded point clouds, map camera, and visualization state.
     *
     * @returns Shareable URL
     */
    getShareUrl(): string;
    /**
     * Restores point clouds, map camera, and visualization state from a share URL.
     *
     * @param url - URL to restore from. Defaults to the current browser URL.
     * @returns Loaded point cloud info objects
     */
    restoreFromUrl(url?: string): Promise<PointCloudInfo[]>;
    /**
     * Updates the control state.
     *
     * @param newState - Partial state to merge with current state
     */
    setState(newState: Partial<LidarState>): void;
    /**
     * Toggles the collapsed state of the control panel.
     */
    toggle(): void;
    /**
     * Expands the control panel.
     */
    expand(): void;
    /**
     * Collapses the control panel.
     */
    collapse(): void;
    /**
     * Registers an event handler.
     *
     * @param event - The event type to listen for
     * @param handler - The callback function
     */
    on(event: LidarControlEvent, handler: LidarControlEventHandler): void;
    /**
     * Removes an event handler.
     *
     * @param event - The event type
     * @param handler - The callback function to remove
     */
    off(event: LidarControlEvent, handler: LidarControlEventHandler): void;
    /**
     * Gets the map instance.
     *
     * @returns The MapLibre GL map instance or undefined if not added to a map
     */
    getMap(): MapLibreMap | undefined;
    /**
     * Gets the control container element.
     *
     * @returns The container element or undefined if not added to a map
     */
    getContainer(): HTMLElement | undefined;
    /**
     * Gets the deck.gl overlay instance.
     *
     * @returns The DeckOverlay or undefined if not added to a map
     */
    getDeckOverlay(): DeckOverlay | undefined;
    /**
     * Loads a point cloud from a URL, File, or ArrayBuffer.
     * For COPC files loaded from URL, defaults to dynamic streaming mode.
     * Non-COPC files or local files use full download mode.
     *
     * @param source - URL string, File object, or ArrayBuffer
     * @param options - Optional loading options including loadingMode override
     * @returns Promise resolving to the point cloud info
     */
    loadPointCloud(source: string | File | ArrayBuffer, options?: {
        loadingMode?: CopcLoadingMode;
    }): Promise<PointCloudInfo>;
    /**
     * Unloads a point cloud.
     *
     * @param id - ID of the point cloud to unload (or undefined to unload all)
     */
    unloadPointCloud(id?: string): void;
    /**
     * Loads a point cloud using streaming (on-demand) loading.
     * Ideal for large COPC files - supports both URLs and local files.
     * Points are loaded dynamically based on viewport and zoom level.
     *
     * @param source - URL string, File object, or ArrayBuffer
     * @param options - Optional streaming options
     * @returns Promise resolving to initial point cloud info
     */
    loadPointCloudStreaming(source: string | File | ArrayBuffer, options?: StreamingLoaderOptions): Promise<PointCloudInfo>;
    /**
     * Loads an EPT (Entwine Point Tile) dataset using streaming (on-demand) loading.
     * Points are loaded dynamically based on viewport and zoom level.
     *
     * @param eptUrl - URL to ept.json file
     * @param options - Optional streaming options
     * @returns Promise resolving to initial point cloud info
     */
    loadPointCloudEptStreaming(eptUrl: string, options?: StreamingLoaderOptions): Promise<PointCloudInfo>;
    /**
     * Handles viewport changes for EPT streaming mode.
     *
     * @param viewport - Current viewport information
     * @param datasetId - ID of the EPT dataset
     */
    private _shouldResetEptForViewportChange;
    private _handleViewportChangeForEptStreaming;
    /**
     * Downloads a file from URL and loads it fully.
     * Used as fallback when streaming fails due to CORS.
     */
    private _loadPointCloudFullDownload;
    /**
     * Handles viewport changes for streaming mode.
     * Selects and loads nodes based on current viewport.
     *
     * @param viewport - Current viewport information
     * @param datasetId - ID of the dataset to load nodes for
     */
    private _handleViewportChangeForStreaming;
    /**
     * Stops streaming loading and cleans up resources.
     *
     * @param id - Optional ID of specific streaming dataset to stop. If not provided, stops all.
     */
    stopStreaming(id?: string): void;
    /**
     * Checks if streaming mode is currently active.
     *
     * @param id - Optional ID to check specific dataset. If not provided, checks if any streaming is active.
     * @returns True if streaming is active
     */
    isStreaming(id?: string): boolean;
    /**
     * Gets the current streaming progress.
     *
     * @returns Streaming progress or undefined if not streaming
     */
    getStreamingProgress(): LidarState['streamingProgress'];
    /**
     * Sets the point size.
     *
     * @param size - Point size in pixels
     */
    setPointSize(size: number): void;
    /**
     * Sets the opacity.
     *
     * @param opacity - Opacity value (0-1)
     */
    setOpacity(opacity: number): void;
    /**
     * Sets the color scheme.
     * Automatically switches colormap and resets color range when changing between elevation and intensity.
     *
     * @param scheme - Color scheme to apply
     */
    setColorScheme(scheme: ColorScheme): void;
    /**
     * Sets the colormap for elevation/intensity coloring.
     *
     * @param colormap - The colormap name (e.g., 'viridis', 'plasma', 'turbo')
     */
    setColormap(colormap: ColormapName): void;
    /**
     * Gets the current colormap.
     *
     * @returns The current colormap name
     */
    getColormap(): ColormapName;
    /**
     * Sets the color range configuration.
     *
     * @param config - The color range configuration
     */
    setColorRange(config: ColorRangeConfig): void;
    /**
     * Gets the current color range configuration.
     *
     * @returns The current color range configuration
     */
    getColorRange(): ColorRangeConfig;
    /**
     * Sets whether to use percentile range for elevation/intensity coloring.
     *
     * @param usePercentile - Whether to use percentile range (2-98%)
     */
    setUsePercentile(usePercentile: boolean): void;
    /**
     * Gets whether percentile range is being used for coloring.
     *
     * @returns True if using percentile range
     */
    getUsePercentile(): boolean;
    /**
     * Sets the elevation range filter.
     *
     * @param min - Minimum elevation
     * @param max - Maximum elevation
     */
    setElevationRange(min: number, max: number): void;
    /**
     * Clears the elevation range filter.
     */
    clearElevationRange(): void;
    /**
     * Sets the point budget.
     *
     * @param budget - Maximum number of points to display
     */
    setPointBudget(budget: number): void;
    /**
     * Sets whether points are pickable (enables hover/click interactions).
     *
     * @param pickable - Whether points should be pickable
     */
    setPickable(pickable: boolean): void;
    /**
     * Sets whether Z offset adjustment is enabled.
     *
     * @param enabled - Whether Z offset is enabled
     */
    setZOffsetEnabled(enabled: boolean): void;
    /**
     * Sets the Z offset value for vertical adjustment.
     *
     * @param offset - Z offset in meters
     */
    setZOffset(offset: number): void;
    /**
     * Gets the current Z offset value.
     *
     * @returns Z offset in meters
     */
    getZOffset(): number;
    /**
     * Enables or disables 3D terrain visualization.
     *
     * @param enabled - Whether terrain should be enabled
     */
    setTerrain(enabled: boolean): void;
    /**
     * Gets whether 3D terrain is currently enabled.
     *
     * @returns True if terrain is enabled
     */
    getTerrain(): boolean;
    /**
     * Gets information about loaded point clouds.
     *
     * @returns Array of point cloud info objects
     */
    getPointClouds(): PointCloudInfo[];
    /**
     * Sets the visibility of a point cloud layer.
     *
     * @param id - ID of the point cloud
     * @param visible - Whether the layer should be visible
     */
    setPointCloudVisibility(id: string, visible: boolean): void;
    /**
     * Loads multiple point clouds concurrently.
     *
     * @param items - Array of {url, name} objects to load
     * @param options - Optional loading options
     * @returns Array of PointCloudInfo for loaded clouds
     */
    loadPointClouds(items: Array<{
        url: string;
        name: string;
    }>, options?: {
        loadingMode?: import('./types').CopcLoadingMode;
    }): Promise<PointCloudInfo[]>;
    /**
     * Flies the map to a point cloud's bounds.
     *
     * @param id - ID of the point cloud (or undefined for active/first)
     */
    flyToPointCloud(id?: string): void;
    /**
     * Gets the current map camera state for share URLs.
     */
    private _getShareMapState;
    /**
     * Applies a shared camera state to the map.
     */
    private _applyShareMapState;
    /**
     * Emits an event to all registered handlers.
     *
     * @param event - The event type to emit
     */
    private _emit;
    /**
     * Emits an event with additional data.
     *
     * @param event - The event type to emit
     * @param data - Additional event data
     */
    private _emitWithData;
    /**
     * Updates the computed color bounds based on the current color scheme and range settings.
     * This is used to display accurate min/max values in the colorbar.
     */
    private _updateComputedColorBounds;
    /**
     * Gets the elevation bounds from loaded point clouds.
     */
    private _getElevationBounds;
    /**
     * Gets the intensity bounds from loaded point clouds.
     * Intensity values are typically normalized to 0-1 range.
     */
    private _getIntensityBounds;
    /**
     * Creates the main container element for the control.
     *
     * @returns The container element
     */
    private _createContainer;
    /**
     * Creates the panel element with header and content areas.
     *
     * @returns The panel element
     */
    private _createPanel;
    /**
     * Creates the tooltip element for point picking.
     *
     * @returns The tooltip element
     */
    private _createTooltip;
    /**
     * Formats a GPS time value (GPS Week Seconds) to a readable string.
     */
    private _formatGpsTime;
    /**
     * Formats a value for display in the tooltip.
     */
    private _formatAttributeValue;
    /**
     * Gets the classification name for a code.
     */
    private _getClassificationName;
    /**
     * Checks if an attribute should be shown based on pickInfoFields config.
     */
    private _shouldShowAttribute;
    /**
     * Handles point hover events from the point cloud layer.
     *
     * @param info - Picked point information or null if no point
     */
    private _handlePointHover;
    /**
     * Sets which fields to display in the pick point info panel.
     *
     * @param fields - Array of attribute names to show, or undefined/empty to show all
     */
    setPickInfoFields(fields?: string[]): void;
    /**
     * Gets the current list of fields shown in pick point info.
     */
    getPickInfoFields(): string[] | undefined;
    /**
     * Toggles visibility of a specific classification.
     *
     * @param code - Classification code to toggle
     * @param visible - Whether to show the classification
     */
    private _toggleClassification;
    /**
     * Shows all classifications.
     */
    private _showAllClassifications;
    /**
     * Hides all classifications.
     */
    private _hideAllClassifications;
    /**
     * Sets visibility for a specific classification.
     *
     * @param code - Classification code
     * @param visible - Whether to show the classification
     */
    setClassificationVisibility(code: number, visible: boolean): void;
    /**
     * Gets the set of hidden classification codes.
     *
     * @returns Array of hidden classification codes
     */
    getHiddenClassifications(): number[];
    /**
     * Gets the set of available classification codes in the loaded data.
     *
     * @returns Array of available classification codes
     */
    getAvailableClassifications(): number[];
    /**
     * Shows all classifications (makes all visible).
     */
    showAllClassifications(): void;
    /**
     * Hides all classifications.
     */
    hideAllClassifications(): void;
    /**
     * Setup event listeners for panel positioning and click-outside behavior.
     */
    private _setupEventListeners;
    /**
     * Detect which corner the control is positioned in.
     *
     * @returns The position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
     */
    private _getControlPosition;
    /**
     * Update the panel position based on button location and control corner.
     * Positions the panel next to the button, expanding in the appropriate direction.
     */
    private _updatePanelPosition;
    /** Minimum panel width when resizing (px). */
    private static readonly MIN_PANEL_WIDTH;
    /** Minimum panel height when resizing (px). */
    private static readonly MIN_PANEL_HEIGHT;
    /**
     * Adds drag handles in the panel's bottom-left and bottom-right corners.
     * Pointer drags resize the panel and the chosen size is kept (in
     * {@link _userPanelWidth}/{@link _userPanelHeight}) so repositioning does
     * not reset it.
     *
     * @param panel - The panel element to attach handles to
     */
    private _addResizeHandles;
    /**
     * Starts a pointer-driven resize from one of the bottom-corner handles.
     *
     * The panel is first frozen to explicit left/top pixels (clearing any
     * right/bottom anchor) so the opposite edge stays put no matter which
     * corner the control sits in. The right handle then grows the panel
     * rightward, the left handle leftward; both grow it downward. Sizes are
     * clamped to a sensible minimum and to the map container, and the chosen
     * size is stored in {@link _userPanelWidth}/{@link _userPanelHeight} so
     * {@link _updatePanelPosition} reapplies it on later repositioning.
     *
     * @param event - The pointerdown event
     * @param side - Which corner handle started the drag
     * @param panel - The panel element being resized
     * @param handle - The handle element (for pointer capture)
     */
    private _beginResize;
    /**
     * Applies a color theme by toggling a class on the document root. Using the
     * root element (rather than the control) ensures panels and modals appended
     * to <body> inherit the same theme variables. `'auto'` removes the override
     * classes so the CSS `prefers-color-scheme` media query takes effect.
     *
     * @param theme - The theme to apply
     */
    private _applyTheme;
    /**
     * Sets the color theme of the control at runtime.
     *
     * @param theme - `'auto'` (follow OS), `'light'`, or `'dark'`
     */
    setTheme(theme: 'auto' | 'light' | 'dark'): void;
    /**
     * Returns the currently configured theme.
     */
    getTheme(): 'auto' | 'light' | 'dark';
    /**
     * Gets the full metadata for a point cloud.
     *
     * @param id - Point cloud ID. If not provided, returns metadata for the active point cloud.
     * @returns Full metadata or undefined if not available
     */
    getFullMetadata(id?: string): PointCloudFullMetadata | undefined;
    /**
     * Shows the metadata panel for a point cloud.
     *
     * @param id - Point cloud ID. If not provided, shows metadata for the active point cloud.
     */
    showMetadataPanel(id?: string): void;
    /**
     * Hides the metadata panel.
     */
    hideMetadataPanel(): void;
    /**
     * Builds full metadata for a point cloud.
     *
     * @param id - Point cloud ID
     * @returns Full metadata or undefined
     */
    private _buildFullMetadata;
    /**
     * Enables cross-section drawing mode.
     */
    enableCrossSection(): void;
    /**
     * Disables cross-section drawing mode.
     */
    disableCrossSection(): void;
    /**
     * Checks if cross-section mode is enabled.
     *
     * @returns True if enabled
     */
    isCrossSectionEnabled(): boolean;
    /**
     * Gets the current cross-section elevation profile.
     *
     * @returns Elevation profile or null if not available
     */
    getCrossSectionProfile(): ElevationProfile | null;
    /**
     * Sets the cross-section buffer distance.
     *
     * @param meters - Buffer distance in meters
     */
    setCrossSectionBufferDistance(meters: number): void;
    /**
     * Gets the current cross-section buffer distance.
     *
     * @returns Buffer distance in meters
     */
    getCrossSectionBufferDistance(): number;
    /**
     * Clears the current cross-section.
     */
    clearCrossSection(): void;
    /**
     * Gets the current cross-section line.
     *
     * @returns Cross-section line or null
     */
    getCrossSectionLine(): CrossSectionLine | null;
    /**
     * Handles cross-section line changes.
     *
     * @param line - New line or null if cleared
     */
    private _handleCrossSectionLineChange;
    /**
     * Extracts elevation profile for the current cross-section line.
     *
     * @param line - Cross-section line
     */
    private _extractElevationProfile;
    /**
     * Gets the cross-section panel for adding to the UI.
     * Creates the panel if it doesn't exist.
     *
     * @returns CrossSectionPanel instance
     */
    getCrossSectionPanel(): CrossSectionPanel;
    getPanelElement(): HTMLElement | null;
}
//# sourceMappingURL=LidarControl.d.ts.map