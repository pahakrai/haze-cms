import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';

import TextInput from '../../Form/TextInput';
import Button from '../../Common/Button';
import Title from '../../Common/Title';
import Card from '../../Common/Card';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const validate = (values, editType) => {
  const errors = {};
  if (editType === 'create-new-version') {
    if (!values.nextVersionNo)
      errors.nextVersionNo = <FormattedMessage id={'error.required'} />;
    if (!values.nextVersionDescription)
      errors.nextVersionDescription = (
        <FormattedMessage id={'error.required'} />
      );
  } else {
    if (!values.appId)
      errors.appId = <FormattedMessage id={'error.required'} />;
    if (!values.appIconLink)
      errors.appIconLink = <FormattedMessage id={'error.required'} />;
    if (!values.touchIcon)
      errors.touchIcon = <FormattedMessage id={'error.required'} />;
  }

  return Object.keys(errors).length > 0 ? errors : false;
};

class ReleaseButton extends PureComponent {
  constructor(props) {
    super(props);
    const type = window.localStorage.getItem('workspaceAppType');
    this.state = {
      nextVersionNo: null,
      nextVersionDescription: null,
      errors: {}
    };

    if (
      props.workspaceApp &&
      props.workspaceApp.productionIOS &&
      props.workspaceApp.productionIOS.appId &&
      type === 'ios'
    ) {
      this.state = {
        ...this.state,
        appId: props.workspaceApp.productionIOS.appId,
        appIconLink: props.workspaceApp.productionIOS.appIconLink,
        touchIcon: props.workspaceApp.productionIOS.touchIcon
      };
    } else if (
      props.workspaceApp &&
      props.workspaceApp.productionAndroid &&
      props.workspaceApp.productionAndroid.appId &&
      type === 'android'
    ) {
      this.state = {
        ...this.state,
        appId: props.workspaceApp.productionAndroid.appId,
        appIconLink: props.workspaceApp.productionAndroid.appIconLink,
        touchIcon: props.workspaceApp.productionAndroid.touchIcon
      };
    } else {
      this.state = {
        ...this.state,
        appId: null,
        appIconLink: null,
        touchIcon: null
      };
    }
  }
  onSubmit = () => {
    const {
      createNewVersion,
      workspaceApp,
      updateNewVersion,
      editType
    } = this.props;
    const {
      appId,
      appIconLink,
      touchIcon,
      nextVersionNo,
      nextVersionDescription
    } = this.state;

    const errors = validate(
      {
        nextVersionNo,
        nextVersionDescription,
        appIconLink,
        appId,
        touchIcon
      },
      editType
    );
    if (errors) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors: {} });
    }

    const type = window.localStorage.getItem('workspaceAppType');
    if (nextVersionNo) {
      createNewVersion(workspaceApp._id, type, {
        nextVersionNo,
        nextVersionDescription
      });
    } else {
      updateNewVersion(workspaceApp._id, type, {
        appId,
        appIconLink,
        touchIcon
      });
    }
  };

  render() {
    const { intl, submitting, editType } = this.props;
    const {
      appId,
      appIconLink,
      touchIcon,
      nextVersionNo,
      nextVersionDescription,
      errors
    } = this.state;

    return editType === 'create-new-version' ? (
      <div>
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.workspace_app' })}</Title>
          <Title.Right>
            <ButtonWrapper>
              <Button.Primary
                disabled={submitting}
                type="submit"
                onClick={() => this.onSubmit()}
              >
                {intl.formatMessage({
                  id: 'create_btn'
                })}
              </Button.Primary>
            </ButtonWrapper>
          </Title.Right>
        </Title.Wrapper>
        <Card style={{ marginTop: 0 }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_workspace_app_nextVersionNo'
                })}
                name="nextVersionNo"
                input={{
                  value: nextVersionNo,
                  onChange: value => {
                    this.setState({
                      nextVersionNo: value
                    });
                  }
                }}
                meta={{
                  touched: nextVersionNo ? false : true,
                  error: nextVersionNo ? null : errors.nextVersionNo
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                label={intl.formatMessage({
                  id: 'display_workspace_app_nextUpdates'
                })}
                name="nextVersionDescription"
                input={{
                  value: nextVersionDescription,
                  onChange: value => {
                    this.setState({
                      nextVersionDescription: value
                    });
                  }
                }}
                rows={4}
                meta={{
                  touched: nextVersionDescription ? false : true,
                  error: nextVersionDescription
                    ? null
                    : errors.nextVersionDescription
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    ) : (
      <div>
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'nav.workspace_app' })}</Title>
          <Title.Right>
            <ButtonWrapper>
              <Button.Primary
                disabled={submitting}
                type="submit"
                onClick={() => this.onSubmit()}
              >
                {intl.formatMessage({
                  id: 'update_btn'
                })}
              </Button.Primary>
            </ButtonWrapper>
          </Title.Right>
        </Title.Wrapper>
        <Card style={{ marginTop: 0 }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="appId"
                label={intl.formatMessage({
                  id: 'display_workspace_app_appid'
                })}
                input={{
                  value: appId,
                  onChange: value => {
                    this.setState({
                      appId: value
                    });
                  }
                }}
                meta={{
                  touched: appId ? false : true,
                  error: appId ? null : errors.appId
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="appIconLink"
                label={intl.formatMessage({
                  id: 'display_workspace_app_appIconLink'
                })}
                input={{
                  value: appIconLink,
                  onChange: value => {
                    this.setState({
                      appIconLink: value
                    });
                  }
                }}
                meta={{
                  touched: appIconLink ? false : true,
                  error: appIconLink ? null : errors.appIconLink
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <TextInput
                name="touchIcon"
                label={intl.formatMessage({
                  id: 'display_workspace_app_touchIcon'
                })}
                input={{
                  value: touchIcon,
                  onChange: value => {
                    this.setState({
                      touchIcon: value
                    });
                  }
                }}
                meta={{
                  touched: touchIcon ? false : true,
                  error: touchIcon ? null : errors.touchIcon
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(ReleaseButton);
