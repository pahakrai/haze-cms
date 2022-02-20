import React, { Component, createRef } from 'react';
import debounce from 'lodash/debounce';
import { injectIntl } from 'react-intl';
import Common from '@golpasal/common';

import { useCurrentWorkspace } from '../../../Containers/Workspace/hooks';
import GoogleMapEngine from './GoogleMapEngine';

export class MapComponent extends Component {
  mapRef = null;
  mapObj = null;
  map_click_listener = null;

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
    this.mapRef = createRef();
    this._onClick = debounce(this._onClick, 500);
  }
  componentDidUpdate = prevProps => {
    const { lat, lng } = this.props;
    if (this.mapObj) {
      if (lat !== prevProps.lat || lng !== prevProps.lng) {
        this.mapObj.panTo({ lat, lng });
      }
    }
  };

  componentWillUnmount() {
    const { engine } = this.props;
    const engineSelf = engine.self();
    if (engineSelf) {
      engineSelf.maps.event.removeListener(this.map_click_listener);
    }
  }

  _onLoad = () => {
    const {
      onLoad,
      lat,
      lng,
      defaultZoom = 16,
      engine,
      getMapOptions
    } = this.props;
    const engineSelf = engine.self();
    const options = getMapOptions?.();
    this.mapObj = new engineSelf.maps.Map(this.mapRef.current, {
      zoom: defaultZoom,
      center: {
        lat,
        lng
      },
      ...options
    });

    this.map_click_listener = this.mapObj.addListener('click', this._onClick);

    onLoad(this.mapObj);
    this.setState({
      loaded: true
    });
  };

  _onClick = e => {
    const { onClick } = this.props;
    onClick(e);
  };

  render() {
    const { engine, intl, style, children } = this.props;
    const { loaded } = this.state;

    return (
      <>
        <div ref={this.mapRef} style={style}>
          {loaded && children}
        </div>
        {engine.loadMapEngineScript &&
          engine.loadMapEngineScript(intl.locale, this._onLoad)}
      </>
    );
  }
}

export const useMapEngine = () => {
  const workspace = useCurrentWorkspace();

  switch (workspace?.preferences?.mapType) {
    case Common.type.MapType.GOOGLE_MAP:
    default:
      return GoogleMapEngine;
  }
};

export default injectIntl(MapComponent);
