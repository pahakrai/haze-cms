import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-flexa';
import styled from 'styled-components';
import { MdContentCopy } from 'react-icons/md';

import Button from '../../Common/Button';

import { strIsNumber } from '../../../Lib/util';
import { toast } from '../../../Lib/Toast';
import * as Regex from '../../../Constants/Regex';
import WorkspaceService from '../../../Services/APIServices/WorkspaceService';

const SecretInput = styled.input`
  border-color: rgb(224, 224, 224);
  font-weight: 600;
  height: 42px;
  min-width: 100px;
  padding: 6px 10px;
  cursor: text;
  text-align: left;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(51, 51, 51, 1);
  background-color: #fff;
  background-image: none;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(236, 237, 237, 1);
  cursor: default;
  background-color: rgba(0, 0, 0, 0.03);
  color: #999999;
`;

const buttonStyle = {
  height: 42,
  minWidth: 50,
  position: 'absolute',
  bottom: 0,
  marginBottom: '22px'
};

export const Label = styled.label`
  padding: 3px 0;
  display: inline-block;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`;

export const validate = (values, { currentUser }) => {
  const reg = Regex.url;
  const regCode = Regex.code;
  const errors = {
    contacts: [],
    integrations: [],
    marketing: { googleTagManager: null, facebookPixel: null },
    preferences: {
      event: {
        peopleInChargeLimit: null,
        notAllowModifyIn: null
      },
      recruitment: {
        applyRecruitmentLimit: {
          amount: null
        }
      },
      auth: {
        authorizedDeviceLimit: {
          provider: null,
          user: null,
          member: null
        }
      }
    }
  };
  const requiredErrorText = <FormattedMessage id={'error.required'} />;
  if (values.integrations && values.integrations.length > 0) {
    const integrationErrors = [];
    values.integrations.forEach((item, i) => {
      integrationErrors[i] = {};
      if (item.app === '' || item.app === undefined) {
        integrationErrors[i] = integrationErrors[i] || {};
        integrationErrors[i].app = requiredErrorText;
      }
      if (!item.hooks || item.hooks.length === 0) {
        integrationErrors[i] = integrationErrors[i] || {};
        integrationErrors[i].hooks = requiredErrorText;
      }
      if (item.app === 'Customize') {
        const hookErrors = [];
        const headerErrors = [];
        item.hooks.forEach((items, j) => {
          hookErrors[j] = {};
          if (!items.code || items.code === '') {
            hookErrors[j] = hookErrors[j] || {};
            hookErrors[j].code = requiredErrorText;
          }
          if (!items.method || items.method === '') {
            hookErrors[j] = hookErrors[j] || {};
            hookErrors[j].method = requiredErrorText;
          }
          if (!reg.test(items.url)) {
            hookErrors[j] = hookErrors[j] || {};
            hookErrors[j].url = <FormattedMessage id={'error.format'} />;
          }
          if (items.headers && items.headers.length > 0) {
            items.headers.forEach((headerChild, k) => {
              if (!headerChild.key) {
                headerErrors[k] = headerErrors[k] || {};
                headerErrors[k].key = requiredErrorText;
              }
              if (!headerChild.value) {
                headerErrors[k] = headerErrors[k] || {};
                headerErrors[k].value = requiredErrorText;
              }
            });
          }
          if (headerErrors.length !== 0) hookErrors[j].headers = headerErrors;
        });
        if (values.integrations) {
          for (let x = 0; x < values.integrations.length; x++) {
            for (let y = x + 1; y < values.integrations.length; y++) {
              if (values.integrations.app === 'Customize') {
                if (
                  values.integrations[x].hooks[0].code ===
                  values.integrations[y].hooks[0].code
                ) {
                  integrationErrors[x] = integrationErrors[x] || {};
                  integrationErrors[x].hooks = [
                    {
                      code: (
                        <FormattedMessage id={'error.workspace_hooks_code'} />
                      )
                    }
                  ];
                  integrationErrors[y] = integrationErrors[y] || {};
                  integrationErrors[y].hooks = [
                    {
                      code: (
                        <FormattedMessage id={'error.workspace_hooks_code'} />
                      )
                    }
                  ];
                }
              }
            }
          }
        }

        let hasHookError = false;
        hookErrors.forEach(item => {
          if (Object.keys(item).length) hasHookError = true;
        });
        if (hasHookError) {
          integrationErrors[i].hooks = hookErrors;
        } else {
          delete integrationErrors[i].hooks;
        }
      }
    });
    let flag = false;
    integrationErrors.forEach(item => {
      if (Object.keys(item).length) flag = true;
    });
    if (flag) errors.integrations = integrationErrors;
  }
  if (
    values.marketing &&
    values.marketing.googleTagManager &&
    values.marketing.googleTagManager !== undefined &&
    !regCode.test(values.marketing.googleTagManager)
  ) {
    errors.marketing.googleTagManager = (
      <FormattedMessage id={'error.number.en'} />
    );
  }
  if (
    values.marketing &&
    values.marketing.facebookPixel &&
    values.marketing.facebookPixel !== undefined &&
    !regCode.test(values.marketing.facebookPixel)
  ) {
    errors.marketing.facebookPixel = (
      <FormattedMessage id={'error.number.en'} />
    );
  }
  if (values.name === '') {
    errors.name = requiredErrorText;
  }
  if (values.status === '') {
    errors.status = requiredErrorText;
  }
  if (values.code === '') {
    errors.code = requiredErrorText;
  }
  if (values.code && !regCode.test(values.code)) {
    errors.code = <FormattedMessage id={'error.number.en'} />;
  }
  if (values.type === '') {
    errors.type = requiredErrorText;
  }
  if (values.login === '') {
    errors.login = requiredErrorText;
  }
  if (values.favicon === '') {
    errors.favicon = requiredErrorText;
  }

  if (currentUser.actions.allows.includes('MyWorkspace:Account:Preference')) {
    if (
      !values?.preferences?.event?.peopleInChargeLimit &&
      values?.preferences?.event?.peopleInChargeLimit !== 0
    ) {
      errors.preferences.event.peopleInChargeLimit = requiredErrorText;
    } else if (
      values.preferences &&
      values.preferences.event &&
      values.preferences.event.peopleInChargeLimit < 0
    ) {
      errors.preferences.event.peopleInChargeLimit = (
        <FormattedMessage id={'error.number.gtezero'} />
      );
    }

    if (
      values.preferences &&
      values.preferences.event &&
      values.preferences.event.notAllowModifyIn < 0
    ) {
      errors.preferences.event.notAllowModifyIn = (
        <FormattedMessage id={'error.number.gtezero'} />
      );
    }

    if (
      values.preferences &&
      values.preferences.recruitment &&
      values.preferences.recruitment.applyRecruitmentLimit &&
      values.preferences.recruitment.applyRecruitmentLimit.amount < 0
    ) {
      errors.preferences.recruitment.applyRecruitmentLimit.amount = (
        <FormattedMessage id={'error.number.gtezero'} />
      );
    }
    if (
      !strIsNumber(
        values?.preferences?.auth?.authorizedDeviceLimit?.provider + ''
      ) ||
      parseInt(values?.preferences?.auth?.authorizedDeviceLimit?.provider) < 0
    ) {
      errors.preferences.auth.authorizedDeviceLimit.provider = (
        <FormattedMessage id={'error.number.gtezero'} />
      );
    }

    if (
      !strIsNumber(
        values?.preferences?.auth?.authorizedDeviceLimit?.user + ''
      ) ||
      parseInt(values?.preferences?.auth?.authorizedDeviceLimit?.user) < 0
    ) {
      errors.preferences.auth.authorizedDeviceLimit.user = (
        <FormattedMessage id={'error.number.gtezero'} />
      );
    }

    if (
      !strIsNumber(
        values?.preferences?.auth?.authorizedDeviceLimit?.member + ''
      ) ||
      parseInt(values?.preferences?.auth?.authorizedDeviceLimit?.member) < 0
    ) {
      errors.preferences.auth.authorizedDeviceLimit.member = (
        <FormattedMessage id={'error.number.gtezero'} />
      );
    }
  }

  if (values.contacts && values.contacts.length !== 0) {
    values.contacts.forEach((v, i) => {
      if (
        values &&
        values.contacts &&
        values.contacts[i] &&
        values.contacts[i].name === ''
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].name = requiredErrorText;
      }
      if (
        values &&
        values.contacts &&
        values.contacts[i] &&
        values.contacts[i].department === ''
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].department = requiredErrorText;
      }
      if (
        values &&
        values.contacts &&
        values.contacts[i] &&
        values.contacts[i].phoneNo === ''
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].phoneNo = requiredErrorText;
      }
      if (
        values.contacts &&
        values.contacts[i] &&
        values.contacts[i].phoneNo &&
        !/^[0-9]{8}$/g.test(values.contacts[i].phoneNo)
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].phoneNo = (
          <FormattedMessage id={'error.phone.length'} values={{ number: 8 }} />
        );
      }

      if (
        values.contacts &&
        values.contacts[i] &&
        (values.contacts[i].coordinates[0] > 180 ||
          values.contacts[i].coordinates[0] < -180)
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].coordinates = [];
        errors.contacts[i].coordinates[0] = (
          <FormattedMessage id={'error.longitude_value'} />
        );
      }
      if (
        values.contacts &&
        values.contacts[i] &&
        (values.contacts[i].coordinates[1] > 90 ||
          values.contacts[i].coordinates[1] < -90)
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].coordinates = [];
        errors.contacts[i].coordinates[1] = (
          <FormattedMessage id={'error.latitude_value'} />
        );
      }
      if (
        values &&
        values.contacts &&
        values.contacts[i] &&
        values.contacts[i].email === ''
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].email = requiredErrorText;
      }
      if (
        values.contacts &&
        values.contacts[i] &&
        values.contacts[i].email &&
        !Regex.email.test(values.contacts[i].email)
      ) {
        errors.contacts[i] = errors.contacts[i] || {};
        errors.contacts[i].email = <FormattedMessage id={'error.format'} />;
      }
    });
  } else {
    errors.contacts = requiredErrorText;
  }

  if (values && !values.webHost) {
    errors.webHost = requiredErrorText;
  }
  if (values && !values.merchantWebHost) {
    errors.merchantWebHost = requiredErrorText;
  }
  if (values && !values.adminHost && process.env.REACT_APP_WORKSPACE) {
    errors.adminHost = requiredErrorText;
  }

  if (
    values &&
    values.socialLinks &&
    values.socialLinks.facebook &&
    values.socialLinks.facebook.url &&
    !reg.test(values.socialLinks.facebook.url)
  ) {
    errors.socialLinks = errors.socialLinks || {};
    errors.socialLinks.facebook = errors.socialLinks.facebook || {};
    errors.socialLinks.facebook.url = <FormattedMessage id={'error.format'} />;
  }

  if (
    values &&
    values.socialLinks &&
    values.socialLinks.instagram &&
    values.socialLinks.instagram.url &&
    !reg.test(values.socialLinks.instagram.url)
  ) {
    errors.socialLinks = errors.socialLinks || {};
    errors.socialLinks.instagram = errors.socialLinks.instagram || {};
    errors.socialLinks.instagram.url = <FormattedMessage id={'error.format'} />;
  }

  if (
    values &&
    values.socialLinks &&
    values.socialLinks.youtube &&
    values.socialLinks.youtube.url &&
    !reg.test(values.socialLinks.youtube.url)
  ) {
    errors.socialLinks = errors.socialLinks || {};
    errors.socialLinks.youtube = errors.socialLinks.youtube || {};
    errors.socialLinks.youtube.url = <FormattedMessage id={'error.format'} />;
  }

  if (
    values &&
    values.socialLinks &&
    values.socialLinks.baidu &&
    values.socialLinks.baidu.url &&
    !reg.test(values.socialLinks.baidu.url)
  ) {
    errors.socialLinks = errors.socialLinks || {};
    errors.socialLinks.baidu = errors.socialLinks.baidu || {};
    errors.socialLinks.baidu.url = <FormattedMessage id={'error.format'} />;
  }

  if (
    values &&
    values.socialLinks &&
    values.socialLinks.youku &&
    values.socialLinks.youku.url &&
    !reg.test(values.socialLinks.youku.url)
  ) {
    errors.socialLinks = errors.socialLinks || {};
    errors.socialLinks.youku = errors.socialLinks.youku || {};
    errors.socialLinks.youku.url = <FormattedMessage id={'error.format'} />;
  }

  if (values && values.appStoreUrl && !reg.test(values.appStoreUrl)) {
    errors.appStoreUrl = <FormattedMessage id={'error.format'} />;
  }

  if (values && values.googlePlayUrl && !reg.test(values.googlePlayUrl)) {
    errors.googlePlayUrl = <FormattedMessage id={'error.format'} />;
  }

  if (Object.keys(errors.contacts).length === 0) {
    delete errors.contacts;
  }
  if (Object.keys(errors.integrations).length === 0) {
    delete errors.integrations;
  }

  if (
    errors.marketing.googleTagManager === null &&
    errors.marketing.facebookPixel === null
  ) {
    delete errors.marketing;
  } else {
    if (errors.marketing.googleTagManager === null) {
      delete errors.marketing.googleTagManager;
    }
    if (errors.marketing.facebookPixel === null) {
      delete errors.marketing.facebookPixel;
    }
  }

  return errors;
};

export const asyncValidate = async (values, props, { intl }) => {
  // const isUpdateForm = values._id ? false : true;
  const result = await WorkspaceService.duplicateCode(values.code, values._id);
  if (String(result.data.duplicate) === 'true') {
    throw Object({
      code: intl.formatMessage({
        id: 'error.code_exist'
      })
    });
  }
};

export const WorkSpaceSecert = ({ intl, secretValueSelector }) => {
  const textRef = useRef(null);

  const copyToClipboard = e => {
    textRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    toast.success(<FormattedMessage id={'display_copy_success'} />, {
      position: 'top-center',
      autoClose: 1000
    });
  };
  return (
    <Row>
      <Col xs={6} sm={6} md={6}>
        <Label>
          {intl.formatMessage({
            id: 'display_workspace_hook_secret'
          })}
        </Label>
        <SecretInput
          ref={textRef}
          value={secretValueSelector || ''}
          onChange={() => {}}
        />
      </Col>
      <Col xs={6} sm={6} md={6} style={{ position: 'relative' }}>
        <Button.Primary
          style={{
            ...buttonStyle
          }}
          type="button"
          onClick={copyToClipboard}
        >
          <MdContentCopy size={25} />
        </Button.Primary>
      </Col>
    </Row>
  );
};
