import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { AutoComplete, Empty, Cascader } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { injectIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import Loading from 'react-loading';
// import styled, { createGlobalStyle } from 'styled-components';

import {
  getAllRegionsWithChildren,
  getSelectedRegionsByIds
} from '../../../Redux/selectors';
import RegionService from '../../../Services/APIServices/RegionService';
import { RegionActions } from '../../../Redux/Region/actions';
import helpers from '@golpasal/common/dist/helpers';
import { FieldLabel } from '../../../Components/Form/form.styled';
import { ErrorMessage } from '../../../Components/Form/Errors';
import GoogleMapEngine from './GoogleMapEngine';
import {
  GlobalStyle,
  FieldContainer,
  HorizontalContainer,
  HorizontalFieldLabel,
  TextInputWrapper,
  RequireMark,
  HorizontalContainerWrapper
} from './index.styled';

import LocalLocationButton from './LocalLocationButton';

const TextInputContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class _SelectAddress extends PureComponent {
  static defaultProps = {
    maxRegionLevels: 4,
    mapEngine: process.env.REACT_APP_SEARCH_ADDRESS_MAP_ENGINE,
    showDetailedAddressInput: true
  };

  constructor(props) {
    super(props);

    this.googleGeocoder = new helpers.GoogleGeoCoder(
      process.env.REACT_APP_GOOGLEMAP_API_KEY,
      props.intl.locale
    );

    this.state = {
      data: [],
      selectedRegionOptions: this.props.selectedRegionsDetail
        ? this.props.selectedRegionsDetail
        : [],
      location: {
        type: 'Feature',
        properties: {
          name: ''
        },
        geometry: {
          type: 'Point',
          coordinates: []
        },
        ...props.input.value
      }
    };
    this._searchAddress = debounce(this._searchAddress, 500);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedRegionsDetail !== prevState.selectedRegionOptions) {
      return {
        ...prevState,
        selectedRegionOptions: nextProps.selectedRegionsDetail
          ? nextProps.selectedRegionsDetail
          : [],
        location: nextProps.input.value
      };
    }
    return null;
  }

  componentDidMount() {
    const { getAllRegionsWithChildren, initializationData = true } = this.props;
    initializationData && getAllRegionsWithChildren();
  }

  _getMapEngine = () => {
    const { mapEngine } = this.props;
    switch (mapEngine) {
      case 'google':
      default:
        return GoogleMapEngine;
    }
  };

  _searchAddress = value => {
    const { selectedRegionOptions } = this.state;
    const { display_language } = this.props;
    const regionsDisplay = selectedRegionOptions.map(
      s => s.name && s.name[display_language]
    );
    const MapEngine = this._getMapEngine();
    MapEngine.searchAddress(regionsDisplay, value, data =>
      this.setState({ data })
    );
  };

  _onSelect = selectedValue => {
    const {
      input: { onChange, value }
    } = this.props;
    const selectedDisplayName = this.getSelectedAddressNameByPlaceId(
      selectedValue
    );
    const MapEngine = this._getMapEngine();
    MapEngine.selectAddress(selectedValue, ({ coordinates }) =>
      RegionService.getDistrictByCoordinates(coordinates).then(response => {
        if (response.status === 200) {
          let district = null;
          const districts = response.data;
          if (Array.isArray(districts) && districts[0]) {
            district = districts[0]._id;
          }
          const properties = {
            ...value.properties,
            regions: [...value.properties.regions],
            name: selectedDisplayName
          };
          if (district) {
            properties.district = district;
            properties.regions.push(district);
          }
          onChange({
            type: 'text',
            ...value,
            geometry: {
              type: 'Point',
              coordinates
            },
            properties
          });
        }
      })
    );
  };

  getSelectedAddressNameByPlaceId = placeId => {
    const { data } = this.state;
    const selectedDisplayName = data.find(d => d.value === placeId);
    return selectedDisplayName && selectedDisplayName.label
      ? selectedDisplayName.label
      : null;
  };

  _onSearchAddressChange = displayValue => {
    const selectedDisplayName = this.getSelectedAddressNameByPlaceId(
      displayValue
    );
    displayValue = selectedDisplayName ? selectedDisplayName : displayValue;
    this.setState({
      location: {
        ...this.state.location,
        properties: {
          ...this.state.location.properties,
          name: displayValue
        }
      }
    });
  };

  _onBlur = displayValue => {
    const {
      input: { onChange, value }
    } = this.props;
    onChange({
      ...value,
      ...this.state.location
    });
  };

  _onChangeRegion = (selectedValue, selectedOptions) => {
    const {
      input: { onChange, value },
      intl,
      showDetailedAddressInput
    } = this.props;
    const district = selectedOptions[selectedOptions.length - 1];
    const locationData = {
      ...value,
      type: 'text',
      properties: {
        name: showDetailedAddressInput
          ? ''
          : (district && district.name && district.name[intl.locale]) || '',
        country:
          (selectedOptions && selectedOptions[0] && selectedOptions[0]._id) ||
          '',
        state:
          (selectedOptions && selectedOptions[1] && selectedOptions[1]._id) ||
          '',
        city:
          (selectedOptions && selectedOptions[2] && selectedOptions[2]._id) ||
          '',
        district: (district && district._id) || '',
        regions: selectedOptions.map(o => o._id)
      },
      geometry: {
        type: 'Point',
        coordinates: showDetailedAddressInput
          ? []
          : (district &&
              district.location &&
              district.location.geometry &&
              district.location.geometry.coordinates) ||
            []
      }
    };
    this.setState(
      {
        selectedRegionOptions: selectedOptions,
        location: locationData,
        data: []
      },
      () => {
        onChange(locationData);
      }
    );
  };

  _renderMapEngineScript = () => {
    const { display_language } = this.props;
    const MapEngine = this._getMapEngine();
    return (
      MapEngine.loadMapEngineScript &&
      MapEngine.loadMapEngineScript(display_language)
    );
  };

  render() {
    const { data, location } = this.state;
    const {
      intl,
      input: { value, onChange },
      meta: { touched, warning, error },
      hideLabel = false,
      horizontal = false,
      labelStyle,
      label,
      detailLabel,
      requireMark = false,
      display_language,
      options,
      maxRegionLevels,
      disabled,
      renderRight,
      showLocalLocationButton = true,
      showDetailedAddressInput,
      theme,
      containerStyle
    } = this.props;
    const isRegionSelected =
      value.properties &&
      value.properties.regions &&
      value.properties.regions.length > 0;
    const handleMaxLayer = (options, max, currentLayer = 0) => {
      const isCurrentLayerMax = currentLayer >= max - 1;
      return options.map(o => ({
        ...o,
        [`name_${display_language}`]:
          o.name && o.name[display_language] ? o.name[display_language] : '',
        children:
          isCurrentLayerMax || !o.children
            ? undefined
            : handleMaxLayer(o.children, max, currentLayer + 1)
      }));
    };

    const opts =
      maxRegionLevels && options
        ? handleMaxLayer(options, maxRegionLevels)
        : options;

    // ui
    let Container = FieldContainer;
    let Label = FieldLabel;
    const errorMessage =
      touched &&
      ((error && <ErrorMessage>{error}</ErrorMessage>) ||
        (warning && <ErrorMessage>{warning}</ErrorMessage>));

    if (horizontal) {
      Container = HorizontalContainer;
      Label = HorizontalFieldLabel;
    }

    const labelComponent = (
      <Label style={labelStyle}>
        {requireMark && <RequireMark>*</RequireMark>}
        {label ||
          intl.formatMessage({
            id: 'display_order_district'
          })}
      </Label>
    );

    return (
      <FieldContainer containerStyle={containerStyle}>
        <HorizontalContainerWrapper
          horizontal={horizontal}
          style={!showDetailedAddressInput ? { marginBottom: 0 } : {}}
        >
          <Container>
            <GlobalStyle />
            {!hideLabel && labelComponent}
            {options.length === 0 ? (
              <Loading
                type="spokes"
                color={theme.color.primary}
                height={15}
                width={15}
              />
            ) : (
              <TextInputWrapper horizontal={horizontal}>
                <TextInputContentWrapper>
                  <div style={{ flex: 1 }}>
                    <Cascader
                      disabled={disabled}
                      fieldNames={{
                        label: `name_${display_language}`,
                        value: '_id',
                        children: 'children'
                      }}
                      options={opts}
                      value={JSON.parse(
                        JSON.stringify(
                          (value &&
                            value.properties &&
                            value.properties.regions) ||
                            []
                        )
                      )}
                      onChange={this._onChangeRegion}
                      placeholder={intl.formatMessage({
                        id: 'display_order_select_region'
                      })}
                      style={{ width: '100%' }}
                    />
                    {(!isRegionSelected || !showDetailedAddressInput) &&
                      !horizontal &&
                      errorMessage}
                  </div>
                  {renderRight && renderRight()}
                  {showLocalLocationButton && (
                    <LocalLocationButton
                      style={{ marginLeft: 15 }}
                      intl={intl}
                      googleGeocoder={this.googleGeocoder}
                      onChange={location =>
                        this.setState({ location }, () =>
                          onChange(this.state.location)
                        )
                      }
                    />
                  )}
                </TextInputContentWrapper>
              </TextInputWrapper>
            )}
          </Container>
        </HorizontalContainerWrapper>
        {showDetailedAddressInput && isRegionSelected && (
          <Container>
            <Label style={labelStyle}>
              {detailLabel ||
                intl.formatMessage({
                  id: 'display.order.detail_address'
                })}
            </Label>
            <TextInputWrapper horizontal={horizontal}>
              <AutoComplete
                disabled={disabled}
                options={data}
                onSelect={this._onSelect}
                value={
                  (location &&
                    location.properties &&
                    location.properties.name) ||
                  ''
                }
                onBlur={this._onBlur}
                onSearch={this._searchAddress}
                onChange={this._onSearchAddressChange}
                placeholder={intl.formatMessage({
                  id: 'display_order_select_detail_address'
                })}
                style={{ width: '100%' }}
                notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
              />
              {horizontal && errorMessage}
            </TextInputWrapper>
            {isRegionSelected && !horizontal && errorMessage}
          </Container>
        )}
        <div id="map" style={{ display: 'none' }} />
        {this._renderMapEngineScript()}
      </FieldContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  options: getAllRegionsWithChildren(state),
  selectedRegionsDetail: getSelectedRegionsByIds(
    state,
    ownProps.input &&
      ownProps.input.value &&
      ownProps.input.value.properties &&
      ownProps.input.value.properties.regions
  ),
  display_language: ownProps.intl ? ownProps.intl.locale : ''
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllRegionsWithChildren: RegionActions.getAllRegionsWithChildren
    },
    dispatch
  );

export const SelectAddress = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(injectIntl(_SelectAddress)));

export default props => {
  return <Field {...props} component={SelectAddress} />;
};
