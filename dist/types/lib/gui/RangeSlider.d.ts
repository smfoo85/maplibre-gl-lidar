/**
 * Options for creating a range slider
 */
export interface RangeSliderOptions {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    formatValue?: (value: number) => string;
}
/**
 * Creates a styled range slider with label and value display.
 */
export declare class RangeSlider {
    private _options;
    private _slider?;
    private _valueDisplay?;
    constructor(options: RangeSliderOptions);
    /**
     * Renders the slider element.
     *
     * @returns The slider container element
     */
    render(): HTMLElement;
    /**
     * Sets the slider value programmatically.
     *
     * @param value - New value
     */
    setValue(value: number): void;
    /**
     * Gets the current value.
     *
     * @returns Current slider value
     */
    getValue(): number;
    /**
     * Enables or disables the slider.
     *
     * @param enabled - Whether to enable
     */
    setEnabled(enabled: boolean): void;
    /**
     * Sets the slider min and max bounds.
     *
     * @param min - New minimum value
     * @param max - New maximum value
     */
    setBounds(min: number, max: number): void;
    /**
     * Formats the value for display.
     */
    private _formatValue;
}
//# sourceMappingURL=RangeSlider.d.ts.map