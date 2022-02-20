import React from 'react';
import { reset } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import { FormattedMessage } from 'react-intl';
import { helpers } from '@golpasal/common';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';

import { CurrencyActions } from '../../Redux/Currency/actions';
import { WorkspaceActions } from '../../Redux/Workspace/actions';
import { CategoryActions } from '../../Redux/Category/actions';
import { WorkspaceHookActions } from '../../Redux/WorkspaceHook/actions';
import { AppHookActions } from '../../Redux/AppHook/actions';
import {
  getCurrencies,
  getAllCategory,
  getWorkspaceById,
  getAllWorkspaceHooks,
  getAppHook,
  getAllAppHookName
} from '../../Redux/selectors';
import AccountSelector from '../../Redux/Account/selectors';

const { convertTimeValue } = helpers;

export const componentDidMount = that => {
  const {
    getWorkspaceById,
    getCurrencies,
    currencies,
    getAllCategory,
    workspaceId,
    workspaceHooks,
    getAllWorkspaceHooks,
    getAllAppHookName,
    getAllAppHook
  } = that.props;
  (!currencies || currencies.length === 0) && getCurrencies();
  getWorkspaceById(workspaceId);
  (!workspaceHooks || workspaceHooks.length === 0) &&
    getAllWorkspaceHooks({
      populates: ['appHook']
    });
  getAllCategory({ aggregate: false, isActive: true }, true);
  getAllAppHookName();
  getAllAppHook();
};

