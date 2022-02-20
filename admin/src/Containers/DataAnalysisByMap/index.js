import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  Fragment
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import MapComponent, { useMapEngine } from '../Form/SelectAddress/MapComponent';

import LocalLocationButton from './LocalLocationButton';
import MarkerInfoWindow from './MarkerInfoWindow';
import { useContainerSize, useMapEvent } from './MapUtils';

export const DataAnalysisByMap = ({
  data,
  intl,
  coordinates,
  setCoordinates,
  toolbar,
  onLoaded: onMapLoaded
}) => {
  const mapMarks = useMemo(() => [], []);
  const { containerHeight, measure } = useContainerSize();
  const engine = useMapEngine();

  const { onLoaded, onClick, common, setMapMark, loaded } = useMapEvent({
    engine,
    center: coordinates,
    onMapLoaded
  });
  const { getMapOptions, mapStyle, components } = useUtils({
    engine,
    containerHeight,
    data,
    loaded,
    setMapMark,
    coordinates,
    mapMarks,
    common
  });

  // coordinates change
  const onChange = useCallback(
    co => {
      setCoordinates(co);
      if (common.mapRef) {
        common.mapRef.panTo({ lat: co[1], lng: co[0] });
      }
    },
    [common, setCoordinates]
  );

  // add toolbar
  useEffect(() => {
    if (common?.mapRef && toolbar) {
      const engineSelf = engine.self();
      common.mapRef.controls[engineSelf.maps.ControlPosition.TOP_LEFT].push(
        toolbar
      );
    }
  }, [toolbar, common, engine, loaded]);

  return (
    <Conatienr>
      {components}
      {measure}
      {engine && (
        <MapComponent
          defaultZoom={16}
          lat={coordinates[1]}
          lng={coordinates[0]}
          engine={engine}
          onLoad={onLoaded}
          onClick={onClick}
          style={mapStyle}
          getMapOptions={getMapOptions}
        >
          <div style={{ visibility: 'hidden' }}>
            <LocalLocationButton
              onChange={onChange}
              params={common}
              engine={engine}
              intl={intl}
            />
          </div>
        </MapComponent>
      )}
    </Conatienr>
  );
};

const Conatienr = styled.div`
  position: relative;
  height: 100%;
  & .map_icon {
    margin-top: -35px;
  }
  & .gm-style-iw .gm-ui-hover-effect {
    width: 42px !important;
    & img {
      width: 25px !important;
      height: 25px !important;
    }
  }
`;

const useUtils = ({
  engine,
  containerHeight,
  data,
  loaded,
  setMapMark,
  coordinates,
  mapMarks,
  common
}) => {
  const [components, setComponents] = useState([]);
  const getMapOptions = useCallback(() => {
    const engineSelf = engine.self();
    if (!engineSelf) {
      return {};
    }
    return {
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: engineSelf.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: engineSelf.maps.ControlPosition.BOTTOM_CENTER
      },
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: engineSelf.maps.ControlPosition.BOTTOM_RIGHT
      }
    };
  }, [engine]);

  const mapStyle = useMemo(
    () => ({
      height: containerHeight,
      width: '100%',
      top: 0,
      position: 'absolute'
    }),
    [containerHeight]
  );

  // update map marks
  useEffect(() => {
    const engineSelf = engine.self();
    const components = [];
    if (loaded) {
      mapMarks.forEach(v => v?.setMap(null));
      mapMarks.splice(0);
      data.forEach((item, index) => {
        const icon = `${item?.icon}#${+new Date()}`;
        // marker
        const marker = setMapMark(item?.coordinates, {
          icon: {
            url: icon,
            scaledSize: { width: 25, height: 25 }
          }
        });

        // infoWindow
        const content = document.createElement(`div`);
        const infoWindow = new engineSelf.maps.InfoWindow({ content });

        if (marker) {
          mapMarks.push(marker);
          marker.addListener('click', () => {
            infoWindow.open(common.mapRef, marker);
          });
        }

        components.push(
          <Fragment key={index}>
            <IconStyle icon={icon} rotate={item?.meta?.vehicle?.heading} />
            <MarkerInfoWindow parent={content} meta={item.meta} />
          </Fragment>
        );
        setComponents(components);
      });
    }
  }, [data, loaded, setMapMark, coordinates, mapMarks, common, engine]);

  return { getMapOptions, mapStyle, components };
};

const IconStyle = createGlobalStyle`
  img[src="${({ icon }) => icon}"]{
    ${({ rotate }) => (rotate ? `transform:rotate(${rotate}deg);` : '')}
    object-fit: contain;
  }
`;

export default DataAnalysisByMap;
