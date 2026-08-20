/**
 * Options for creating a classification legend
 */
export interface ClassificationLegendOptions {
    /** Classification codes to display */
    classifications: number[];
    /** Set of currently hidden classification codes */
    hiddenClassifications: Set<number>;
    /** Callback when a classification visibility is toggled */
    onToggle: (classificationCode: number, visible: boolean) => void;
    /** Callback to show all classifications */
    onShowAll: () => void;
    /** Callback to hide all classifications */
    onHideAll: () => void;
}
/**
 * Creates a classification legend with toggleable visibility checkboxes.
 * Shows color swatches and names for each classification type found in the data.
 */
export declare class ClassificationLegend {
    private _options;
    private _container?;
    private _listContainer?;
    private _checkboxes;
    constructor(options: ClassificationLegendOptions);
    /**
     * Renders the legend element.
     *
     * @returns The legend container element
     */
    render(): HTMLElement;
    /**
     * Builds a single legend item with checkbox, color swatch, and label.
     *
     * @param code - Classification code
     * @returns The legend item element
     */
    private _buildLegendItem;
    /**
     * Updates visibility of a specific classification checkbox.
     *
     * @param code - Classification code
     * @param visible - Whether it should be visible (checked)
     */
    updateClassification(code: number, visible: boolean): void;
    /**
     * Updates all classification checkboxes at once.
     *
     * @param hiddenClassifications - Set of hidden classification codes
     */
    updateAll(hiddenClassifications: Set<number>): void;
    /**
     * Updates the list of available classifications and re-renders the list.
     *
     * @param classifications - Array of classification codes to display
     * @param hiddenClassifications - Set of hidden classification codes
     */
    setClassifications(classifications: number[], hiddenClassifications: Set<number>): void;
    /**
     * Gets the container element.
     *
     * @returns The container element or undefined if not rendered
     */
    getContainer(): HTMLElement | undefined;
}
//# sourceMappingURL=ClassificationLegend.d.ts.map