Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_LidarLayerAdapter = require("./LidarLayerAdapter-BgT-4Ef2.cjs");
let react = require("react");
//#region src/lib/core/LidarControlReact.tsx
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
function LidarControlReact({ map, defaultUrl, onStateChange, onLoad, onError, onControlReady, ...options }) {
	const controlRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		if (!map) return;
		const control = new require_LidarLayerAdapter.LidarControl(options);
		controlRef.current = control;
		if (onStateChange) control.on("statechange", (event) => {
			onStateChange(event.state);
		});
		if (onLoad) control.on("load", (event) => {
			if (event.pointCloud && "name" in event.pointCloud) onLoad(event.pointCloud);
		});
		if (onError) control.on("loaderror", (event) => {
			if (event.error) onError(event.error);
		});
		map.addControl(control, options.position || "top-right");
		if (onControlReady) onControlReady(control);
		const hasShareUrl = typeof window !== "undefined" && options.restoreFromUrl !== false && require_LidarLayerAdapter.hasLidarShareParams(window.location.href);
		if (defaultUrl && !hasShareUrl) control.loadPointCloud(defaultUrl).catch((err) => {
			console.error("Failed to load default URL:", err);
		});
		return () => {
			if (map.hasControl(control)) map.removeControl(control);
			controlRef.current = null;
		};
	}, [map]);
	(0, react.useEffect)(() => {
		if (controlRef.current) {
			const currentState = controlRef.current.getState();
			if (options.collapsed !== void 0 && options.collapsed !== currentState.collapsed) if (options.collapsed) controlRef.current.collapse();
			else controlRef.current.expand();
			if (options.pointSize !== void 0 && options.pointSize !== currentState.pointSize) controlRef.current.setPointSize(options.pointSize);
			if (options.opacity !== void 0 && options.opacity !== currentState.opacity) controlRef.current.setOpacity(options.opacity);
			if (options.colorScheme !== void 0 && options.colorScheme !== currentState.colorScheme) controlRef.current.setColorScheme(options.colorScheme);
		}
	}, [
		options.collapsed,
		options.pointSize,
		options.opacity,
		options.colorScheme
	]);
	return null;
}
//#endregion
//#region src/lib/hooks/useLidarState.ts
/**
* Default initial state for the LiDAR control
*/
var DEFAULT_STATE = {
	collapsed: true,
	panelWidth: 365,
	maxHeight: 500,
	pointClouds: [],
	activePointCloudId: null,
	pointSize: 2,
	opacity: 1,
	colorScheme: "elevation",
	colormap: "viridis",
	colorRange: {
		mode: "percentile",
		percentileLow: 2,
		percentileHigh: 98
	},
	showColorbar: true,
	usePercentile: true,
	elevationRange: null,
	pointBudget: 1e6,
	pickable: false,
	loading: false,
	error: null,
	zOffsetEnabled: false,
	zOffset: 0,
	hiddenClassifications: /* @__PURE__ */ new Set(),
	availableClassifications: /* @__PURE__ */ new Set(),
	terrainEnabled: false
};
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
function useLidarState(initialState) {
	const [state, setState] = (0, react.useState)({
		...DEFAULT_STATE,
		...initialState
	});
	return {
		state,
		setState,
		setCollapsed: (0, react.useCallback)((collapsed) => {
			setState((prev) => ({
				...prev,
				collapsed
			}));
		}, []),
		setPanelWidth: (0, react.useCallback)((panelWidth) => {
			setState((prev) => ({
				...prev,
				panelWidth
			}));
		}, []),
		setPointSize: (0, react.useCallback)((pointSize) => {
			setState((prev) => ({
				...prev,
				pointSize
			}));
		}, []),
		setOpacity: (0, react.useCallback)((opacity) => {
			setState((prev) => ({
				...prev,
				opacity
			}));
		}, []),
		setColorScheme: (0, react.useCallback)((colorScheme) => {
			setState((prev) => ({
				...prev,
				colorScheme
			}));
		}, []),
		setUsePercentile: (0, react.useCallback)((usePercentile) => {
			setState((prev) => ({
				...prev,
				usePercentile
			}));
		}, []),
		setElevationRange: (0, react.useCallback)((elevationRange) => {
			setState((prev) => ({
				...prev,
				elevationRange
			}));
		}, []),
		setPointBudget: (0, react.useCallback)((pointBudget) => {
			setState((prev) => ({
				...prev,
				pointBudget
			}));
		}, []),
		setZOffsetEnabled: (0, react.useCallback)((zOffsetEnabled) => {
			setState((prev) => ({
				...prev,
				zOffsetEnabled
			}));
		}, []),
		setZOffset: (0, react.useCallback)((zOffset) => {
			setState((prev) => ({
				...prev,
				zOffset
			}));
		}, []),
		setTerrainEnabled: (0, react.useCallback)((terrainEnabled) => {
			setState((prev) => ({
				...prev,
				terrainEnabled
			}));
		}, []),
		reset: (0, react.useCallback)(() => {
			setState({
				...DEFAULT_STATE,
				...initialState
			});
		}, [initialState]),
		toggle: (0, react.useCallback)(() => {
			setState((prev) => ({
				...prev,
				collapsed: !prev.collapsed
			}));
		}, [])
	};
}
//#endregion
//#region src/lib/hooks/usePointCloud.ts
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
function usePointCloud(options) {
	const [data, setData] = (0, react.useState)(null);
	const [loading, setLoading] = (0, react.useState)(false);
	const [error, setError] = (0, react.useState)(null);
	const [progress, setProgress] = (0, react.useState)(0);
	return {
		data,
		loading,
		error,
		progress,
		load: (0, react.useCallback)(async (source) => {
			setLoading(true);
			setError(null);
			setProgress(0);
			try {
				const result = await new require_LidarLayerAdapter.PointCloudLoader().load(source);
				setData(result);
				return result;
			} catch (err) {
				setError(err instanceof Error ? err : new Error(String(err)));
				return null;
			} finally {
				setLoading(false);
			}
		}, [options]),
		reset: (0, react.useCallback)(() => {
			setData(null);
			setLoading(false);
			setError(null);
			setProgress(0);
		}, [])
	};
}
//#endregion
exports.LidarControl = require_LidarLayerAdapter.LidarControl;
exports.LidarControlReact = LidarControlReact;
exports.LidarLayerAdapter = require_LidarLayerAdapter.LidarLayerAdapter;
exports.useLidarState = useLidarState;
exports.usePointCloud = usePointCloud;

//# sourceMappingURL=react.cjs.map