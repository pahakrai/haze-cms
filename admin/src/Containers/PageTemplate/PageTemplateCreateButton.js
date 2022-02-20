import React from 'react';

import { withRouter } from 'react-router-dom';
import Button from '../../Components/Common/Button';
class PageTemplateCreateButtonContainer extends React.PureComponent {
  goToCreate() {
    const { history } = this.props;
    history.push('/PageTemplates/create');
  }

  render() {
    const { intl } = this.props;
    return (
      <Button.Primary type="button" onClick={this.goToCreate.bind(this)}>
        {intl.formatMessage({ id: 'create_btn' })}
      </Button.Primary>
    );
  }
}

export default withRouter(PageTemplateCreateButtonContainer);
