/**
 * Options for creating a file input
 */
export interface FileInputOptions {
    accept?: string;
    onChange: (file: File) => void;
    label?: string;
}
/**
 * Creates a styled file input with drag-and-drop support.
 */
export declare class FileInput {
    private _options;
    private _input?;
    private _label?;
    constructor(options: FileInputOptions);
    /**
     * Renders the file input element.
     *
     * @returns The file input container element
     */
    render(): HTMLElement;
    /**
     * Sets the label text.
     *
     * @param text - New label text
     */
    setLabel(text: string): void;
    /**
     * Resets the label to default.
     */
    resetLabel(): void;
    /**
     * Enables or disables the input.
     *
     * @param enabled - Whether to enable
     */
    setEnabled(enabled: boolean): void;
    /**
     * Checks if a file has a valid extension.
     */
    private _isValidFile;
}
//# sourceMappingURL=FileInput.d.ts.map