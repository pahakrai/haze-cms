import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';

import TextInput from '../../../Form/TextInput';

import Card from '../../../../Components/Common/Card';

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`;

const CardTitle = styled(Card.Title)`
  min-height: unset;
  padding-top: 0;
  padding-bottom: 10px;
  border: 0;
`;

export class ServiceAppTab extends React.PureComponent {
  render() {
    const { intl } = this.props;

    return (
      <>
        <FormContent>
          {/* facebook */}
          <CardTitle>
            {intl.formatMessage({ id: 'display_service_facebook' })}
          </CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                placeholder={intl.formatMessage({
                  id: 'display_service_appId'
                })}
                name="serviceApps.facebook.appId"
              />
            </Col>
          </Row>
        </FormContent>
        <FormContent style={{ marginTop: 20 }}>
          {/* google */}
          <CardTitle>
            {intl.formatMessage({ id: 'display_service_google' })}
          </CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_service_google_web'
                })}
                placeholder={intl.formatMessage({
                  id: 'display_service_appId'
                })}
                name="serviceApps.google.web.appId"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_service_google_ios'
                })}
                placeholder={intl.formatMessage({
                  id: 'display_service_appId'
                })}
                name="serviceApps.google.ios.appId"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_service_google_android'
                })}
                placeholder={intl.formatMessage({
                  id: 'display_service_appId'
                })}
                name="serviceApps.google.android.appId"
              />
            </Col>
          </Row>
        </FormContent>
      </>
    );
  }
}
