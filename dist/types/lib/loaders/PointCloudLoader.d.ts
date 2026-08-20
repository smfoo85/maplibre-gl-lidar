import { PointCloudData } from './types';
/**
 * Loads and parses LiDAR point cloud files (LAS, LAZ, COPC).
 * Uses copc.js for COPC/LAZ files with LAS 1.4 support.
 */
export declare class PointCloudLoader {
    /**
     * Creates a new PointCloudLoader instance.
     */
    constructor();
    private _onProgress?;
    private _fallbackCrs?;
    /**
     * Loads a point cloud from a URL, File, or ArrayBuffer.
     *
     * @param source - URL string, File object, or ArrayBuffer
     * @param onProgress - Optional progress callback (progress: 0-100, message: string)
     * @param fallbackCrs - CRS to use when the file has no embedded projection (e.g. "EPSG:29874")
     * @returns Normalized point cloud data
     */
    load(source: string | File | ArrayBuffer, onProgress?: (progress: number, message: string) => void, fallbackCrs?: string): Promise<PointCloudData>;
    /**
     * Reports progress to the callback if set.
     */
    private _reportProgress;
    /**
     * Yields to the event loop to allow UI updates.
     */
    private _yieldToUI;
    /**
     * Loads a COPC file from a URL using the copc.js library.
     * Falls back to loaders.gl for unsupported LAS versions (e.g., 1.3).
     */
    private _loadCopcFromUrl;
    /**
     * Loads a COPC file from an ArrayBuffer using the copc.js library.
     * Falls back to loaders.gl for unsupported LAS versions (e.g., 1.3).
     */
    private _loadCopcFromBuffer;
    /**
     * Loads a regular LAS 1.2/1.4 file using copc.js Las module.
     */
    private _loadRegularLasFromBuffer;
    /**
     * Loads a point cloud using loaders.gl (fallback for LAS 1.0/1.1/1.3).
     */
    private _loadWithLoadersGL;
    /**
     * Loads a point cloud from URL using loaders.gl (fallback for unsupported LAS versions).
     */
    private _loadUrlWithLoadersGL;
    /**
     * Recursively loads all hierarchy pages from a COPC file.
     * @param source - URL string or Getter function
     * @param info - COPC info containing root hierarchy page
     */
    private _loadFullHierarchy;
    /**
     * Process COPC data and extract point cloud information.
     */
    private _processCopcData;
}
//# sourceMappingURL=PointCloudLoader.d.ts.map