export const onSubmit = (workspace, that) => {
  let formatWorkspace = cloneDeep(workspace);
  const newImages = [];
  const { createWorkspace, updateWorkspace, appHook } = that.props;
  const fn = formatWorkspace.code ? updateWorkspace : createWorkspace;

  const { checkboxValue } = that.state;
  if (checkboxValue) {
    formatWorkspace.merchantWebHost = formatWorkspace.webHost;
  }

  let settingLogoImage = null;
  if (
    formatWorkspace.setting.logo &&
    formatWorkspace.setting.logo[0] &&
    formatWorkspace.setting.logo[0].fileMeta
  ) {
    if (
      formatWorkspace.setting.logo &&
      formatWorkspace.setting.logo[0] &&
      formatWorkspace.setting.logo[0].fileMeta._id
    ) {
      settingLogoImage = formatWorkspace.setting.logo[0].fileMeta._id;
    } else if (
      formatWorkspace.setting.logo[0] &&
      formatWorkspace.setting.logo[0].fileMeta &&
      typeof formatWorkspace.setting.logo[0].fileMeta === 'string'
    ) {
      settingLogoImage = formatWorkspace.setting.logo[0].fileMeta;
    }
  }

  formatWorkspace.setting.logo = settingLogoImage;

  let settingFaviconImage = null;
  if (
    formatWorkspace.setting.favicon &&
    formatWorkspace.setting.favicon[0] &&
    formatWorkspace.setting.favicon[0].fileMeta
  ) {
    if (
      formatWorkspace.setting.favicon &&
      formatWorkspace.setting.favicon[0] &&
      formatWorkspace.setting.favicon[0].fileMeta._id
    ) {
      settingFaviconImage = formatWorkspace.setting.favicon[0].fileMeta._id;
    } else if (
      formatWorkspace.setting.favicon[0] &&
      formatWorkspace.setting.favicon[0].fileMeta &&
      typeof formatWorkspace.setting.favicon[0].fileMeta === 'string'
    ) {
      settingFaviconImage = formatWorkspace.setting.favicon[0].fileMeta;
    }
  }

  formatWorkspace.setting.favicon = settingFaviconImage;

  let settingLoginBackgroundImage = null;
  if (
    formatWorkspace.setting.loginBackgroundImage &&
    formatWorkspace.setting.loginBackgroundImage[0] &&
    formatWorkspace.setting.loginBackgroundImage[0].fileMeta
  ) {
    if (
      formatWorkspace.setting.loginBackgroundImage &&
      formatWorkspace.setting.loginBackgroundImage[0] &&
      formatWorkspace.setting.loginBackgroundImage[0].fileMeta._id
    ) {
      settingLoginBackgroundImage =
        formatWorkspace.setting.loginBackgroundImage[0].fileMeta._id;
    } else if (
      formatWorkspace.setting.loginBackgroundImage[0] &&
      formatWorkspace.setting.loginBackgroundImage[0].fileMeta &&
      typeof formatWorkspace.setting.loginBackgroundImage[0].fileMeta ===
        'string'
    ) {
      settingLoginBackgroundImage =
        formatWorkspace.setting.loginBackgroundImage[0].fileMeta;
    }
  }

  formatWorkspace.setting.loginBackgroundImage = settingLoginBackgroundImage;

  let settingHeaderLogoImage = null;
  if (
    formatWorkspace.setting.headerLogo &&
    formatWorkspace.setting.headerLogo[0] &&
    formatWorkspace.setting.headerLogo[0].fileMeta
  ) {
    if (
      formatWorkspace.setting.headerLogo &&
      formatWorkspace.setting.headerLogo[0] &&
      formatWorkspace.setting.headerLogo[0].fileMeta._id
    ) {
      settingHeaderLogoImage =
        formatWorkspace.setting.headerLogo[0].fileMeta._id;
    } else if (
      formatWorkspace.setting.headerLogo[0] &&
      formatWorkspace.setting.headerLogo[0].fileMeta &&
      typeof formatWorkspace.setting.headerLogo[0].fileMeta === 'string'
    ) {
      settingHeaderLogoImage = formatWorkspace.setting.headerLogo[0].fileMeta;
    }
  }

  formatWorkspace.setting.headerLogo = settingHeaderLogoImage;

  let memberIconImage = null;
  if (
    formatWorkspace.preferences.member &&
    formatWorkspace.preferences.member.icon &&
    formatWorkspace.preferences.member.icon[0] &&
    formatWorkspace.preferences.member.icon[0].fileMeta
  ) {
    if (
      formatWorkspace.preferences.member &&
      formatWorkspace.preferences.member.icon[0] &&
      formatWorkspace.preferences.member.icon[0].fileMeta &&
      formatWorkspace.preferences.member.icon[0].fileMeta._id
    ) {
      memberIconImage = formatWorkspace.preferences.member.icon[0].fileMeta._id;
    } else if (
      formatWorkspace.preferences.member.icon[0] &&
      typeof formatWorkspace.preferences.member.icon[0].fileMeta === 'string'
    ) {
      memberIconImage = formatWorkspace.preferences.member.icon[0].fileMeta;
    }
    formatWorkspace.preferences.member.icon = memberIconImage;
  }

  let merchantIconImageMetas = null;
  if (
    formatWorkspace.preferences.merchant &&
    formatWorkspace.preferences.merchant.icon &&
    formatWorkspace.preferences.merchant.icon[0] &&
    formatWorkspace.preferences.merchant.icon[0].fileMeta
  ) {
    if (
      formatWorkspace.preferences.merchant &&
      formatWorkspace.preferences.merchant.icon[0] &&
      formatWorkspace.preferences.merchant.icon[0].fileMeta &&
      formatWorkspace.preferences.merchant.icon[0].fileMeta._id
    ) {
      merchantIconImageMetas =
        formatWorkspace.preferences.merchant.icon[0].fileMeta._id;
    } else if (
      formatWorkspace.preferences.merchant.icon[0] &&
      formatWorkspace.preferences.merchant.icon[0].fileMeta &&
      typeof formatWorkspace.preferences.merchant.icon[0].fileMeta === 'string'
    ) {
      merchantIconImageMetas =
        formatWorkspace.preferences.merchant.icon[0].fileMeta;
    }
    formatWorkspace.preferences.merchant.icon = merchantIconImageMetas;
  }

  let receiptBackgroundImageMetas = null;
  if (
    formatWorkspace.preferences &&
    formatWorkspace.preferences.receipt &&
    formatWorkspace.preferences.receipt.backgroundImage &&
    formatWorkspace.preferences.receipt.backgroundImage[0] &&
    formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta
  ) {
    if (
      formatWorkspace.preferences.receipt.backgroundImage[0] &&
      formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta &&
      formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta._id
    ) {
      receiptBackgroundImageMetas =
        formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta._id;
    } else if (
      formatWorkspace.preferences.receipt.backgroundImage[0] &&
      formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta &&
      typeof formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta ===
        'string'
    ) {
      receiptBackgroundImageMetas =
        formatWorkspace.preferences.receipt.backgroundImage[0].fileMeta;
    }
    formatWorkspace.preferences.receipt.backgroundImage = receiptBackgroundImageMetas;
  }

  let receiptHeaderImageMetas = null;
  if (
    formatWorkspace.preferences &&
    formatWorkspace.preferences.receipt &&
    formatWorkspace.preferences.receipt.headerImage &&
    formatWorkspace.preferences.receipt.headerImage[0] &&
    formatWorkspace.preferences.receipt.headerImage[0].fileMeta
  ) {
    if (
      formatWorkspace.preferences.receipt.headerImage[0] &&
      formatWorkspace.preferences.receipt.headerImage[0].fileMeta &&
      formatWorkspace.preferences.receipt.headerImage[0].fileMeta._id
    ) {
      receiptHeaderImageMetas =
        formatWorkspace.preferences.receipt.headerImage[0].fileMeta._id;
    } else if (
      formatWorkspace.preferences.receipt.headerImage[0] &&
      formatWorkspace.preferences.receipt.headerImage[0].fileMeta &&
      typeof formatWorkspace.preferences.receipt.headerImage[0].fileMeta ===
        'string'
    ) {
      receiptHeaderImageMetas =
        formatWorkspace.preferences.receipt.headerImage[0].fileMeta;
    }
    formatWorkspace.preferences.receipt.headerImage = receiptHeaderImageMetas;
  }

  let receiptFooterImageMetas = null;
  if (
    formatWorkspace.preferences &&
    formatWorkspace.preferences.receipt &&
    formatWorkspace.preferences.receipt.footerImage &&
    formatWorkspace.preferences.receipt.footerImage[0] &&
    formatWorkspace.preferences.receipt.footerImage[0].fileMeta
  ) {
    if (
      formatWorkspace.preferences.receipt.footerImage[0] &&
      formatWorkspace.preferences.receipt.footerImage[0].fileMeta &&
      formatWorkspace.preferences.receipt.footerImage[0].fileMeta._id
    ) {
      receiptFooterImageMetas =
        formatWorkspace.preferences.receipt.footerImage[0].fileMeta._id;
    } else if (
      formatWorkspace.preferences.receipt.footerImage[0] &&
      formatWorkspace.preferences.receipt.footerImage[0].fileMeta &&
      typeof formatWorkspace.preferences.receipt.footerImage[0].fileMeta ===
        'string'
    ) {
      receiptFooterImageMetas =
        formatWorkspace.preferences.receipt.footerImage[0].fileMeta;
    }
    formatWorkspace.preferences.receipt.footerImage = receiptFooterImageMetas;
  }

  if (
    formatWorkspace &&
    formatWorkspace.preferences &&
    formatWorkspace.preferences.event &&
    formatWorkspace.preferences.event.notAllowModifyIn
  ) {
    const notAllowModifyIn = formatWorkspace.preferences.event.notAllowModifyIn;
    formatWorkspace.preferences.event.notAllowModifyIn =
      notAllowModifyIn * 60000;
  }

  formatWorkspace &&
    formatWorkspace.integrations &&
    formatWorkspace.integrations.forEach(item => {
      let hookData = [];
      item.hooks &&
        item.app !== 'Customize' &&
        item.hooks.forEach(items => {
          if (typeof items === 'string') {
            appHook
              .filter(j => j.app === item.app)[0]
              .hooks.forEach(k => {
                if (k.code === items) {
                  hookData.push(k);
                }
              });
          }
          if (hookData.length) {
            item.hooks = hookData;
          }
        });
    });

  if (
    formatWorkspace.setting &&
    formatWorkspace.setting.theme &&
    formatWorkspace.setting.theme._id
  ) {
    formatWorkspace.setting.theme = formatWorkspace.setting.theme._id;
  }
  if (formatWorkspace?.preferences?.order?.acceptOrderCoolingOffPeriod) {
    formatWorkspace.preferences.order.acceptOrderCoolingOffPeriod = convertTimeValue(
      formatWorkspace.preferences.order.acceptOrderCoolingOffPeriod,
      'm',
      'ms'
    );
  }
  fn(formatWorkspace, newImages);
};

