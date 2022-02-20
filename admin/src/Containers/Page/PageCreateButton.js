import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuthActions from '../../Containers/Ac/withAuthActions';
import { AiOutlinePlus } from 'react-icons/ai';

import { CreateButton } from '../../Components/Common/FilterLayout';
class PageCreateButtonContainer extends React.PureComponent {
  goToCreate() {
    const { history, isTemplate } = this.props;
    history.push(isTemplate ? 'page-templates/create' : '/pages/create');
  }

  render() {
    const { intl } = this.props;
    return (
      <CreateButton type="button" onClick={this.goToCreate.bind(this)}>
        <AiOutlinePlus />
        {intl.formatMessage({ id: 'create_btn' })}
      </CreateButton>
    );
  }
}
export default withAuthActions(['Page:Create'])(
  withRouter(PageCreateButtonContainer)
);
