import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

/**
 * remove lodash property inside latlng
 * @param {Object} latlng lanlng object from google map api
 */
const parseLatLng = ({ lat, lng }) => {
  const latlng = { lat, lng };
  if (typeof lat === 'function') {
    latlng.lat = lat();
    latlng.lng = lng();
  }
  return latlng;
};
const LatlngShage = {
  lat: PropTypes.number,
  lng: PropTypes.number
};

const MapSearchInput = styled.input`
  position: absolute !important ;
  left: 10px !important;
  top: 26px !important;
  width: calc(100% - 20px) !important;
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    left: 193px !important;
    top: -15px !important;
    width: calc(100% - 250px) !important;
  }
  @media (max-width: ${props => props.theme.flexa.breakpoints.sm}rem) {
    left: 10px !important;
    top: 26px !important;
    width: calc(100% - 20px) !important;
  }
`;

/**
 * A re-usable map component
 */
class MapView extends React.PureComponent {
  static propTypes = {
    // array of marker that will add to map
    markers: PropTypes.arrayOf(PropTypes.shape(LatlngShage)),
    // handle action when map click
    onMapClicked: PropTypes.func,
    // called when user select a search result
    onSearchResultSelected: PropTypes.func,
    // center coordinate of MapView
    center: PropTypes.shape(LatlngShage),
    // default zoom level
    defaultZoom: PropTypes.number,
    // allow user perform search or not
    showSearchBox: PropTypes.bool
  };
  static defaultProps = {
    center: {
      lat: 22.3117615,
      lng: 114.22111
    },
    defaultZoom: 15,
    markers: [],
    onMapClicked: () => true,
    onSearchResultSelected: () => true,
    showSearchBox: false
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.searchbox = React.createRef();
  }

  /**
   * get latlng and place_id(if exist) from event object
   * @param {Event} event event object returned from Google map
   */
  onMapClicked(event) {
    const { onMapClicked } = this.props;

    onMapClicked(parseLatLng(event.latLng), event.placeId);
  }

  /**
   * triggered when user click on a search result, return address detail to parent component
   */
  async onSearchResultSelected() {
    const address = this.searchbox.current.getPlaces()[0];
    const location = parseLatLng(address.geometry.location);
    address.geometry.location = location;

    this.props.onSearchResultSelected(address);
  }

  renderSearchBox() {
    const { intl } = this.props;
    return (
      <SearchBox
        ref={this.searchbox}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={this.onSearchResultSelected.bind(this)}
      >
        <MapSearchInput
          type="text"
          placeholder={intl.formatMessage({ id: 'display_find_location' })}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `50%`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `3px 3px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>
    );
  }

  render() {
    const { center, markers, showSearchBox } = this.props;

    return (
      <GoogleMap
        center={center}
        defaultZoom={15}
        onClick={this.onMapClicked.bind(this)}
      >
        {showSearchBox && this.renderSearchBox()}
        {markers.map((marker, i) => (
          <Marker key={i} position={marker} />
        ))}
      </GoogleMap>
    );
  }
}

const WithHoc = withScriptjs(withGoogleMap(injectIntl(MapView)));
export default ({ height = 500, ...props }) => (
  <WithHoc
    // googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
    //   process.env.REACT_GOOGLEMAP_API_KEY
    // }&v=3.exp&libraries=geometry,drawing,places`}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places&region=hk`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `${height}px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...props}
  />
);
