import { ColorRangeConfig, ColorScheme, ColormapName, LidarState } from '../core/types';
export declare const LIDAR_SHARE_PARAM = "lidar";
export declare const LIDAR_SHARE_VERSION = 1;
export interface LidarShareMapState {
    center: [number, number];
    zoom: number;
    bearing: number;
    pitch: number;
}
export interface LidarShareVisualization {
    pointSize: number;
    opacity: number;
    colorScheme: ColorScheme;
    colormap: ColormapName;
    colorRange: ColorRangeConfig;
    elevationRange: [number, number] | null;
    pickable: boolean;
    zOffsetEnabled: boolean;
    zOffset: number;
    terrainEnabled: boolean;
    hiddenClassifications: number[];
}
export interface LidarSharePayload {
    v: typeof LIDAR_SHARE_VERSION;
    map?: LidarShareMapState;
    pointClouds: string[];
    visualization: LidarShareVisualization;
}
export declare function createLidarSharePayload(state: LidarState, map?: LidarShareMapState, baseUrl?: string): LidarSharePayload;
export declare function encodeLidarSharePayload(payload: LidarSharePayload): string;
export declare function decodeLidarSharePayload(value: string): LidarSharePayload | null;
export declare function createLidarShareUrl(currentUrl: string, payload: LidarSharePayload): string;
export declare function parseLidarSharePayloadFromUrl(url: string): LidarSharePayload | null;
export declare function hasLidarShareParams(url: string): boolean;
//# sourceMappingURL=share-url.d.ts.map