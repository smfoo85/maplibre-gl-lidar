import { ColormapName } from '../core/types';
/**
 * Options for the Colorbar component
 */
export interface ColorbarOptions {
    /** Colormap to display */
    colormap: ColormapName;
    /** Minimum value for the colorbar */
    minValue: number;
    /** Maximum value for the colorbar */
    maxValue: number;
    /** Label for the colorbar (e.g., "Elevation (m)") */
    label?: string;
}
/**
 * A visual colorbar legend component that displays a color gradient
 * with min/max value labels.
 */
export declare class Colorbar {
    private _options;
    private _canvas?;
    private _minLabel?;
    private _maxLabel?;
    /**
     * Creates a new Colorbar instance.
     *
     * @param options - Colorbar configuration options
     */
    constructor(options: ColorbarOptions);
    /**
     * Renders the colorbar component.
     *
     * @returns The colorbar container element
     */
    render(): HTMLElement;
    /**
     * Updates the colorbar with new options.
     *
     * @param options - Partial options to update
     */
    update(options: Partial<ColorbarOptions>): void;
    /**
     * Sets the colormap.
     *
     * @param colormap - The colormap name
     */
    setColormap(colormap: ColormapName): void;
    /**
     * Sets the value range.
     *
     * @param min - Minimum value
     * @param max - Maximum value
     */
    setRange(min: number, max: number): void;
    /**
     * Gets the current colormap.
     *
     * @returns The current colormap name
     */
    getColormap(): ColormapName;
    /**
     * Gets the current value range.
     *
     * @returns Object with min and max values
     */
    getRange(): {
        min: number;
        max: number;
    };
    /**
     * Draws the color gradient on the canvas.
     */
    private _drawGradient;
    /**
     * Updates the min/max value labels.
     */
    private _updateLabels;
    /**
     * Formats a value for display.
     *
     * @param value - The value to format
     * @returns Formatted string
     */
    private _formatValue;
}
//# sourceMappingURL=Colorbar.d.ts.map