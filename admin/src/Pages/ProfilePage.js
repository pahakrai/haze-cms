/* @flow */

import React from 'react';
import { Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import DocumentTitle from '../Components/Common/DocumentTitle';
import ContentContainer from '../Components/Common/ContentContainer';

// Containers
import Profile from '../Containers/User/Profile';

const ProfilePage = injectIntl(({ intl, ...props }) => (
  <DocumentTitle title={intl.formatMessage({ id: 'nav.users' })}>
    <ContentContainer>
      <Row gutter={25}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Profile intl={intl} />
        </Col>
      </Row>
    </ContentContainer>
  </DocumentTitle>
));

export default ProfilePage;
