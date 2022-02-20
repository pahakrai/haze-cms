import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-flexa';
import styled from 'styled-components';
import { helpers } from '@golpasal/common';
import cloneDeep from 'lodash/cloneDeep';
import { Tabs } from 'antd';

import Card from '../../Common/Card';
import TextInput from '../../Form/TextInput';
import Dropdown from '../../Form/Dropdown';
import Error from '../../Form/Error';

import WorkspaceHeaderCreateButton from './WorkspaceHeaderCreateButton';
import DeleteButton from './DeleteButton';
import PanelFooter from './PanelFooter';
import DeletePanel from './DeletePanel';
import SelectHook from './SelectHook';
// import SelectWorkspaceHookCode from '../../../Containers/Form/SelectWorkspaceHookCode';

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 5px;
`;

export const SecretInput = styled.input`
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

export const Label = styled.label`
  padding: 3px 0;
  display: inline-block;
  font-weight: 600;
  color: #666666;
  font-size: 14px;
`;

const FormContent = styled.div`
  padding: 20px 0;
  background-color: #fff;
  border-radius: 5px;
`;

export const CustomizeHooks = ({
  intl,
  workspaceHooks,
  appHook,
  appHookName,
  formValueIntegrations
}) => {
  return (
    <>
      <MediaListInput
        intl={intl}
        name="integrations"
        workspaceHooks={workspaceHooks}
        appHook={appHook}
        appHookName={appHookName}
        formValueIntegrations={formValueIntegrations}
        label={intl.formatMessage({ id: 'tab_workspace_form_app_integration' })}
      />
    </>
  );
};

const MediaListInput = props => {
  return <Field component={MediaListInput_} {...props} />;
};

const WorkspaceHookHeaders = ({
  data,
  items,
  intl,
  name,
  index,
  i,
  onChange
}) => {
  return Array.isArray(items.headers)
    ? items.headers.map((item, j) => {
        return (
          <div key={j}>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3}>
                <TextInput
                  label={intl.formatMessage({
                    id: 'display_workspace_hook_header_key'
                  })}
                  name={`${name}[${index}].headers[${j}].key`}
                />
              </Col>
              <Col xs={12} sm={7} md={7} lg={7}>
                <TextInput
                  label={intl.formatMessage({
                    id: 'display_workspace_hook_header_value'
                  })}
                  name={`${name}[${index}].headers[${j}].value`}
                />
              </Col>

              <Col xs={12} sm={2} md={2} lg={2} style={{ paddingTop: 25 }}>
                <DeleteButton
                  onChanged={() => {
                    const newData = cloneDeep(data);
                    newData[i].hooks[index].headers.splice(j, 1);
                    onChange(newData);
                  }}
                />
              </Col>
            </Row>
          </div>
        );
      })
    : null;
};

