import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Measure from 'react-measure';

export const useMapEvent = ({ engine, center, onMapLoaded }) => {
  // common
  // mapRef centerMarkRef
  const common = useMemo(() => ({}), []);
  const [loaded, setLoaded] = useState(false);
  const setMapMark = useCallback(
    (coordinates, opts = {}) => {
      const engineSelf = engine.self();
      if (
        common?.mapRef &&
        engineSelf &&
        coordinates &&
        coordinates.length > 1
      ) {
        const marker = new engineSelf.maps.Marker({
          position: { lat: coordinates[1], lng: coordinates[0] },
          map: common?.mapRef,

          ...opts
        });
        return marker;
      }
    },
    [engine, common]
  );

  const setCenterMark = useCallback(
    coordinates => {
      const { mapRef, centerMarkRef } = common;
      if (mapRef) {
        // clear marker
        centerMarkRef && centerMarkRef.setMap(null);
        // new marker
        common.centerMarkRef = setMapMark(coordinates, {
          // label: {
          //   text: intl.formatMessage({
          //     id: 'display_current_position'
          //   }),
          //   className: 'map_icon',
          //   color: 'red'
          // }
        });
      }
    },
    [setMapMark, common]
  );

  const onLoaded = useCallback(
    ref => {
      const engineSelf = engine.self();
      const ready = engineSelf && engineSelf.maps;
      if (ready) {
        common.mapRef = ref;
        onMapLoaded(ref);
        setLoaded(true);
      }
    },
    [engine, common, onMapLoaded]
  );

  const onClick = useCallback(e => {
    // if (common.mapRef) {
    //   const [lat, lng] = [e.latLng.lat(), e.latLng.lng()];
    // }
  }, []);

  // center change
  useEffect(() => {
    loaded && setCenterMark(center);
  }, [center, setCenterMark, loaded]);

  return { onClick, onLoaded, common, setMapMark, loaded };
};

export const useContainerSize = () => {
  const [size, setSize] = useState({ height: 0, width: 0 });

  const measure = (
    <Measure
      bounds
      onResize={contentRect => {
        setSize({
          height: contentRect.bounds.height,
          width: contentRect.bounds.width
        });
      }}
    >
      {({ measureRef }) => {
        return <div ref={measureRef} style={{ height: '100%' }}></div>;
      }}
    </Measure>
  );

  return { measure, containerWidth: size.width, containerHeight: size.height };
};
