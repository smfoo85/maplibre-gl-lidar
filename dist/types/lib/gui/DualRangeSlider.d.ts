/**
 * Options for creating a dual-handle range slider
 */
export interface DualRangeSliderOptions {
    label: string;
    min: number;
    max: number;
    step: number;
    valueLow: number;
    valueHigh: number;
    onChange: (low: number, high: number) => void;
    formatValue?: (value: number) => string;
}
/**
 * Creates a dual-handle range slider for selecting a range.
 */
export declare class DualRangeSlider {
    private _options;
    private _sliderLow?;
    private _sliderHigh?;
    private _valueDisplay?;
    private _rangeHighlight?;
    constructor(options: DualRangeSliderOptions);
    /**
     * Renders the dual slider element.
     *
     * @returns The slider container element
     */
    render(): HTMLElement;
    /**
     * Sets the slider range programmatically.
     */
    setRange(low: number, high: number): void;
    /**
     * Updates the min/max bounds of the slider.
     */
    setBounds(min: number, max: number): void;
    /**
     * Updates the step value of the slider.
     */
    setStep(step: number): void;
    /**
     * Updates the visual range highlight bar.
     */
    private _updateRangeHighlight;
    /**
     * Gets the current range values.
     */
    getRange(): [number, number];
    /**
     * Formats the range for display.
     */
    private _formatRange;
}
//# sourceMappingURL=DualRangeSlider.d.ts.map