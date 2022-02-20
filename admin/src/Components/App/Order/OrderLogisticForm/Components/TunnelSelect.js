import React, { PureComponent, Fragment } from 'react';
import { Field } from 'redux-form';
import { hasIn } from 'lodash';
import { FaChevronRight } from 'react-icons/fa';
import { withFormValues } from '../../../../Form/utils';

import Modal from '../../../../Modal';
import {
  ServiceItem,
  Actions,
  Price,
  Label
} from '../../../../../Containers/Service/SelectServices';

import TunnelSelectList from './TunnelSelectList';

export class TunnelSelectComponent extends PureComponent {
  state = {
    modalOpen: false
  };
  render() {
    const { input, intl, vehicleTypeId, label } = this.props;
    const { modalOpen } = this.state;
    if (!vehicleTypeId) {
      return <></>;
    }
    return (
      <Fragment>
        <ServiceItem
          style={{ cursor: 'pointer' }}
          onClick={() => this.setState({ modalOpen: true })}
        >
          <div>
            <Label>{label}</Label>
          </div>
          <Actions>
            <Price>
              $
              {hasIn(input, 'value.map')
                ? input.value.reduce((a, b) => a + b.amount || 0, 0)
                : ''}
            </Price>
            <FaChevronRight size={12} color="#999" />
          </Actions>
        </ServiceItem>
        <Modal.Default
          shouldOpenModal={modalOpen}
          title={label}
          onModalClose={() => this.setState({ modalOpen: false })}
          content={closeModal => (
            <TunnelSelectList
              intl={intl}
              vehicleType={vehicleTypeId}
              selected={(input.value || []).map(v => v.tunnel)}
            />
          )}
        />
      </Fragment>
    );
  }
}
export const TunnelSelect = withFormValues({
  fields: [['logistic.vehicleType', 'vehicleTypeId']]
})(props => {
  return <Field {...props} component={TunnelSelectComponent} />;
});

export default TunnelSelect;
