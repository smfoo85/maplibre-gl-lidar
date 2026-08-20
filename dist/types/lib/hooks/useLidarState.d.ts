import { LidarState, ColorScheme } from '../core/types';
/**
 * Custom hook for managing LiDAR state in React applications.
 *
 * This hook provides a simple way to track and update the state
 * of a LidarControl from React components.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, setPointSize, setColorScheme, toggle } = useLidarState();
 *
 *   return (
 *     <div>
 *       <button onClick={toggle}>
 *         {state.collapsed ? 'Expand' : 'Collapse'}
 *       </button>
 *       <button onClick={() => setColorScheme('intensity')}>
 *         Show Intensity
 *       </button>
 *       <LidarControlReact
 *         map={map}
 *         collapsed={state.collapsed}
 *         pointSize={state.pointSize}
 *         colorScheme={state.colorScheme}
 *         onStateChange={(newState) => setState(newState)}
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * @param initialState - Optional initial state values
 * @returns Object containing state and update functions
 */
export declare function useLidarState(initialState?: Partial<LidarState>): {
    state: LidarState;
    setState: import('react').Dispatch<import('react').SetStateAction<LidarState>>;
    setCollapsed: (collapsed: boolean) => void;
    setPanelWidth: (panelWidth: number) => void;
    setPointSize: (pointSize: number) => void;
    setOpacity: (opacity: number) => void;
    setColorScheme: (colorScheme: ColorScheme) => void;
    setUsePercentile: (usePercentile: boolean) => void;
    setElevationRange: (elevationRange: [number, number] | null) => void;
    setPointBudget: (pointBudget: number) => void;
    setZOffsetEnabled: (zOffsetEnabled: boolean) => void;
    setZOffset: (zOffset: number) => void;
    setTerrainEnabled: (terrainEnabled: boolean) => void;
    reset: () => void;
    toggle: () => void;
};
//# sourceMappingURL=useLidarState.d.ts.map