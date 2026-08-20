import { PointCloudFullMetadata } from '../core/types';
/**
 * Options for MetadataPanel
 */
export interface MetadataPanelOptions {
    /** Callback when panel is closed */
    onClose: () => void;
}
/**
 * Modal panel for displaying full point cloud metadata.
 * Displays metadata in collapsible sections with copy functionality.
 */
export declare class MetadataPanel {
    private _container;
    private _backdrop;
    private _options;
    private _metadata;
    /**
     * Creates a new MetadataPanel instance.
     *
     * @param options - Panel options
     */
    constructor(options: MetadataPanelOptions);
    /**
     * Shows the metadata panel with the given metadata.
     *
     * @param metadata - Full metadata to display
     */
    show(metadata: PointCloudFullMetadata): void;
    /**
     * Hides and destroys the metadata panel.
     */
    hide(): void;
    /**
     * Renders the metadata panel.
     */
    private _render;
    /**
     * Closes the panel and calls the onClose callback.
     */
    private _close;
    /**
     * Builds the basic info section.
     *
     * @returns Section element
     */
    private _buildBasicInfoSection;
    /**
     * Builds the bounds section.
     *
     * @returns Section element
     */
    private _buildBoundsSection;
    /**
     * Builds the CRS section.
     *
     * @returns Section element
     */
    private _buildCrsSection;
    /**
     * Builds the point format section.
     *
     * @returns Section element
     */
    private _buildPointFormatSection;
    /**
     * Builds the dimensions section.
     *
     * @returns Section element
     */
    private _buildDimensionsSection;
    /**
     * Creates a collapsible section.
     *
     * @param title - Section title
     * @param expanded - Whether section starts expanded
     * @returns Section element
     */
    private _createSection;
    /**
     * Creates a key-value row.
     *
     * @param label - Row label
     * @param value - Row value
     * @returns Row element
     */
    private _createRow;
    /**
     * Creates a subheader element.
     *
     * @param title - Subheader title
     * @returns Subheader element
     */
    private _createSubheader;
    /**
     * Formats a number with commas.
     *
     * @param n - Number to format
     * @returns Formatted string
     */
    private _formatNumber;
    /**
     * Formats a WKT string for display.
     *
     * @param wkt - WKT string
     * @returns Formatted WKT
     */
    private _formatWkt;
}
//# sourceMappingURL=MetadataPanel.d.ts.map