import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { getAllVehicleType } from '../../../../../Redux/selectors';
import { VehicleTypeActions } from '../../../../../Redux/VehicleType/actions';

import {
  HorizontalContainerWrapper,
  HorizontalContainer as Container
} from '../../../../Form/form.styled';
import { ErrorMessage } from '../../../../Form/Errors';

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const TypeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 16px;
  border-radius: 30px;
  user-select: none;
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
  color: ${({ active }) => (active ? '#000' : '#ccc')};
};
`;
const TypeItemImage = styled.img`
  width: 80px;
  min-height: 80px;
`;
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class VehicleTypeSelectComponent extends PureComponent {
  state = {
    options: []
  };
  componentDidMount() {
    this.props.getAllVehicleType({ isActive: true });
  }
  componentDidUpdate(prevProps) {
    const {
      intl,
      vehicleTypes,
      input: { onChange },
      updateMode
    } = this.props;
    if (
      vehicleTypes &&
      vehicleTypes.length &&
      prevProps.vehicleTypes !== vehicleTypes
    ) {
      const sort = [...vehicleTypes].sort((a, b) => a.idx - b.idx);

      this.setState({
        options: sort.map(type => ({
          ...type,
          label: type.name ? type.name[intl.locale] : '',
          value: type._id,
          icon: type.icon ? type.icon.uri : '',
          activeIcon: type.activeIcon ? type.activeIcon.uri : ''
        }))
      });
      if (!updateMode) {
        onChange(sort[0]._id);
      }
    }
  }

  render() {
    const {
      input: { value, onChange },
      meta: { touched, error, warning },
      disabled
    } = this.props;
    const { options } = this.state;
    const errorMessage =
      touched &&
      ((error && <ErrorMessage>{error}</ErrorMessage>) ||
        (warning && <ErrorMessage>{warning}</ErrorMessage>));

    return (
      <HorizontalContainerWrapper horizontal>
        <Container>
          <div>
            <TypeContainer>
              {options.map(v => {
                const active = value === v._id;
                return (
                  <TypeItem
                    disabled={disabled}
                    key={v.value}
                    onClick={() => {
                      if (!disabled) {
                        onChange(v._id);
                      }
                    }}
                    active={active}
                    style={{ marginRight: 20 }}
                  >
                    <TypeItemImage
                      alt=""
                      src={active ? v.activeIcon : v.icon}
                    />
                    <span>{v.label}</span>
                  </TypeItem>
                );
              })}
            </TypeContainer>
            <ErrorWrapper>{errorMessage}</ErrorWrapper>
          </div>
        </Container>
      </HorizontalContainerWrapper>
    );
  }
}
const mapStateToProps = (state, { orderId }) => {
  return {
    vehicleTypes: getAllVehicleType(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllVehicleType: VehicleTypeActions.getAllVehicleType
    },
    dispatch
  );

export const VehicleTypeSelect = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(props => {
  return <Field {...props} component={VehicleTypeSelectComponent} />;
});

export default VehicleTypeSelect;
