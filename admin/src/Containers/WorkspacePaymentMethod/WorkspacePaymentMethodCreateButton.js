import React from 'react';
import { withRouter } from 'react-router-dom';

import Modal from '../../Components/Modal';

// import { CreateButton } from '../../Components/Common/FilterLayout';
import WorkspacePaymentMethodFormContainer from './WorkspacePaymentMethodForm';
class WorkspacePaymentMethodCreateButtonContainer extends React.PureComponent {
  render() {
    const { intl } = this.props;
    return (
      <Modal.Button
        modalStyle={{
          content: { width: '90%', margin: ' 0 auto' }
        }}
        text={intl.formatMessage({ id: 'create_btn' })}
        content={closeModal => (
          <WorkspacePaymentMethodFormContainer
            closeModal={closeModal}
            intl={intl}
          />
        )}
      />
    );
  }
}
export default withRouter(WorkspacePaymentMethodCreateButtonContainer);
