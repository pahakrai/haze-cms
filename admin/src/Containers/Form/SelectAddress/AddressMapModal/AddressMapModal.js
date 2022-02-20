import React, { PureComponent } from 'react';
import { helpers } from '@golpasal/common';
import debounce from 'lodash/debounce';

import { toast } from '../../../../Lib/Toast';
import { defaultMapCoordinates } from '../../../../Lib/util';
import Modal from '../../../../Components/Modal';
import Button from '../../../../Components/Common/Button';

import { GlobalStyle } from '../index.styled';
import SearchInput from './SearchInput';
import MapComponent from '../MapComponent';

class ModalContent extends PureComponent {
  mapObj = null;
  valueMark = null;
  googleGeocoder = null;

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      searchResult: [],
      selectLoading: false
    };
    this.googleGeocoder = new helpers.GoogleGeoCoder(
      process.env.REACT_APP_GOOGLEMAP_API_KEY,
      this.props.intl.locale
    );
    this.onSearch = debounce(this.onSearch, 500);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (value !== prevProps.value) {
      this.setInitValue(value);
    }
  }

  _onMapLoad = map => {
    const { engine } = this.props;
    const engineSelf = engine.self();
    const ready = engineSelf && engineSelf.maps;

    if (ready) {
      this.mapObj = map;
      this.setInitValue(this.props.value);
    }
  };

  setInitValue = value => {
    this.setState({ value });
    if (value.geometry && value.geometry.coordinates) {
      this.setMapMark(value.geometry.coordinates);
    }
  };

  _onClickMap = async e => {
    const { intl, disabled } = this.props;
    if (this.mapObj && !disabled) {
      try {
        this.setState({ selectLoading: true });
        const [lat, lng] = [e.latLng.lat(), e.latLng.lng()];
        const value = await this.googleGeocoder.getByLatlng(
          lat,
          lng,
          intl.locale
        );
        if (!(value && value.properties && value.properties.mapResult)) {
          toast.error(
            intl.formatMessage({ id: 'msg.location_info_not_exist' })
          );
        } else {
          this.setMapMark([lng, lat]);
          this.setState({ value: value });
        }
      } finally {
        this.setState({ selectLoading: false });
      }
    }
  };

  setMapMark = coordinates => {
    const { engine } = this.props;
    const engineSelf = engine.self();
    if (engineSelf && coordinates && coordinates.length > 1) {
      this.valueMark && this.valueMark.setMap(null);
      this.valueMark = placeMarker(coordinates, this.mapObj, engineSelf);
    }
  };

  onSelect = async place_id => {
    this.setState({ selectLoading: true });
    try {
      const result = await this.googleGeocoder.getByPlaceId(place_id);

      this.setMapMark(result && result.geometry && result.geometry.coordinates);
      this.setState({ value: result, selectLoading: false });
    } catch (e) {
      this.setState({ value: null, selectLoading: false });
    }
  };

  onSearch = async keyword => {
    const { engine } = this.props;
    const engineSelf = engine.self();
    this.setState({ searchLoading: true });
    try {
      if (keyword && keyword.length > 0) {
        // const result = await this.googleGeocoder.autoCompletePlace(keyword);
        // console.log('result', result);

        const GoogleMaps = engineSelf && engineSelf.maps;
        const service = new GoogleMaps.places.AutocompleteService();
        service.getQueryPredictions(
          {
            input: keyword
          },
          result => {
            if (Array.isArray(result)) {
              this.setState({ searchResult: result });
            }
          }
        );
      } else {
        this.setState({ searchResult: [] });
      }
    } finally {
      this.setState({ searchLoading: false });
    }
  };

  _onConfirm = () => {
    const { onConfirm, onClose } = this.props;
    onConfirm(this.state.value);
    onClose();
  };

  render() {
    const { engine, intl, disabled } = this.props;
    const { searchResult, selectLoading, value, searchLoading } = this.state;

    return (
      <div>
        <GlobalStyle />
        <SearchInput
          loading={selectLoading}
          disabled={disabled}
          searchLoading={searchLoading}
          value={(value && value.properties && value.properties.name) || ''}
          onSearch={this.onSearch}
          onSelect={this.onSelect}
          result={searchResult}
          intl={intl}
        />
        <MapComponent
          lat={
            (value && value.geometry && value.geometry.coordinates[1]) ||
            defaultMapCoordinates[1]
          }
          lng={
            (value && value.geometry && value.geometry.coordinates[0]) ||
            defaultMapCoordinates[0]
          }
          engine={engine}
          intl={intl}
          onLoad={this._onMapLoad}
          onClick={this._onClickMap}
          style={{ height: 500, marginTop: 10 }}
        />
        <Button.Center topMargin>
          <Button.Primary
            margin={false}
            onClick={this._onConfirm}
            disabled={selectLoading || disabled}
          >
            {intl.formatMessage({ id: 'confirm' })}
          </Button.Primary>
        </Button.Center>
      </div>
    );
  }
}

function placeMarker(coordinates, map, google) {
  const mark = new google.maps.Marker({
    position: { lat: coordinates[1], lng: coordinates[0] },
    map: map
  });

  return mark;
}

const AddressMapModal = ({ open, onClose, title, ...props }) => {
  return (
    <Modal.Default
      shouldOpenModal={open}
      title={title || 'Map'}
      contentStyle={{ maxWidth: 600, width: '100%' }}
      onModalClose={onClose}
      content={closeModal => {
        return <ModalContent {...props} onClose={onClose} />;
      }}
    />
  );
};

export default AddressMapModal;
