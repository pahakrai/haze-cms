import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';

import TextInput from '../../../Form/TextInput';

import Card from '../../../../Components/Common/Card';

const CardTitle = styled(Card.Title)`
  min-height: unset;
  padding-top: 0;
  padding-bottom: 10px;
  border: 0;
`;

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`;

export class SocialinkTab extends React.PureComponent {
  render() {
    const { intl } = this.props;

    return (
      <>
        <FormContent>
          <CardTitle>Facebook</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.facebook.name"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_name'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_name'
                  },
                  {
                    name: 'Facebook'
                  }
                )}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.facebook.url"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_link'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_link'
                  },
                  {
                    name: 'Facebook'
                  }
                )}
              />
            </Col>
          </Row>
        </FormContent>

        <FormContent style={{ marginTop: 20 }}>
          <CardTitle>Youtube</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.youtube.name"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_name'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_name'
                  },
                  {
                    name: 'Youtube'
                  }
                )}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.youtube.url"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_link'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_link'
                  },
                  {
                    name: 'Youtube'
                  }
                )}
              />
            </Col>
          </Row>
        </FormContent>

        <FormContent style={{ marginTop: 20 }}>
          <CardTitle>Instagram</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.instagram.name"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_name'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_name'
                  },
                  {
                    name: 'Instagram'
                  }
                )}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.instagram.url"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_link'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_link'
                  },
                  {
                    name: 'Instagram'
                  }
                )}
              />
            </Col>
          </Row>
        </FormContent>

        <FormContent style={{ marginTop: 20 }}>
          <CardTitle>Baidu</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.baidu.name"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_name'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_name'
                  },
                  {
                    name: 'Baidu'
                  }
                )}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.baidu.url"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_link'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_link'
                  },
                  {
                    name: 'Baidu'
                  }
                )}
              />
            </Col>
          </Row>
        </FormContent>

        <FormContent style={{ marginTop: 20 }}>
          <CardTitle>Youku</CardTitle>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.youku.name"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_name'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_name'
                  },
                  {
                    name: 'Youku'
                  }
                )}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="socialLinks.youku.url"
                label={intl.formatMessage({
                  id: 'display_workspace_social_platforms_link'
                })}
                placeholder={intl.formatMessage(
                  {
                    id: 'display_workspace_social_platforms_placehoder_link'
                  },
                  {
                    name: 'Youku'
                  }
                )}
              />
            </Col>
          </Row>
        </FormContent>
      </>
    );
  }
}
