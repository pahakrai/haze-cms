import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoComplete, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

// redux
import {
  getSelectSearchVehicles,
  getResAllVehicle,
  getVehicleById
} from '../../Redux/selectors';
import { VehicleActions } from '../../Redux/Vehicle/actions';

import FieldLabel from '../../Components/Form/FieldLabel';
import { ErrorMessage } from '../../Components/Form/Errors';
import _FieldContainer from '../../Components/Form/FieldContainer';
import ContentLoader from '../../Components/Common/ContentLoader';

import { debounce } from './util';
const FieldContainer = styled(_FieldContainer)`
  position: relative;
  z-index: 0;
`;

class _SelectVehicle extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue, input, findVehicleById } = this.props;

    // default
    if (!defaultValue && input.value) {
      findVehicleById(input.value, { populates: ['make'] });
    }

    this.state = {
      vehicleOptions: [],
      displayValue: '' //defaultValue || ''
    };

    this._onSearchVehicle = debounce(this._onSearchVehicle, 700);
    this._onSearchVehicle();
  }

  // lose focus
  _onBlur = () => {
    const { input, allVehicle, intl } = this.props;
    const currentSelectVehicle = allVehicle.find(
      vehicle => vehicle && vehicle._id === input.value
    );

    if (currentSelectVehicle) {
      this.setState({
        displayValue: this.vehicleTextFormat(currentSelectVehicle, intl)
      }); //make
      input.onBlur(input.value);
    } else {
      input.onBlur('');
    }
  };

  // When typing in the input box keyboard
  _onChange = (value, option) => {
    this.setState({ displayValue: value ? option.label : '' });
  };

  // Selected
  _onSelect = value => {
    const { input } = this.props;
    input.onChange(value ? value : '');
  };

  // search
  _onSearchVehicle = (keywordForVehicle = '') => {
    const { vehicleOptions } = this.state;
    this.setState({
      keywordForVehicle
    });

    if (keywordForVehicle.length > 2) {
      this.props.searchVehicles(keywordForVehicle);
    } else if (vehicleOptions.length === 0) {
      this.props.searchVehicles('');
    }
  };

  vehicleTextFormat = (vehicle, intl) =>
    `${vehicle.plateNo}-${
      vehicle.make && vehicle.make.name ? vehicle.make.name[intl.locale] : ''
    }`; //make

  componentDidUpdate = (prevProps, prevState) => {
    const {
      defaultValue,
      defaultVehicle,
      input,
      findVehicleById,
      intl
    } = this.props;
    const { displayValue } = this.state;
    // const prevValue = prevProps.input ? prevProps.input.value : '';
    // const currValue = input ? input.value : '';
    const state = {};

    // update vehicleOptions
    if (prevProps.vehicleSearchResults !== this.props.vehicleSearchResults) {
      state.vehicleOptions = this.props.vehicleSearchResults.map(vehicle => ({
        value: vehicle._id,
        label: this.vehicleTextFormat(vehicle, intl)
      }));
    }

    // !props.defaultValue No default
    // !props.defaultVehicle No default user
    // Initial input.value update
    //    !prevProps.input.value No value before
    //    input.value Now has value
    if (
      !defaultValue &&
      !defaultVehicle &&
      (!prevProps.input || !prevProps.input.value) &&
      input &&
      input.value
      // prevValue !== currValue
    ) {
      // Re-request api to get user
      findVehicleById(input.value, { populates: ['make'] });
    }

    // !props.defaultValue No default
    // !state.displayValue No choice
    // Update displayValue when defaultVehicle is updated
    if (
      !defaultValue &&
      !displayValue &&
      defaultVehicle !== prevProps.defaultVehicle
    ) {
      if (defaultVehicle) {
        state.displayValue = this.vehicleTextFormat(defaultVehicle, intl);
      }
    }

    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  };

  render() {
    const {
      label,
      disabled,
      meta: { touched, error, warning },
      defaultValue,
      defaultVehicle,
      updateMode
    } = this.props;

    const { vehicleOptions, displayValue } = this.state;
    const loading = updateMode ? !defaultVehicle && !defaultValue : false;

    return loading ? (
      <ContentLoader
        height={8.5}
        width={100}
        speed={1.5}
        primaryColor="#f3f3f3"
        secondaryColor="#ececec"
      >
        <rect x="0" y="0" rx="0.25" ry="0.25" width="100" height="8.5" />
      </ContentLoader>
    ) : (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <AutoComplete
          options={vehicleOptions}
          onSelect={this._onSelect}
          onBlur={this._onBlur}
          value={displayValue}
          onSearch={this._onSearchVehicle}
          onChange={this._onChange}
          defaultValue={defaultValue}
          placeholder={<FormattedMessage id="search_vehicle" />}
          disabled={disabled}
          notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        />
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    );
  }
}

const mapStateToProps = (state, { input }) => {
  return {
    allVehicle: getResAllVehicle(state),
    vehicleSearchResults: getSelectSearchVehicles(state),
    defaultVehicle: getVehicleById(state, input.value)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchVehicles: q =>
        VehicleActions.searchSelectVehicles(
          { refresh: true, query: { populates: ['make'] } },
          q
        ),
      findVehicleById: VehicleActions.getVehicleById
    },
    dispatch
  );

export const SelectVehicle = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SelectVehicle);

export default props => {
  return <Field {...props} component={SelectVehicle} />;
};
