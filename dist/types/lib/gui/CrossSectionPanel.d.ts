import { ElevationProfile, ColormapName } from '../core/types';
/**
 * Callbacks for CrossSectionPanel interactions
 */
export interface CrossSectionPanelCallbacks {
    /** Called when draw mode is toggled */
    onDrawToggle: (enabled: boolean) => void;
    /** Called when clear button is clicked */
    onClear: () => void;
    /** Called when buffer distance changes */
    onBufferDistanceChange: (meters: number) => void;
}
/**
 * Options for CrossSectionPanel
 */
export interface CrossSectionPanelOptions {
    /** Initial buffer distance in meters */
    bufferDistance?: number;
    /** Chart colormap */
    colormap?: ColormapName;
    /** Chart height */
    chartHeight?: number;
}
/**
 * UI panel for cross-section tool containing controls and elevation profile chart.
 */
export declare class CrossSectionPanel {
    private _container;
    private _callbacks;
    private _options;
    private _drawButton?;
    private _clearButton?;
    private _downloadButton?;
    private _expandButton?;
    private _bufferSlider?;
    private _bufferValue?;
    private _statsContainer?;
    private _chartContainer?;
    private _chart;
    private _popupBackdrop?;
    private _popupContainer?;
    private _popupChartContainer?;
    private _popupChart?;
    private _popupResizeObserver?;
    private _isDrawing;
    private _profile;
    private _isResizing;
    private _ignoreBackdropClick;
    private _resizeStartX;
    private _resizeStartY;
    private _resizeStartWidth;
    private _resizeStartHeight;
    private _resizeObserver?;
    private _handlePopupResizeMouseMove;
    private _handlePopupResizeMouseUp;
    /**
     * Creates a new CrossSectionPanel instance.
     *
     * @param callbacks - Panel callbacks
     * @param options - Panel options
     */
    constructor(callbacks: CrossSectionPanelCallbacks, options?: CrossSectionPanelOptions);
    /**
     * Renders the panel element.
     *
     * @returns Container element
     */
    render(): HTMLElement;
    /**
     * Redraws the elevation charts so their canvas colors pick up the active
     * light/dark theme.
     */
    refreshTheme(): void;
    /**
     * Updates the elevation profile display.
     *
     * @param profile - Elevation profile data
     */
    setProfile(profile: ElevationProfile | null): void;
    /**
     * Sets the drawing state.
     *
     * @param isDrawing - Whether drawing mode is active
     */
    setDrawing(isDrawing: boolean): void;
    /**
     * Sets the colormap.
     *
     * @param colormap - Colormap name
     */
    setColormap(colormap: ColormapName): void;
    /**
     * Sets the buffer distance.
     *
     * @param meters - Buffer distance in meters
     */
    setBufferDistance(meters: number): void;
    /**
     * Builds the panel UI.
     */
    private _build;
    /**
     * Updates the statistics display.
     */
    private _updateStats;
    /**
     * Sets up ResizeObserver for responsive chart width.
     */
    private _setupResizeObserver;
    /**
     * Opens the popup with a larger, resizable chart.
     */
    private _openPopup;
    /**
     * Closes the popup.
     */
    private _closePopup;
    /**
     * Starts popup resize operation.
     */
    private _startPopupResize;
    /**
     * Handles popup resize mouse move.
     */
    private _onPopupResizeMouseMove;
    /**
     * Handles popup resize mouse up.
     */
    private _onPopupResizeMouseUp;
    private _syncPopupChartSize;
    /**
     * Downloads the profile data as CSV.
     */
    private _downloadCSV;
    /**
     * Destroys the panel and cleans up resources.
     */
    destroy(): void;
}
//# sourceMappingURL=CrossSectionPanel.d.ts.map