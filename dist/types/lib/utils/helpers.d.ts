/**
 * Clamps a value between a minimum and maximum.
 *
 * @param value - The value to clamp
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns The clamped value
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Formats a numeric value with appropriate decimal places based on step size.
 *
 * @param value - The value to format
 * @param step - The step size to determine decimal places
 * @returns The formatted value as a string
 */
export declare function formatNumericValue(value: number, step: number): string;
/**
 * Generates a unique ID string.
 *
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export declare function generateId(prefix?: string): string;
/**
 * Debounces a function call.
 *
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export declare function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Throttles a function call.
 *
 * @param fn - The function to throttle
 * @param limit - The minimum time between calls in milliseconds
 * @returns A throttled version of the function
 */
export declare function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Creates a CSS class string from an object of class names.
 *
 * @param classes - Object with class names as keys and boolean values
 * @returns A space-separated string of class names
 */
export declare function classNames(classes: Record<string, boolean>): string;
/**
 * Formats a number with thousand separators.
 *
 * @param num - The number to format
 * @returns Formatted string with commas
 */
export declare function formatNumber(num: number): string;
/**
 * Formats bytes into human-readable size.
 *
 * @param bytes - Number of bytes
 * @returns Human-readable size string
 */
export declare function formatBytes(bytes: number): string;
/**
 * Extracts filename from a path or URL.
 *
 * @param path - File path or URL
 * @returns Filename without path
 */
export declare function getFilename(path: string): string;
/**
 * Computes the percentile value of a Float32Array using the linear interpolation method.
 * Uses sampling for large arrays to improve performance.
 *
 * @param arr - The Float32Array to compute the percentile from
 * @param percentile - The percentile to compute (0-100)
 * @param maxSamples - Maximum number of samples to use for large arrays (default: 100000)
 * @returns The value at the given percentile
 */
export declare function computePercentile(arr: Float32Array, percentile: number, maxSamples?: number): number;
/**
 * Computes percentile bounds (e.g., 2nd and 98th percentile) for a Float32Array.
 *
 * @param arr - The Float32Array to compute bounds from
 * @param lowerPercentile - Lower percentile (default: 2)
 * @param upperPercentile - Upper percentile (default: 98)
 * @returns Object with min and max values at the specified percentiles
 */
export declare function computePercentileBounds(arr: Float32Array, lowerPercentile?: number, upperPercentile?: number): {
    min: number;
    max: number;
};
//# sourceMappingURL=helpers.d.ts.map