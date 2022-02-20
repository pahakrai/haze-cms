/**
 * interface of GeoJSON object
 * ref: https://en.wikipedia.org/wiki/GeoJSON
 *      https://geojson.org/
 */
export interface Location {
  /**
   * GeoJSON standard type
   */
  type: string;

  /**
   * GeoJSON properties
   */
  properties: {
    /**
     * name of location
     * can be address, building name...etc
     */
    name: string;

    /**
     * district of the location
     * can be region name, or a Region object
     */
    district: string | any;

    /**
     * region tree of the location
     * can be region name list, or a Region array
     */
    regions: string[] | any[];

    /**
     * elevation of this location
     */
    elevation_m: number;
  };

  /**
   * GeoJSON geometry
   */
  geometry: {
    /**
     * geometry type
     */
    type: string;

    /**
     * [Longitude, Latitude] of location
     */
    coordinates: number[];
  };
}
