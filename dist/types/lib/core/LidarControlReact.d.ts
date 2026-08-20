import { LidarControlReactProps } from './types';
/**
 * React wrapper component for LidarControl.
 *
 * This component manages the lifecycle of a LidarControl instance,
 * adding it to the map on mount and removing it on unmount.
 *
 * @example
 * ```tsx
 * import { LidarControlReact } from 'maplibre-gl-lidar/react';
 *
 * function MyMap() {
 *   const [map, setMap] = useState<Map | null>(null);
 *
 *   return (
 *     <>
 *       <div ref={mapContainer} />
 *       {map && (
 *         <LidarControlReact
 *           map={map}
 *           title="LiDAR Viewer"
 *           collapsed={false}
 *           onLoad={(pc) => console.log('Loaded:', pc)}
 *         />
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @param props - Component props including map instance and control options
 * @returns null - This component renders nothing directly
 */
export declare function LidarControlReact({ map, defaultUrl, onStateChange, onLoad, onError, onControlReady, ...options }: LidarControlReactProps): null;
//# sourceMappingURL=LidarControlReact.d.ts.map