export const myWorkspace_onSubmitSuccess = that => {
  const { onSubmitSuccess } = that.props;
  toast.success(<FormattedMessage id={'updated_successfully'} />, {
    position: 'top-center',
    autoClose: 1000
  });
  onSubmitSuccess();
};

export const onSubmitSuccess = that => {
  const { onSubmitSuccess, updateMode, history, fetchWorkspaces } = that.props;
  fetchWorkspaces();
  onSubmitSuccess();

  history.push('/workspaces');
  toast.success(
    <FormattedMessage
      id={updateMode ? 'updated_successfully' : 'created_successfully'}
    />
  );
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateWorkspace: WorkspaceActions.updateWorkspace,
      createWorkspace: WorkspaceActions.createWorkspace,
      fetchCurrentWorkspace: WorkspaceActions.currentWorkspace,
      getWorkspaceById: WorkspaceActions.getWorkspaceById,
      getCurrencies: CurrencyActions.getCurrencies,
      getAllWorkspaceHooks: WorkspaceHookActions.getAllWorkspaceHooks,
      getAllCategory: CategoryActions.getAllCategory,
      getAllAppHook: AppHookActions.getAllAppHook,
      getAllAppHookName: AppHookActions.getAllAppHookName,
      reset: reset
    },
    dispatch
  );

