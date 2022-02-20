import React from 'react';
// import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Tabs } from 'antd';

import FormName from '../../../Constants/Form';
import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';

// import WorkspaceWidgets from './WorkspaceWidgets';
// import WorkspaceContactList from '../../../Containers/WorkspaceContact/WorkspaceContactList';
// import WorkspaceItemsForm from './WorkspaceItemsForm';
import { CustomizeHooks } from './index';
import CreateButton from './CreateButton';
import { validate, asyncValidate } from './WorkspaceFormUtils';
import CreateContactButton from './CreateContactButton';

// import BaseTab from './TabComponents/BaseTab';
import {
  BaseTab,
  ContactTab,
  MarketingTab,
  SocialinkTab,
  SeoTab,
  ThemeTab,
  WidgetTab,
  ServiceAppTab
} from './TabComponents';

class MyWorkspaceForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const hasDefaultValue = props.initialValues.contacts;
    this.state = {
      hasDefaultValue,
      activeKey: '0'
      //  contacts: hasDefaultValue ? props.initialValues.contacts : ['']
    };
  }

  renderButtons() {
    const { intl, invalid, pristine, submitting } = this.props;
    if (this.props.form === FormName.WORKSPACE_UPDATE) {
      return (
        <Button.Primary disabled={pristine || submitting} type="submit">
          {intl.formatMessage({
            id: 'update_btn'
          })}
        </Button.Primary>
      );
    }
    return (
      <Button.Primary disabled={invalid || submitting} type="submit">
        {intl.formatMessage({
          id: 'add'
        })}
      </Button.Primary>
    );
  }

  render() {
    const {
      intl,
      // images,
      onSubmit,
      onSubmitSuccess,
      currencies,
      // updateMode,
      onSubmitFail = () => true,
      workspaceId,
      workspaceHooks,
      appHook,
      appHookName,
      formValueIntegrations,
      formValueContacts,
      formValueSetting,
      currentUser
      // form
    } = this.props;
    //  const updateMode = form === FormName.WORKSPACE_UPDATE;

    let CurrenciesOption = [];
    if (currencies) {
      currencies.forEach(currency => {
        CurrenciesOption.push({
          label: currency.code,
          value: currency.code
        });
      });
    }

    const allowEdit =
      currentUser.actions.allows.includes('MyWorkspace:Account:Update') &&
      workspaceId;

    const inputConent = (
      <Tabs
        type="card"
        activeKey={this.state.activeKey}
        onChange={key => this.setState({ activeKey: key })}
        tabBarStyle={{ marginBottom: 0 }}
        style={{
          overflow: 'visible'
        }}
      >
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_base' })}
          key="0"
        >
          <BaseTab allowEdit={allowEdit} {...this.props} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_contact_person' })}
          key="1"
        >
          <ContactTab formValueContacts={formValueContacts} {...this.props} />
          <CreateContactButton name="contacts" />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_marketing' })}
          key="2"
        >
          <MarketingTab {...this.props} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_social_inks' })}
          key="3"
        >
          <SocialinkTab {...this.props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="SEO" key="4">
          <SeoTab {...this.props} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_theme' })}
          key="5"
        >
          <ThemeTab formValueSetting={formValueSetting} {...this.props} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_form_app_integration' })}
          key="6"
        >
          <div>
            <CustomizeHooks
              workspaceHooks={workspaceHooks}
              intl={intl}
              appHook={appHook}
              appHookName={appHookName}
              formValueIntegrations={formValueIntegrations}
            />
            <CreateButton name="integrations" />
          </div>
        </Tabs.TabPane>
        {currentUser.actions.allows.includes(
          'MyWorkspace:Account:Preference'
        ) && (
          <Tabs.TabPane
            tab={intl.formatMessage({ id: 'tab_workspace_form_widgets' })}
            key="7"
          >
            <WidgetTab {...this.props} />
          </Tabs.TabPane>
        )}
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'tab_workspace_service_app' })}
          key="8"
        >
          <ServiceAppTab {...this.props} />
        </Tabs.TabPane>
      </Tabs>
    );

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>{intl.formatMessage({ id: 'workspace.title' })}</Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        {inputConent}
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {},
  asyncValidate,
  asyncBlurFields: ['code']
})(MyWorkspaceForm);