const MediaListInput_ = ({
  intl,
  label,
  workspaceHooks,
  initialValues,
  appHook,
  appHookName,
  formValueIntegrations,
  input: { value: items = [], name, onChange }
}) => {
  const workspaceMethod = helpers
    .getConstants('type', 'WorkspaceMethod', intl.locale)
    .map(type => ({
      label: type.text,
      value: type.value
    }));
  let customize = {
    en: { label: 'Customize', value: 'Customize' },
    'zh-cn': { label: '自订', value: 'Customize' },
    'zh-hk': { label: '自訂', value: 'Customize' }
  };
  let appType = [];
  if (appHookName.length) {
    appType = workspaceHooks
      .map(v => ({
        label: v.appHook.app,
        value: v.appHook.app
      }))
      .concat(customize[intl.locale]);
  }
  return (
    <React.Fragment>
      <Card.Content
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          overflow: 'visible'
        }}
      >
        {Array.isArray(items) && items.length > 0 ? (
          items.map((arr, i) => {
            return (
              <div
                style={{
                  backgroundColor: '#fff',
                  marginTop: i > 0 ? 15 : 0,
                  padding: '20px 30px'
                }}
                key={i}
              >
                <DeletePanel
                  name={name}
                  items={items}
                  i={i}
                  onChange={onChange}
                />
                <Row>
                  <Col xs={12} sm={3} md={3} lg={3}>
                    <Dropdown
                      name={`${name}[${i}].app`}
                      label="App"
                      options={appType}
                      onChange={v => {
                        if (items[i].app !== v) {
                          const cloneItems = cloneDeep(items);
                          cloneItems[i].hooks = [];
                          onChange(cloneItems);
                        }
                      }}
                    />
                  </Col>
                  <Error
                    style={{ visibility: 'hidden' }}
                    name={`${name}[${i}].hooks`}
                    touched
                  />

                  {/* <Col>
                    <div style={{ visibility: 'hidden' }}>
                      <TextInput
                        name={`${name}[${i}].hooks`}
                        input={{
                          value: ''
                        }}
                      />
                    </div>
                  </Col> */}
                </Row>
                {items[i].app === 'Customize' ? (
                  arr.hooks.map((v, index) => {
                    return (
                      <div key={index}>
                        <Row>
                          <Col xs={12} sm={3} md={3} lg={3}>
                            <TextInput
                              label={intl.formatMessage({
                                id: 'display_userGroupPolicy_code'
                              })}
                              name={`${name}[${i}].hooks[${index}].code`}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm={3} md={3} lg={3}>
                            <Dropdown
                              name={`${name}[${i}].hooks[${index}].method`}
                              label={intl.formatMessage({
                                id: 'display_workspace_hook_method'
                              })}
                              options={workspaceMethod}
                            />
                          </Col>
                          <Col xs={12} sm={7} md={7} lg={7}>
                            <TextInput
                              label={intl.formatMessage({
                                id: 'display_seo_url'
                              })}
                              name={`${name}[${i}].hooks[${index}].url`}
                            />
                          </Col>
                          <Col
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            style={{ paddingTop: 25 }}
                          >
                            <DeleteButton
                              onChanged={() => {
                                let cloneArr = cloneDeep(items);
                                cloneArr[i].hooks.splice(i, 1);
                                onChange(cloneArr);
                              }}
                            />
                          </Col>
                        </Row>
                        <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
                          <Tabs.TabPane
                            tab={intl.formatMessage({
                              id: 'tab_workspace_hooks_headers'
                            })}
                            key="1"
                          >
                            <FormContent>
                              <WorkspaceHookHeaders
                                data={items}
                                items={v}
                                intl={intl}
                                name={`${name}[${i}].hooks`}
                                index={index}
                                i={i}
                                onChange={onChange}
                              />
                              <Row style={{ top: 10 }}>
                                <Col
                                  xs={12}
                                  sm={2}
                                  md={2}
                                  lg={2}
                                  style={{ paddingTop: 25 }}
                                >
                                  <WorkspaceHeaderCreateButton
                                    name={`${name}[${i}].hooks[${index}].headers`}
                                  />
                                </Col>
                              </Row>
                            </FormContent>
                          </Tabs.TabPane>
                        </Tabs>
                      </div>
                    );
                  })
                ) : (
                  <SelectHook
                    intl={intl}
                    name={`${name}[${i}].hooks`}
                    defaultValue={
                      formValueIntegrations && formValueIntegrations.length > 0
                        ? formValueIntegrations[i].hooks
                        : []
                    }
                    appType={items[i].app}
                    workspaceHooks={workspaceHooks}
                  />
                )}
                {items[i].app === 'Customize' && (
                  <PanelFooter
                    name={name}
                    items={items}
                    i={i}
                    onChange={onChange}
                  />
                )}

                <Error
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                  name={`${name}[${i}].hooks`}
                  touched
                />
              </div>
            );
          })
        ) : (
          <div
            style={{
              backgroundColor: '#fff',
              marginTop: 0,
              padding: '20px 30px'
            }}
          >
            {intl.formatMessage({ id: 'display_workspace_hook_no_data' })}
          </div>
        )}
      </Card.Content>
    </React.Fragment>
  );
};
