import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

import Header from '../Components/Common/Header';
import H3 from '../Components/Common/H3';
import Link from '../Components/Common/Link';

class ValidateUserByToken extends React.PureComponent {
  componentDidMount() {
    const { history } = this.props;
    history.push('/user/validate/success');
  }
  render() {
    const { intl } = this.props;
    return (
      <DocumentTitle
        title={intl.formatMessage({ id: 'validate_user_by_token.title' })}
      >
        <ContentContainer>
          <Header>
            <H3>
              {intl.formatMessage({ id: 'validate_user_by_token.title' })}
            </H3>
          </Header>
          <Link to="/login">
            {intl.formatMessage(
              { id: 'back_to' },
              { name: intl.formatMessage({ id: 'login' }) }
            )}
          </Link>
        </ContentContainer>
      </DocumentTitle>
    );
  }
}

export default withRouter(injectIntl(ValidateUserByToken));
