import React from 'react';
import styled from 'styled-components';

import Uploader from '../../../Form/Uploader';

import Card from '../../../../Components/Common/Card';

import WorkspaceTheme from '../WorkspaceTheme';

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

export class ThemeTab extends React.PureComponent {
  render() {
    const { intl, formValueSetting } = this.props;

    return (
      <>
        <FormContent>
          <Uploader
            intl={intl}
            name="setting.logo"
            label={`${intl.formatMessage({
              id: 'display_workspace_logo'
            })}`}
            multiple={false}
            disableDelete={false}
          />
          <Uploader
            intl={intl}
            name="setting.favicon"
            label={`${intl.formatMessage({
              id: 'display_workspace_favicon'
            })}`}
            multiple={false}
            disableDelete={false}
          />
          <Uploader
            intl={intl}
            name="setting.headerLogo"
            label={`${intl.formatMessage({
              id: 'display_workspace_header_logo'
            })}`}
            multiple={false}
            disableDelete={false}
          />
          <Uploader
            intl={intl}
            name="setting.loginBackgroundImage"
            label={`${intl.formatMessage({
              id: 'display_workspace_login_background'
            })}`}
            multiple={false}
            disableDelete={false}
          />
        </FormContent>
        <FormContent style={{ marginTop: 20 }}>
          <CardTitle>{intl.formatMessage({ id: 'display_theme' })}</CardTitle>
          <WorkspaceTheme
            name="setting.theme"
            intl={intl}
            formValueSetting={formValueSetting}
          />
        </FormContent>
      </>
    );
  }
}
