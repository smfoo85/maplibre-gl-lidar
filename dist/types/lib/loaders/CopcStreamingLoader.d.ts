import { CachedNode, StreamingLoaderOptions, ViewportInfo, StreamingLoaderEvent, StreamingLoaderEventHandler } from './streaming-types';
import { PointCloudData } from './types';
import { PointCloudBounds } from '../core/types';
/**
 * Source type for streaming loader - can be URL, File, or ArrayBuffer
 */
export type StreamingSource = string | File | ArrayBuffer;
/**
 * Streams COPC point cloud data on-demand based on viewport.
 * Implements center-first priority loading and respects point budget.
 * Supports both URL and local file (File/ArrayBuffer) sources.
 */
export declare class CopcStreamingLoader {
    private _originalSource;
    private _source;
    private _copc;
    private _lazPerf;
    private _options;
    private _hierarchyPages;
    private _loadedHierarchyKeys;
    private _rootHierarchyPage;
    private _nodeCache;
    private _positions;
    private _colors;
    private _intensities;
    private _classifications;
    private _extraAttributes;
    private _coordinateOrigin;
    private _bounds;
    private _loadingQueue;
    private _activeRequests;
    private _totalLoadedPoints;
    private _totalLoadedNodes;
    private _isInitialized;
    private _transformer;
    private _verticalUnitFactor;
    private _needsTransform;
    private _hasColor;
    private _totalPointsInFile;
    private _octreeCube;
    private _spacing;
    private _spacingInMeters;
    private _availableDimensions;
    private _dimensionsDetected;
    private _eventHandlers;
    private _pendingLayerUpdate;
    private _updateBatchTimeout;
    private _onPointsLoaded?;
    /**
     * Creates a new CopcStreamingLoader instance.
     *
     * @param source - URL string, File object, or ArrayBuffer
     * @param options - Streaming options
     */
    constructor(source: StreamingSource, options?: StreamingLoaderOptions);
    /**
     * Initializes the COPC file - reads header and root hierarchy.
     * Must be called before any loading operations.
     *
     * @returns Initial info about the point cloud
     */
    initialize(): Promise<{
        bounds: PointCloudBounds;
        totalPoints: number;
        hasRGB: boolean;
        spacing: number;
    }>;
    /**
     * Pre-allocates buffers for the point budget.
     */
    private _allocateBuffers;
    /**
     * Gets the octree spacing value in meters (useful for ViewportManager).
     * Always returned in meters even when the source CRS is geographic.
     */
    getSpacing(): number;
    /**
     * Parses a node key string to array format.
     *
     * @param key - Node key in format "depth-x-y-z"
     * @returns NodeKey array [depth, x, y, z]
     */
    private _parseNodeKey;
    /**
     * Calculates the bounding box of an octree node.
     *
     * @param key - Node key [depth, x, y, z]
     * @returns Node bounds in source CRS and WGS84
     */
    private _calculateNodeBounds;
    /**
     * Checks if a node's bounds intersect the viewport.
     * Adds a buffer around viewport to catch edge/corner nodes.
     *
     * @param nodeBounds - Node bounds in WGS84
     * @param viewport - Current viewport info
     * @returns True if bounds intersect
     */
    private _boundsIntersectsViewport;
    /**
     * Calculates node priority based on distance from viewport center.
     * Lower values = higher priority (closer to center).
     *
     * @param nodeBounds - Node bounds in WGS84
     * @param viewport - Current viewport info
     * @returns Priority value (distance from center)
     */
    private _calculateNodePriority;
    /**
     * Ensures the hierarchy page containing a node key is loaded.
     *
     * @param nodeKey - Node key to ensure hierarchy for
     */
    private _ensureHierarchyLoaded;
    /**
     * Recursively loads hierarchy pages.
     *
     * @param page - Hierarchy page to load
     */
    private _loadHierarchyRecursive;
    /**
     * Finds nodes that intersect the viewport and should be loaded.
     * Implements center-first priority and LOD selection.
     * Loads nodes at ALL depths up to targetDepth to ensure full coverage
     * (parent nodes fill gaps where child nodes don't exist in sparse octrees).
     *
     * @param viewport - Current viewport information
     * @returns Sorted array of nodes to load (by priority)
     */
    selectNodesForViewport(viewport: ViewportInfo): Promise<CachedNode[]>;
    /**
     * Queues a node for loading.
     *
     * @param node - Node to queue
     */
    queueNode(node: CachedNode): void;
    /**
     * Loads nodes from the queue, respecting point budget and concurrency limits.
     */
    loadQueuedNodes(): Promise<void>;
    /**
     * Removes queued nodes that are outside the current viewport and re-sorts priorities.
     *
     * @param viewport - Current viewport information
     */
    pruneQueueForViewport(viewport: ViewportInfo): void;
    /**
     * Evicts loaded nodes outside the current viewport and compacts point buffers.
     * Hierarchy metadata is kept so evicted nodes can be loaded again later.
     *
     * @param viewport - Current viewport information
     * @returns True if eviction completed, or false if active requests are still writing buffers
     */
    evictLoadedNodesOutsideViewport(viewport: ViewportInfo): boolean;
    /**
     * Resets loaded node data while retaining the COPC hierarchy cache.
     *
     * @returns True if reset completed, or false if active requests are still writing buffers
     */
    resetLoadedData(): boolean;
    /**
     * Copies a node's point data from one buffer range to another.
     *
     * @param fromStart - Source point index
     * @param toStart - Destination point index
     * @param pointCount - Number of points to copy
     */
    private _copyNodeBufferRange;
    /**
     * Loads a single node's point data.
     *
     * @param node - Node to load
     */
    private _loadNode;
    /**
     * Extracts point data from a view into the buffers.
     *
     * @param view - Point data view from copc.js
     * @param node - Node being loaded
     * @param startIndex - Starting index in buffers
     */
    private _extractPointData;
    /**
     * Schedules a batched layer update.
     */
    private _scheduleLayerUpdate;
    /**
     * Performs the layer update callback.
     */
    private _performLayerUpdate;
    /**
     * Sets the callback for when points are loaded.
     *
     * @param callback - Function to call with updated point cloud data
     */
    setOnPointsLoaded(callback: (data: PointCloudData) => void): void;
    /**
     * Gets the current loaded point cloud data for rendering.
     *
     * @returns Current loaded data
     */
    getLoadedPointCloudData(): PointCloudData;
    /**
     * Gets the current streaming progress.
     *
     * @returns Progress event data
     */
    private _getProgressEvent;
    /**
     * Registers an event handler.
     *
     * @param event - Event type
     * @param handler - Handler function
     */
    on(event: StreamingLoaderEvent, handler: StreamingLoaderEventHandler): void;
    /**
     * Removes an event handler.
     *
     * @param event - Event type
     * @param handler - Handler function
     */
    off(event: StreamingLoaderEvent, handler: StreamingLoaderEventHandler): void;
    /**
     * Emits an event to all registered handlers.
     *
     * @param event - Event type
     * @param data - Event data
     */
    private _emit;
    /**
     * Gets the total number of loaded points.
     */
    getLoadedPointCount(): number;
    /**
     * Gets the configured point budget.
     *
     * @returns Maximum point count for the streaming buffers
     */
    getPointBudget(): number;
    /**
     * Estimates viewport coverage ratio by loaded nodes.
     *
     * @param viewport - Current viewport information
     * @param minDepth - Minimum octree depth to consider
     * @returns Coverage ratio from 0 to 1
     */
    getViewportCoverageRatio(viewport: ViewportInfo, minDepth?: number): number;
    /**
     * Gets the total number of loaded nodes.
     */
    getLoadedNodeCount(): number;
    /**
     * Checks if the loader is currently loading.
     */
    isLoading(): boolean;
    /**
     * Gets the full COPC metadata for the loaded file.
     *
     * @returns COPC metadata or undefined if not initialized
     */
    getCopcMetadata(): import('../core/types').CopcMetadata | undefined;
    /**
     * Calculates the nominal point spacing from bounding box area.
     * Uses formula: sqrt(area / pointCount) * unitFactor
     *
     * @param header - COPC header with bounds and point count
     * @returns Estimated point spacing in meters
     */
    private _calculateNominalSpacing;
    /**
     * Gets the WKT coordinate reference system string.
     *
     * @returns WKT string or undefined if not available
     */
    getWkt(): string | undefined;
    /**
     * Destroys the streaming loader and cleans up resources.
     */
    destroy(): void;
}
//# sourceMappingURL=CopcStreamingLoader.d.ts.map