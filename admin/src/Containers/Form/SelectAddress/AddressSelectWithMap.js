import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import { FieldLabel } from '../../../Components/Form/form.styled';
import TextInput from '../../../Components/Common/TextInput';
import { ErrorMessage } from '../../../Components/Form/Errors';

import GoogleMapEngine from './GoogleMapEngine';
import AddressMapModal from './AddressMapModal';
import {
  FieldContainer,
  HorizontalContainer,
  HorizontalFieldLabel,
  TextInputWrapper,
  RequireMark
} from './index.styled';

export class AddressSelectWithMapComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { modalOpen: false };
  }
  onModalClose = () => {
    this.setState({
      modalOpen: false
    });
  };
  _getMapEngine = () => {
    const { mapEngine } = this.props;
    switch (mapEngine) {
      case 'google':
      default:
        return GoogleMapEngine;
    }
  };
  _onInputClick = () => {
    this.setState({
      modalOpen: true
    });
  };

  _onChange = value => {
    const {
      input: { onChange }
    } = this.props;

    onChange(value);
  };

  render() {
    const {
      hideLabel,
      label,
      labelStyle,
      intl,
      input: { value },
      meta: { touched, warning, error },
      requireMark,
      horizontal,
      containerStyle,
      renderRight,
      disabled
    } = this.props;
    const { modalOpen } = this.state;
    const engine = this._getMapEngine();

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

    const propertieName =
      (value && value.properties && value.properties.name) || '';
    return (
      <>
        <Container style={containerStyle}>
          {!hideLabel && labelComponent}
          <TextInputWrapper horizontal={horizontal}>
            <div style={{ flex: 1 }} onClick={this._onInputClick}>
              <TextInput
                disabled
                value={propertieName}
                onChange={this._onChange}
                placeholder={intl.formatMessage({
                  id: 'display_order_select_detail_address'
                })}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
            {renderRight && renderRight()}
            {horizontal && errorMessage}
          </TextInputWrapper>
          {!horizontal && errorMessage}
        </Container>
        <AddressMapModal
          intl={intl}
          title={label}
          open={modalOpen}
          engine={engine}
          value={value}
          onConfirm={this._onChange}
          onClose={this.onModalClose}
          disabled={disabled}
        />
      </>
    );
  }
}

const AddressSelectWithMap = props => {
  return <Field {...props} component={AddressSelectWithMapComponent} />;
};

export default AddressSelectWithMap;
