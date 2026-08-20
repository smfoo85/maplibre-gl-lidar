import { ElevationProfile, ProfilePoint, ColormapName } from '../core/types';
/**
 * Options for ElevationProfileChart
 */
export interface ElevationProfileChartOptions {
    /** Chart width in pixels */
    width?: number;
    /** Chart height in pixels */
    height?: number;
    /** Colormap for elevation coloring */
    colormap?: ColormapName;
    /** Callback when a point is hovered */
    onPointHover?: (point: ProfilePoint | null, x: number, y: number) => void;
}
/**
 * Canvas-based elevation profile chart.
 * Plots distance (x-axis) vs elevation (y-axis) with interactive hover.
 */
export declare class ElevationProfileChart {
    private _container;
    private _canvas;
    private _ctx;
    private _tooltip;
    private _options;
    private _profile;
    private _hoveredPointIndex;
    private _colors;
    private readonly MARGIN;
    /**
     * Creates a new ElevationProfileChart instance.
     *
     * @param options - Chart options
     */
    constructor(options?: ElevationProfileChartOptions);
    /**
     * Renders the chart container element.
     *
     * @returns Container element
     */
    render(): HTMLElement;
    /**
     * Redraws the chart. Useful after a theme change since canvas colors are
     * resolved from CSS variables at draw time.
     */
    redraw(): void;
    /**
     * Resolves the chart's theme colors from CSS custom properties so the
     * canvas matches the active light/dark theme. Falls back to the light
     * defaults when a variable is not defined.
     *
     * @returns Resolved theme colors
     */
    private _themeColors;
    /**
     * Sets the elevation profile data and redraws the chart.
     *
     * @param profile - Elevation profile to display
     */
    setProfile(profile: ElevationProfile | null): void;
    /**
     * Sets the colormap and redraws the chart.
     *
     * @param colormap - Colormap name
     */
    setColormap(colormap: ColormapName): void;
    /**
     * Resizes the chart.
     *
     * @param width - New width
     * @param height - New height
     */
    resize(width: number, height: number): void;
    /**
     * Draws the chart.
     */
    private _draw;
    /**
     * Draws "No data" message.
     */
    private _drawNoData;
    /**
     * Draws grid lines.
     *
     * @param plotWidth - Plot area width
     * @param plotHeight - Plot area height
     */
    private _drawGrid;
    /**
     * Draws the profile points.
     *
     * @param plotWidth - Plot area width
     * @param plotHeight - Plot area height
     */
    private _drawPoints;
    /**
     * Draws the axes and labels.
     *
     * @param plotWidth - Plot area width
     * @param plotHeight - Plot area height
     */
    private _drawAxes;
    /**
     * Formats distance for display.
     *
     * @param meters - Distance in meters
     * @returns Formatted string
     */
    private _formatDistance;
    /**
     * Handles mouse move for hover interaction.
     *
     * @param event - Mouse event
     */
    private _handleMouseMove;
    /**
     * Handles mouse leave.
     */
    private _handleMouseLeave;
    /**
     * Shows the tooltip.
     *
     * @param point - Profile point
     * @param x - Screen X coordinate
     * @param y - Screen Y coordinate
     */
    private _showTooltip;
    /**
     * Hides the tooltip.
     */
    private _hideTooltip;
    /**
     * Destroys the chart and cleans up resources.
     */
    destroy(): void;
}
//# sourceMappingURL=ElevationProfileChart.d.ts.map