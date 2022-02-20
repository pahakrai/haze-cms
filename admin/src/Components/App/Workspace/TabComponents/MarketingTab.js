import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';

import TextInput from '../../../Form/TextInput';

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`;

export class MarketingTab extends React.PureComponent {
  render() {
    const { intl } = this.props;

    return (
      <FormContent>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextInput
              name="marketing.googleTagManager"
              label={intl.formatMessage({
                id: 'display_workspace_googleTagManager'
              })}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TextInput
              name="marketing.facebookPixel"
              label={intl.formatMessage({
                id: 'display_workspace_facebookPixel'
              })}
            />
          </Col>
        </Row>
      </FormContent>
    );
  }
}
