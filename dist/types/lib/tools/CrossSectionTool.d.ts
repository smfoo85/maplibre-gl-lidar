import { Map as MapLibreMap } from 'maplibre-gl';
import { CrossSectionLine } from '../core/types';
import { DeckOverlay } from '../core/DeckOverlay';
/**
 * Cross-section drawing tool for MapLibre.
 * Allows users to draw a line on the map and visualize the buffer zone.
 */
export declare class CrossSectionTool {
    private _map;
    private _deckOverlay;
    private _enabled;
    private _isDrawing;
    private _startPoint;
    private _endPoint;
    private _bufferDistance;
    private readonly LAYER_ID;
    private _onLineChange?;
    private _handleClickBound;
    private _handleMouseMoveBound;
    /**
     * Creates a new CrossSectionTool instance.
     *
     * @param map - MapLibre map instance
     * @param deckOverlay - DeckOverlay instance for rendering
     */
    constructor(map: MapLibreMap, deckOverlay: DeckOverlay);
    /**
     * Enables cross-section drawing mode.
     */
    enable(): void;
    /**
     * Disables cross-section drawing mode.
     */
    disable(): void;
    /**
     * Checks if the tool is enabled.
     *
     * @returns True if enabled
     */
    isEnabled(): boolean;
    /**
     * Gets the current cross-section line.
     *
     * @returns Cross-section line or null if not defined
     */
    getLine(): CrossSectionLine | null;
    /**
     * Sets the buffer distance.
     *
     * @param meters - Buffer distance in meters
     */
    setBufferDistance(meters: number): void;
    /**
     * Gets the current buffer distance.
     *
     * @returns Buffer distance in meters
     */
    getBufferDistance(): number;
    /**
     * Clears the current cross-section line.
     */
    clearLine(): void;
    /**
     * Sets the callback for line changes.
     *
     * @param callback - Callback function
     */
    setOnLineChange(callback: (line: CrossSectionLine | null) => void): void;
    /**
     * Destroys the tool and cleans up resources.
     */
    destroy(): void;
    /**
     * Removes deck.gl layers.
     */
    private _removeDeckLayers;
    /**
     * Adds event listeners for drawing.
     */
    private _addEventListeners;
    /**
     * Removes event listeners.
     */
    private _removeEventListeners;
    /**
     * Handles map click events.
     *
     * @param e - Map mouse event
     */
    private _handleClick;
    /**
     * Handles mouse move events for preview.
     *
     * @param e - Map mouse event
     */
    private _handleMouseMove;
    /**
     * Updates the visualization on the map using deck.gl.
     */
    private _updateVisualization;
    /**
     * Notifies listeners of line change.
     */
    private _notifyLineChange;
}
//# sourceMappingURL=CrossSectionTool.d.ts.map