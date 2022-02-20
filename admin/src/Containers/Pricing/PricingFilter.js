import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Row, Col, AutoComplete, Empty } from 'antd';
// intl
import Button from '../../Components/Common/Button';
import { RegionActions } from '../../Redux/Region/actions';
import { VehicleTypeActions } from '../../Redux/VehicleType/actions';
import { PrcingsActions } from '../../Redux/Pricing/actions';
import { getDistrict, getAllVehicleTypes } from '../../Redux/selectors';

import Title from '../../Components/Common/H5';

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`;
class PricingFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchLoFr: [],
      searchLoTo: [],
      searchVehicle: []
    };
  }
  componentDidMount() {
    const {
      regions,
      vehicles,
      getAllVehicleTypes,
      getAllDistrict
    } = this.props;
    if (!regions || !regions.length) getAllDistrict();
    if (!vehicles || !vehicles.length) getAllVehicleTypes({ isActive: true });
  }
  _onChanged = value => {
    this.setState({ ...value });
  };
  _search = () => {
    const { getPricingsList, vehicleType, locTo, locFr } = this.props;
    getPricingsList({
      refresh: true,
      filterValues: {
        populates: ['pricing', 'vehicleType', 'regionA', 'regionB'],
        vehicleType: vehicleType,
        locTo: locTo,
        locFr: locFr
      }
    });
  };
  _searchLoFr = keyword => {
    const { regions, intl } = this.props;
    let data = regions.filter(
      item => item.name[intl.locale].indexOf(keyword) >= 0
    );
    let value = data.length
      ? data.map(regions => ({
          value: regions.id,
          label: regions.name[intl.locale]
        }))
      : [];
    this.setState({ searchLoFr: value });
  };
  _searchLoTo = keyword => {
    const { regions, intl } = this.props;
    let data = regions.filter(
      item => item.name[intl.locale].indexOf(keyword) >= 0
    );
    let value = data.length
      ? data.map(regions => ({
          value: regions.id,
          label: regions.name[intl.locale]
        }))
      : [];
    this.setState({ searchLoTo: value });
  };
  _searchVehicle = keyword => {
    const { vehicles, intl } = this.props;
    let data = vehicles.filter(
      item => item.name[intl.locale].indexOf(keyword) >= 0
    );
    let value = data.length
      ? data.map(vehicles => ({
          value: vehicles._id,
          label: vehicles.name[intl.locale]
        }))
      : [];
    this.setState({ searchVehicle: value });
  };
  render() {
    const { intl, regions, vehicles, _onChanged } = this.props;
    const { searchLoFr, searchLoTo, searchVehicle } = this.state;
    const locale = intl.locale;
    const regionsSource =
      regions &&
      regions.length &&
      regions.map(regions => ({
        value: regions._id,
        label: regions.name[locale]
      }));
    const vehiclesSource =
      vehicles &&
      vehicles.length &&
      vehicles.map(vehicles => ({
        value: vehicles._id,
        label: vehicles.name[locale]
      }));
    return (
      <Row>
        <Col xs={24} span={8}>
          <FilterLabel>
            {intl.formatMessage({ id: 'display_vehicle_category' })}
          </FilterLabel>
          <AutoComplete
            style={{ width: '100%' }}
            options={
              searchVehicle && searchVehicle.length
                ? searchVehicle
                : vehiclesSource
            }
            placeholder={intl.formatMessage({
              id: 'display_select_vehicle_type'
            })}
            onChange={(value, option) =>
              _onChanged({ vehicleType: value ? option.label : '' })
            }
            onSearch={keyword => this._searchVehicle(keyword)}
            // onSearch={keyword => this.setState({ vehicleType: keyword })}
            allowClear
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          />
          <FilterLabel>
            {intl.formatMessage({ id: 'display_from2' })}
          </FilterLabel>
          <AutoComplete
            style={{ width: '100%' }}
            options={
              searchLoTo && searchLoTo.length ? searchLoTo : regionsSource
            }
            placeholder={intl.formatMessage({
              id: 'display_select_end_address'
            })}
            onChange={(value, option) =>
              _onChanged({ locTo: value ? option.label : '' })
            }
            onSearch={keyword => this._searchLoTo(keyword)}
            allowClear
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          />
          <FilterLabel>{intl.formatMessage({ id: 'display_to' })}</FilterLabel>
          <AutoComplete
            style={{ width: '100%' }}
            options={
              searchLoFr && searchLoFr.length ? searchLoFr : regionsSource
            }
            placeholder={intl.formatMessage({
              id: 'display_select_start_address'
            })}
            onChange={(value, option) =>
              _onChanged({ locFr: value ? option.label : '' })
            }
            onSearch={keyword => this._searchLoFr(keyword)}
            allowClear
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          />
          <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Col style={{ marginTop: '20px' }}>
              <Button.Primary type="submit" onClick={this._search}>
                {intl.formatMessage({ id: 'display_find' })}
              </Button.Primary>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  regions: getDistrict(state),
  vehicles: getAllVehicleTypes(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPricingsList: PrcingsActions.getPricingsList,
      getAllDistrict: RegionActions.getAllDistrict,
      getAllVehicleTypes: VehicleTypeActions.getAllVehicleTypes
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PricingFilter);