export const mapStateToProps = (state, ownProps) => {
  const { WORKSPACE_UPDATE, WORKSPACE_CREATE } = FormName;
  const updateMode = Boolean(ownProps.workspaceId);
  const form = updateMode ? WORKSPACE_UPDATE : WORKSPACE_CREATE;
  const selector = formValueSelector(form);
  const currentUser = AccountSelector.getCurrentUser(state);

  return {
    locale: state.intl.locale,
    updateMode: ownProps.workspaceId !== undefined,
    workspace: getWorkspaceById(state, ownProps.workspaceId),
    workspaceId: ownProps.workspaceId,
    currencies: getCurrencies(state),
    workspaceHooks: getAllWorkspaceHooks(state),
    form: updateMode ? WORKSPACE_UPDATE : WORKSPACE_CREATE,
    currentUser,
    currentUserType: (currentUser || {}).userType,
    webHost: selector(state, 'webHost'),
    secretValueSelector: selector(state, 'secret'),
    worksapceType: selector(state, 'type'),
    fetchWorkspaces: WorkspaceActions.getWorkspaces,
    formValueIntegrations: selector(state, 'integrations'),
    formValueRecruitmentTypes: selector(
      state,
      'preferences.applyRecruitmentLimit.recruitmentTypes'
    ),
    formValueHooks: formValueSelector(FormName.WORKSPACE_UPDATE)(
      state,
      'hooks'
    ),
    appHook: getAppHook(state),
    appHookName: getAllAppHookName(state)
  };
};

export const myWorkspacemapStateToProps = (state, ownProps) => ({
  updateMode: true,
  locale: state.intl.locale,
  workspaceId: state.app.workspaceId,
  workspace: getWorkspaceById(state, state.app.workspaceId),
  workspaceHooks: getAllWorkspaceHooks(state),
  // workspace: getCurrentWorkspace(state),
  currencies: getCurrencies(state),
  currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType,
  categories: getAllCategory(state),
  worksapceType: formValueSelector(FormName.WORKSPACE_UPDATE)(state, 'type'),
  formValueIntegrations: formValueSelector(FormName.WORKSPACE_UPDATE)(
    state,
    'integrations'
  ),
  formValueContacts: formValueSelector(FormName.WORKSPACE_UPDATE)(
    state,
    'contacts'
  ),
  formValueSetting: formValueSelector(FormName.WORKSPACE_UPDATE)(
    state,
    'setting'
  ),
  formValueHooks: formValueSelector(FormName.WORKSPACE_UPDATE)(state, 'hooks'),
  fetchWorkspaces: WorkspaceActions.getWorkspaces,
  appHook: getAppHook(state),
  appHookName: getAllAppHookName(state),
  currentUser: AccountSelector.getCurrentUser(state)
});
