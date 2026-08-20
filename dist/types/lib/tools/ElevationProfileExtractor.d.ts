import { CrossSectionLine, ElevationProfile } from '../core/types';
import { PointCloudData } from '../loaders/types';
/**
 * Extracts elevation profile points from point cloud data along a cross-section line.
 * Calculates distances using Haversine formula and filters points within buffer distance.
 */
export declare class ElevationProfileExtractor {
    private static readonly EARTH_RADIUS_M;
    /**
     * Extracts points within the buffer distance of a cross-section line.
     *
     * @param line - The cross-section line definition
     * @param pointCloudData - The point cloud data to extract from
     * @param coordinateOrigin - The coordinate origin [lng, lat, z]
     * @returns Elevation profile with sorted points and statistics
     */
    static extract(line: CrossSectionLine, pointCloudData: PointCloudData, coordinateOrigin: [number, number, number]): ElevationProfile;
    /**
     * Calculates the Haversine distance between two WGS84 points.
     *
     * @param p1 - First point [lng, lat]
     * @param p2 - Second point [lng, lat]
     * @returns Distance in meters
     */
    static haversineDistance(p1: [number, number], p2: [number, number]): number;
    /**
     * Calculates the distance along a line and perpendicular offset from a point.
     *
     * @param point - The point [lng, lat]
     * @param lineStart - Line start [lng, lat]
     * @param lineEnd - Line end [lng, lat]
     * @param lineLengthSq - Squared length of line vector (for efficiency)
     * @param totalLineDistance - Total line distance in meters
     * @returns Distance along line (m) and perpendicular offset (m)
     */
    private static pointToLineDistance;
    /**
     * Calculates profile statistics.
     *
     * @param points - Profile points
     * @param totalDistance - Total line distance
     * @returns Statistics object
     */
    private static calculateStats;
    /**
     * Converts degrees to radians.
     *
     * @param degrees - Angle in degrees
     * @returns Angle in radians
     */
    private static toRadians;
    /**
     * Creates a buffer polygon around a line for visualization.
     * Returns GeoJSON coordinates for a polygon.
     *
     * @param line - The cross-section line
     * @param numPoints - Number of points for end caps
     * @returns GeoJSON polygon coordinates
     */
    static createBufferPolygon(line: CrossSectionLine, numPoints?: number): [number, number][];
    /**
     * Converts meters to approximate degrees at a given latitude.
     *
     * @param meters - Distance in meters
     * @param latitude - Latitude for conversion
     * @returns Approximate degrees
     */
    private static metersToDegrees;
}
//# sourceMappingURL=ElevationProfileExtractor.d.ts.map