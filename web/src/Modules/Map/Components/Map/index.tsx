import React, { DetailedHTMLProps, HTMLAttributes } from "react";

import GoogleMapReact, { Coords } from "google-map-react";

import getConfig from "next/config";
import { Marker } from "./Marker";

const { publicRuntimeConfig: Config } = getConfig();

interface MapProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  defaultCenter: Coords;
}
export const Map = ({ defaultCenter, ...rest }: MapProps) => {
  return (
    <div {...rest}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: Config.GEO_API_KEY }}
        defaultZoom={14}
        defaultCenter={defaultCenter}
      >
        <Marker lat={defaultCenter.lat} lng={defaultCenter.lng} />
      </GoogleMapReact>
    </div>
  );
};
