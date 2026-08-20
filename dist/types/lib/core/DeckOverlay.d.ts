import { Map as MapLibreMap } from 'maplibre-gl';
import { Layer } from '@deck.gl/core';
/**
 * Manages the deck.gl overlay integration with MapLibre GL.
 * Handles adding, removing, and updating deck.gl layers.
 */
export declare class DeckOverlay {
    private _map;
    private _overlay;
    private _layers;
    constructor(map: MapLibreMap);
    /**
     * Adds a layer to the overlay.
     *
     * @param id - Unique layer ID
     * @param layer - The deck.gl layer to add
     */
    addLayer(id: string, layer: Layer): void;
    /**
     * Removes a layer from the overlay.
     *
     * @param id - ID of the layer to remove
     */
    removeLayer(id: string): void;
    /**
     * Updates an existing layer with new props.
     *
     * @param id - ID of the layer to update
     * @param layer - New layer instance with updated props
     */
    updateLayer(id: string, layer: Layer): void;
    /**
     * Gets all current layers.
     *
     * @returns Array of deck.gl layers
     */
    getLayers(): Layer[];
    /**
     * Checks if a layer exists.
     *
     * @param id - Layer ID to check
     * @returns True if layer exists
     */
    hasLayer(id: string): boolean;
    /**
     * Clears all layers from the overlay.
     */
    clearLayers(): void;
    /**
     * Gets the MapLibre map instance.
     *
     * @returns The MapLibre map
     */
    getMap(): MapLibreMap;
    /**
     * Destroys the overlay and removes it from the map.
     */
    destroy(): void;
    /**
     * Updates the overlay with current layers.
     * Layers are sorted so that overlay layers (like cross-section) render on top.
     */
    private _updateOverlay;
}
//# sourceMappingURL=DeckOverlay.d.ts.map