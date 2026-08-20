import { LidarState, ColorScheme, ColormapName, ColorRangeConfig, LidarSampleDataset } from '../core/types';
/**
 * Callbacks for panel interactions
 */
export interface PanelBuilderCallbacks {
    onFileSelect: (file: File) => void;
    onUrlSubmit: (url: string) => void;
    onPointSizeChange: (size: number) => void;
    onOpacityChange: (opacity: number) => void;
    onColorSchemeChange: (scheme: ColorScheme) => void;
    onColormapChange: (colormap: ColormapName) => void;
    onColorRangeChange: (config: ColorRangeConfig) => void;
    onUsePercentileChange: (usePercentile: boolean) => void;
    onElevationRangeChange: (range: [number, number] | null) => void;
    onPickableChange: (pickable: boolean) => void;
    onZOffsetEnabledChange: (enabled: boolean) => void;
    onZOffsetChange: (offset: number) => void;
    onTerrainChange: (enabled: boolean) => void;
    onUnload: (id: string) => void;
    onZoomTo: (id: string) => void;
    onVisibilityToggle?: (id: string, visible: boolean) => void;
    onClassificationToggle: (classificationCode: number, visible: boolean) => void;
    onClassificationShowAll: () => void;
    onClassificationHideAll: () => void;
    onShowMetadata?: (id: string) => void;
    onCrossSectionPanel?: () => HTMLElement | null;
    onShareUrl?: () => string;
}
/**
 * Builds and manages the LiDAR control panel UI.
 */
export declare class PanelBuilder {
    private _callbacks;
    private _state;
    private _sampleData;
    private _sampleDataLabel;
    private _fileInput?;
    private _urlInput?;
    private _loadButton?;
    private _colorSelect?;
    private _colormapSelect?;
    private _colormapGroup?;
    private _colorbar?;
    private _colorbarContainer?;
    private _colorRangeControl?;
    private _colorRangeContainer?;
    private _percentileCheckbox?;
    private _percentileGroup?;
    private _pointSizeSlider?;
    private _opacitySlider?;
    private _pointCloudsList?;
    private _pickableCheckbox?;
    private _elevationSlider?;
    private _elevationCheckbox?;
    private _zOffsetCheckbox?;
    private _zOffsetSlider?;
    private _zOffsetSliderContainer?;
    private _terrainCheckbox?;
    private _loadingIndicator?;
    private _errorMessage?;
    private _classificationLegend?;
    private _classificationLegendContainer?;
    private _shareFeedbackTimeout?;
    private _hiddenClouds;
    constructor(callbacks: PanelBuilderCallbacks, initialState: LidarState, options?: {
        sampleData?: LidarSampleDataset[];
        sampleDataLabel?: string;
    });
    /**
     * Builds and returns the panel content.
     *
     * @returns The panel content element
     */
    build(): HTMLElement;
    /**
     * Updates the UI to reflect the current state.
     *
     * @param state - New state
     */
    updateState(state: LidarState): void;
    /**
     * Updates the loading progress display.
     *
     * @param progress - Progress value (0-100)
     * @param message - Optional progress message
     */
    updateLoadingProgress(progress: number, message?: string): void;
    /**
     * Builds the file input section.
     */
    private _buildFileSection;
    /**
     * Builds the "Load sample data" dropdown: a custom (not native `<select>`)
     * dropdown so the menu themes correctly in dark mode. Picking an entry fills
     * the URL input. Returns null when no samples are configured.
     */
    private _buildSampleDropdown;
    /**
     * Builds the styling controls section.
     */
    private _buildStylingSection;
    /**
     * Builds the elevation filter controls with checkbox and dual slider.
     */
    private _buildElevationFilter;
    /**
     * Builds the Z offset control with checkbox and slider.
     */
    private _buildZOffsetControl;
    /**
     * Builds the 3D terrain toggle checkbox.
     */
    private _buildTerrainCheckbox;
    /**
     * Gets the elevation bounds from loaded point clouds.
     */
    private _getElevationBounds;
    /**
     * Gets the intensity bounds.
     * Intensity values are normalized to 0-1 range during loading.
     */
    private _getIntensityBounds;
    /**
     * Gets the appropriate data bounds based on the current color scheme.
     */
    private _getDataBoundsForCurrentScheme;
    /**
     * Builds the colormap selector dropdown.
     */
    private _buildColormapSelector;
    /**
     * Builds the colorbar component.
     */
    private _buildColorbar;
    /**
     * Builds the color range control (replaces percentile checkbox).
     */
    private _buildColorRangeControl;
    /**
     * Updates the visibility of color-related controls based on color scheme.
     * Shows colormap/colorbar/range for elevation and intensity.
     * Shows classification legend for classification.
     */
    private _updatePercentileVisibility;
    /**
     * Builds the classification legend component.
     */
    private _buildClassificationLegend;
    /**
     * Builds the pickable checkbox control.
     */
    private _buildPickableCheckbox;
    /**
     * Builds the loaded point clouds list.
     */
    private _buildPointCloudsList;
    /**
     * Updates the point clouds list display.
     */
    private _updatePointCloudsList;
    /**
     * Builds a single point cloud list item.
     */
    private _buildPointCloudItem;
    /**
     * Builds the loading indicator.
     */
    private _buildLoadingIndicator;
    /**
     * Builds the error message display.
     */
    private _buildErrorMessage;
    /**
     * Builds the share URL button section if sharing is enabled.
     */
    private _buildShareSection;
    /**
     * Copies text to the clipboard, falling back to a hidden textarea for older browsers.
     */
    private _copyToClipboard;
    /**
     * Shows short share button feedback.
     */
    private _setShareStatus;
    /**
     * Builds the cross-section section if callback is provided.
     *
     * @returns Cross-section section or null if not available
     */
    private _buildCrossSectionSection;
}
//# sourceMappingURL=PanelBuilder.d.ts.map