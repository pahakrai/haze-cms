import React from 'react';
import { withRouter } from 'react-router-dom';

import Modal from '../../Components/Modal';

import WorkspacePhoneRegionFormContainer from './WorkspacePhoneRegionForm';
class WorkspacePhoneRegionCreateButtonContainer extends React.PureComponent {
  render() {
    const { intl } = this.props;
    return (
      <Modal.Button
        modalStyle={{
          content: { width: '90%', margin: ' 0 auto' }
        }}
        text={intl.formatMessage({ id: 'create_btn' })}
        content={closeModal => (
          <WorkspacePhoneRegionFormContainer
            closeModal={closeModal}
            intl={intl}
          />
        )}
      />
    );
  }
}
export default withRouter(WorkspacePhoneRegionCreateButtonContainer);
