import React, { PureComponent, createRef } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import Common from '@golpasal/common';

import {
  HorizontalContainerWrapper,
  HorizontalContainer as Container
} from '../../../../Form/form.styled';
import { ErrorMessage } from '../../../../Form/Errors';
import { withFormValues } from '../../../../Form/utils';
import AntdDropdown from '../../../../Common/AntdDropdown';
import { getVehicleTypeById } from '../../../../../Redux/selectors';

const { BookType } = Common.type;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const TypeItem = styled.div`
  padding: 5px 17px;
  border: 1px solid
    ${({ active, theme }) => (active ? theme.color.primary : '#999')};
  border-radius: 30px;
  user-select: none;
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
  color: ${({ active }) => (active ? '#fff' : '#999')};
  background-color: ${({ active, theme }) =>
    active ? theme.color.primary : '#fff'};
`;

const HOURS_OPTIONS = Array(47)
  .fill('')
  .map((v, index) => ({
    label: (
      <span>
        {(index + 2) / 2}{' '}
        <FormattedMessage id={index === 0 ? 'hour' : 'hours'} />
      </span>
    ),
    value: ((index + 2) / 2) * 3600000
  }));

class OrderDurationComponent extends PureComponent {
  root = createRef();
  componentDidUpdate(prevProps) {
    const { formVehicleType, vehicleType, formValueChange } = this.props;
    if (
      formVehicleType !== prevProps.formVehicleType &&
      vehicleType &&
      vehicleType.bookTypes &&
      vehicleType.bookTypes[0]
    ) {
      if (vehicleType.bookTypes[0] === BookType.ROUTE) {
        formValueChange('time.duration', 0);
      } else if (vehicleType.bookTypes[0] === BookType.HOUR) {
        formValueChange('time.duration', 1 * 3600 * 1000);
      }
    }
  }
  render() {
    const {
      input,
      meta: { touched, error, warning },
      disabled,
      vehicleType
    } = this.props;

    const errorMessage =
      touched &&
      ((error && <ErrorMessage>{error}</ErrorMessage>) ||
        (warning && <ErrorMessage>{warning}</ErrorMessage>));
    let hours = '';
    if (input.value) {
      const h = Number(input.value) / (3600 * 1000);
      hours = (
        <span>
          {'  '}
          {h} <FormattedMessage id={h === 0 ? 'hour' : 'hours'} />
        </span>
      );
    }

    const hasHour =
      vehicleType && vehicleType.bookTypes.includes(BookType.HOUR);

    return (
      <HorizontalContainerWrapper horizontal>
        <Container>
          <TypeContainer ref={this.root}>
            <TypeItem
              disabled={disabled}
              onClick={() => {
                !disabled && input.onChange(0);
              }}
              active={input.value === 0}
              style={{ marginRight: 20 }}
            >
              <FormattedMessage id="display_order_route" />
            </TypeItem>
            {hasHour && (
              <AntdDropdown
                options={HOURS_OPTIONS}
                disabled={disabled}
                overlayStyle={{
                  height: 150,
                  overflow: 'scroll',
                  boxShadow:
                    '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)'
                }}
                getPopupContainer={() => this.root && this.root.current}
                onSelect={({ value }) => {
                  input.onChange(value);
                }}
              >
                <TypeItem disabled={disabled} active={input.value > 0}>
                  <FormattedMessage id="display_order_baozhong" />
                  {hours}
                </TypeItem>
              </AntdDropdown>
            )}
          </TypeContainer>
          {errorMessage}
        </Container>
      </HorizontalContainerWrapper>
    );
  }
}
export const OrderDuration = compose(
  withFormValues({
    fields: [['logistic.vehicleType', 'formVehicleType']]
  }),
  connect((state, { formVehicleType }) => {
    return {
      vehicleType: getVehicleTypeById(state, formVehicleType)
    };
  })
)(props => {
  return <Field {...props} component={OrderDurationComponent} />;
});
export default OrderDuration;
