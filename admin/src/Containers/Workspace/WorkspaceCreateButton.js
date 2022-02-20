import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../Components/Common/Button';

class PostCreateButtonContainer extends React.PureComponent {
  goToCreate() {
    const { history } = this.props;
    history.push('/workspaces/create');
  }

  render() {
    const { intl } = this.props;
    return (
      <Button.Primary type="button" onClick={this.goToCreate.bind(this)}>
        {intl.formatMessage({ id: 'add' })}{' '}
      </Button.Primary>
    );
  }
}

export default withRouter(PostCreateButtonContainer);
