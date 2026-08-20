import { StreamingLoaderOptions, ViewportInfo, StreamingLoaderEvent, StreamingLoaderEventHandler } from './streaming-types';
import { EptMetadata, EptCachedNode } from './ept-types';
import { PointCloudData } from './types';
import { PointCloudBounds } from '../core/types';
/**
 * Streams Entwine Point Tile (EPT) data on-demand based on viewport.
 * Implements center-first priority loading and respects point budget.
 *
 * EPT format uses:
 * - ept.json for metadata
 * - ept-hierarchy/ for octree node structure
 * - ept-data/ for point data (LAZ or binary)
 */
export declare class EptStreamingLoader {
    private _baseUrl;
    private _options;
    private _metadata;
    private _hierarchyCache;
    private _hierarchyLoading;
    private _hierarchyFailures;
    private _subtreeRoots;
    private _rootHierarchyLoaded;
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
    private _hasIntensity;
    private _totalPointsInFile;
    private _pointByteLength;
    private _parsedSchema;
    private _availableDimensions;
    private _dimensionsDetected;
    private _eventHandlers;
    private _pendingLayerUpdate;
    private _updateBatchTimeout;
    private _onPointsLoaded?;
    private _isResetting;
    /**
     * Creates a new EptStreamingLoader instance.
     *
     * @param eptUrl - URL to ept.json or base EPT directory
     * @param options - Streaming options
     */
    constructor(eptUrl: string, options?: StreamingLoaderOptions);
    /**
     * Initializes the EPT dataset - reads metadata and root hierarchy.
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
     * Parses the EPT schema and builds dimension getters.
     */
    private _parseSchema;
    /**
     * Creates a getter function for a dimension.
     *
     * @param dim - Dimension definition
     * @param offset - Byte offset within point record
     * @returns Getter function
     */
    private _createDimensionGetter;
    /**
     * Pre-allocates buffers for the point budget.
     */
    private _allocateBuffers;
    /**
     * Gets the octree spacing value.
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
     *
     * @param nodeBounds - Node bounds in WGS84
     * @param viewport - Current viewport info
     * @returns True if bounds intersect
     */
    private _boundsIntersectsViewport;
    /**
     * Calculates node priority based on distance from viewport center.
     *
     * @param nodeBounds - Node bounds in WGS84
     * @param viewport - Current viewport info
     * @returns Priority value (lower = higher priority)
     */
    private _calculateNodePriority;
    /**
     * Loads hierarchy from a hierarchy JSON file.
     *
     * @param key - Hierarchy key (e.g., "0-0-0-0")
     */
    private _loadHierarchy;
    /**
     * Ensures root hierarchy is loaded.
     * Subtree hierarchies are loaded on-demand in selectNodesForViewport.
     */
    private _ensureHierarchyLoaded;
    /**
     * Finds nodes that intersect the viewport and should be loaded.
     *
     * @param viewport - Current viewport information
     * @returns Sorted array of nodes to load (by priority)
     */
    selectNodesForViewport(viewport: ViewportInfo): Promise<EptCachedNode[]>;
    /**
     * Queues a node for loading.
     *
     * @param node - Node to queue
     */
    queueNode(node: EptCachedNode): void;
    /**
     * Loads nodes from the queue, respecting point budget and concurrency limits.
     */
    loadQueuedNodes(): Promise<void>;
    /**
     * Gets the data URL for a node.
     *
     * @param key - Node key
     * @returns URL to the data file
     */
    private _getDataUrl;
    /**
     * Loads a single node's point data.
     *
     * @param node - Node to load
     */
    private _loadNode;
    /**
     * Loads a LAZ node using @loaders.gl/las.
     *
     * @param url - URL to the LAZ file
     * @param _node - Node being loaded (unused, point count from file)
     * @param startIndex - Starting index in buffers
     */
    private _loadLazNode;
    /**
     * Loads a binary node.
     *
     * @param url - URL to the binary file
     * @param node - Node being loaded
     * @param startIndex - Starting index in buffers
     */
    private _loadBinaryNode;
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
     * Checks whether there are subtree hierarchies still pending for the viewport.
     *
     * @param viewport - Current viewport information
     * @returns True if more subtree hierarchies should be loaded
     */
    hasPendingSubtrees(viewport: ViewportInfo): boolean;
    /**
     * Gets the current streaming progress.
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
     * Gets the current point budget.
     */
    getPointBudget(): number;
    /**
     * Checks if any nodes intersecting the viewport have already been loaded.
     *
     * @param viewport - Current viewport information
     * @returns True if viewport has loaded coverage
     */
    hasLoadedNodesInViewport(viewport: ViewportInfo, minDepth?: number): boolean;
    /**
     * Estimates viewport coverage ratio by loaded nodes.
     * Returns a value from 0 to 1 representing how much of the viewport
     * is covered by loaded tiles.
     *
     * @param viewport - Current viewport information
     * @param minDepth - Minimum octree depth to consider
     * @returns Coverage ratio (0-1)
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
     * Removes queued nodes that are outside the current viewport and re-sorts priorities.
     *
     * @param viewport - Current viewport information
     */
    pruneQueueForViewport(viewport: ViewportInfo): void;
    /**
     * Resets loaded node data to allow loading a new area.
     * Keeps hierarchy cache intact but clears loaded points and node states.
     *
     * @returns True if reset occurred
     */
    resetLoadedData(): boolean;
    /**
     * Gets the EPT metadata.
     */
    getMetadata(): EptMetadata | null;
    /**
     * Gets the extended EPT metadata for the metadata panel.
     *
     * @returns Extended EPT metadata or undefined if not initialized
     */
    getExtendedMetadata(): import('../core/types').EptExtendedMetadata | undefined;
    /**
     * Destroys the streaming loader and cleans up resources.
     */
    destroy(): void;
}
//# sourceMappingURL=EptStreamingLoader.d.ts.map