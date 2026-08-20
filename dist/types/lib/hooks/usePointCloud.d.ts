import { PointCloudData, LoaderOptions } from '../loaders/types';
/**
 * Result of the usePointCloud hook
 */
interface UsePointCloudResult {
    /** The loaded point cloud data or null */
    data: PointCloudData | null;
    /** Whether loading is in progress */
    loading: boolean;
    /** Error if loading failed */
    error: Error | null;
    /** Loading progress (0-1) */
    progress: number;
    /** Function to load a point cloud */
    load: (source: string | File | ArrayBuffer) => Promise<PointCloudData | null>;
    /** Function to reset the state */
    reset: () => void;
}
/**
 * Custom hook for loading point cloud data in React applications.
 *
 * This hook provides a simple way to load point cloud files
 * with loading state and error handling.
 *
 * @example
 * ```tsx
 * function PointCloudLoader() {
 *   const { data, loading, error, load, reset } = usePointCloud();
 *
 *   const handleFile = async (file: File) => {
 *     const result = await load(file);
 *     if (result) {
 *       console.log(`Loaded ${result.pointCount} points`);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <input type="file" onChange={(e) => handleFile(e.target.files?.[0])} />
 *       {loading && <p>Loading...</p>}
 *       {error && <p>Error: {error.message}</p>}
 *       {data && <p>Loaded {data.pointCount} points</p>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param options - Optional loader options
 * @returns Object containing state and functions
 */
export declare function usePointCloud(options?: Partial<LoaderOptions>): UsePointCloudResult;
export {};
//# sourceMappingURL=usePointCloud.d.ts.map