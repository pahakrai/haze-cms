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

export class AppIntegrationTab extends React.PureComponent {
  render() {
    const { intl } = this.props;

    return (
      <>
        <FormContent>
          <CardTitle>Open Graph</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <TextInput
                name="seoMeta[og:site_name]"
                label={intl.formatMessage({
                  id: 'display_seo_site_name'
                })}
                placeholder="site_name"
              />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <TextInput
                name="seoMeta[og:locale]"
                label={intl.formatMessage({
                  id: 'display_seo_locale'
                })}
                placeholder="locale"
              />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <TextInput
                name="seoMeta[og:url]"
                label={intl.formatMessage({
                  id: 'display_seo_url'
                })}
                placeholder="url"
              />
              <TextInput
                name="seoMeta[og:title]"
                label={intl.formatMessage({
                  id: 'display_seo_title'
                })}
                placeholder="title"
              />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <TextInput
                name="seoMeta[og:type]"
                label={intl.formatMessage({
                  id: 'display_seo_type'
                })}
                placeholder="type"
              />
              <TextInput
                name="seoMeta[og:image]"
                label={intl.formatMessage({
                  id: 'display_seo_image'
                })}
                placeholder="image"
              />
            </Col>
          </Row>
        </FormContent>

        <FormContent style={{ marginTop: 20 }}>
          <CardTitle>fb meta</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <TextInput
                name="seoMeta[fb:pages]"
                label={intl.formatMessage({
                  id: 'display_seo_pages'
                })}
                placeholder="app_id"
              />
              <TextInput
                name="seoMeta[fb:app_id]"
                label={intl.formatMessage({
                  id: 'display_seo_app_id'
                })}
                placeholder="pages"
              />
            </Col>
          </Row>
        </FormContent>
      </>
    );
  }
}
