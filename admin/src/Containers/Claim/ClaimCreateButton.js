import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

import { CreateButton } from '../../Components/Common/FilterLayout';

class ClaimCreateButton extends React.PureComponent {
  goToCreate = () => {
    const { history } = this.props;
    history.push('/claims/create');
  };

  render() {
    const { intl } = this.props;
    return (
      <CreateButton type="button" onClick={this.goToCreate}>
        <AiOutlinePlus /> {intl.formatMessage({ id: 'create_btn' })}
      </CreateButton>
    );
  }
}
export default withRouter(ClaimCreateButton);
