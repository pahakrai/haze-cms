import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

import ValidateUserSuccessContainer from '../Containers/ValidateUser/ValidateUserSuccess';
import ValidateUserFailureContainer from '../Containers/ValidateUser/ValidateUserFailure';

const CONTAINERS = {
  success: ValidateUserSuccessContainer,
  fails: ValidateUserFailureContainer
};
class UserValidateStatusPage extends React.PureComponent {
  componentDidMount() {
    const { history, match } = this.props;
    const Container = CONTAINERS[match.params.result];
    if (!Container) {
      history.push('/');
    }
  }
  render() {
    const { intl, match } = this.props;
    const { result } = match.params;
    const Container = CONTAINERS[result] || (() => null);

    return (
      <DocumentTitle
        title={intl.formatMessage({ id: 'validate_user_by_token.title' })}
      >
        <ContentContainer>
          <Container />
        </ContentContainer>
      </DocumentTitle>
    );
  }
}

export default withRouter(injectIntl(UserValidateStatusPage));
