import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import H3 from '../Components/Common/H3';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';
import Header from '../Components/Common/Header';

import ResendValidationNotificationContainer from '../Containers/ResendValidationNotification';

const Title = styled(H3)`
  line-height: 25px;
  margin: 0;
`;

class ResendValidationNotificationPage extends React.PureComponent {
  render() {
    const { intl } = this.props;
    return (
      <DocumentTitle
        title={intl.formatMessage({
          id: 'resend_validation_notification.title'
        })}
      >
        <ContentContainer>
          <Header>
            <Title>
              {intl.formatMessage({
                id: 'resend_validation_notification.title'
              })}
            </Title>
          </Header>
          <ResendValidationNotificationContainer />
        </ContentContainer>
      </DocumentTitle>
    );
  }
}

export default injectIntl(ResendValidationNotificationPage);
