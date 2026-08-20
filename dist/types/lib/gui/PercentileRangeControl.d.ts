import { ColorRangeConfig } from '../core/types';
/**
 * Options for the PercentileRangeControl component
 */
export interface PercentileRangeControlOptions {
    /** Current color range configuration */
    config: ColorRangeConfig;
    /** Data bounds for reference (used in absolute mode) */
    dataBounds?: {
        min: number;
        max: number;
    };
    /** Actual computed bounds from percentile calculation (for mode switching) */
    computedBounds?: {
        min: number;
        max: number;
    };
    /** Callback when the configuration changes */
    onChange: (config: ColorRangeConfig) => void;
}
/**
 * A control component for configuring color range mapping.
 * Allows switching between percentile and absolute value modes.
 * Uses dual range sliders for intuitive range selection.
 */
export declare class PercentileRangeControl {
    private _options;
    private _percentileRadio?;
    private _absoluteRadio?;
    private _percentileSliderContainer?;
    private _absoluteSliderContainer?;
    private _percentileSlider?;
    private _absoluteSlider?;
    private _computedBounds?;
    /**
     * Creates a new PercentileRangeControl instance.
     *
     * @param options - Control configuration options
     */
    constructor(options: PercentileRangeControlOptions);
    /**
     * Renders the control component.
     *
     * @returns The control container element
     */
    render(): HTMLElement;
    /**
     * Updates the control with new configuration.
     *
     * @param config - New color range configuration
     */
    setConfig(config: ColorRangeConfig): void;
    /**
     * Updates the data bounds (for absolute mode reference).
     *
     * @param bounds - Data bounds
     */
    setDataBounds(bounds: {
        min: number;
        max: number;
    }): void;
    /**
     * Sets the actual computed bounds from percentile calculation.
     * These bounds are used when switching from percentile to absolute mode.
     *
     * @param bounds - The actual computed bounds
     */
    setComputedBounds(bounds: {
        min: number;
        max: number;
    }): void;
    /**
     * Gets the current configuration.
     *
     * @returns The current color range configuration
     */
    getConfig(): ColorRangeConfig;
    /**
     * Handles percentile slider change.
     */
    private _onPercentileChange;
    /**
     * Handles absolute slider change.
     */
    private _onAbsoluteChange;
    /**
     * Handles mode change (percentile/absolute toggle).
     * Syncs values when switching between modes using actual computed bounds.
     */
    private _onModeChange;
    /**
     * Handles reset button click.
     * Resets to default percentile mode with 2-98% range.
     */
    private _onReset;
    /**
     * Updates the visibility of slider containers based on mode.
     */
    private _updateSlidersVisibility;
    /**
     * Gets the appropriate step value for absolute slider based on data range.
     */
    private _getAbsoluteStep;
    /**
     * Formats absolute value for display based on the data range.
     */
    private _formatAbsoluteValue;
    /**
     * Emits a change event with the current configuration.
     */
    private _emitChange;
}
//# sourceMappingURL=PercentileRangeControl.d.ts.map