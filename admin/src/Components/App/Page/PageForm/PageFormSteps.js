import React, { PureComponent } from 'react';

import Link from '../../../Common/Link';

import { PageTemplateListField } from '../../../../Containers/Page/SelectTemplate';

import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
} from '../../Form/Wrapper';
import MultiLanguageTextInput from '../../../Form/MultiLanguageTextInput';
import Dropdown from '../../../Form/Dropdown';
import TextInput from '../../../Form/TextInput';
import { FieldLabel } from '../../../Form/form.styled';
import { isLayoutType } from '../Utils';

export class SelectTemplateStep extends PureComponent {
  render() {
    const { updateMode, isTemplate } = this.props;
    return !updateMode && !isTemplate ? (
      <RightColWrapper xs={12} sm={12} md={12}>
        <PageTemplateListField name="pageTemplate" />
      </RightColWrapper>
    ) : (
      ''
    );
  }
}

export class InputsStep extends PureComponent {
  render() {
    const {
      intl,
      updateMode,
      type,
      isTemplate,
      initialValues,
      history
    } = this.props;
    const isHideSomeField = isLayoutType({ type });
    return (
      <React.Fragment>
        <RowWrapper>
          <LeftColWrapper xs={12} sm={12} md={12}>
            <MultiLanguageTextInput
              horizontal
              name="title"
              intl={intl}
              isMultiLanguage={true}
              label={intl.formatMessage({
                id: 'display_page_title'
              })}
            />
          </LeftColWrapper>
        </RowWrapper>
        {!isHideSomeField && (
          <RowWrapper>
            <LeftColWrapper xs={12} sm={12} md={6}>
              <TextInput
                name="path"
                label={intl.formatMessage({
                  id: 'display_page_path'
                })}
              />
            </LeftColWrapper>
            <LeftColWrapper xs={12} sm={12} md={6}>
              <Dropdown
                name="isActive"
                label={intl.formatMessage({
                  id: 'display_page_status'
                })}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'display_page_active'
                    }),
                    value: true
                  },
                  {
                    label: intl.formatMessage({
                      id: 'display_page_inactive'
                    }),
                    value: false
                  }
                ]}
              />
            </LeftColWrapper>
            <RightColWrapper xs={12} sm={12} md={3}>
              {/* <Dropdown
            name="isSystem"
            label={intl.formatMessage({
              id: 'display_page_isSystem'
            })}
            options={[
              {
                label: intl.formatMessage({
                  id: 'display_yes'
                }),
                value: true
              },
              {
                label: intl.formatMessage({
                  id: 'no'
                }),
                value: false
              }
            ]}
          /> */}
            </RightColWrapper>
            {/* <RightColWrapper xs={12} sm={12} md={12}>
              <TextInput
                name="meta.keywords"
                label={intl.formatMessage({
                  id: 'display_key_words'
                })}
                rows={3}
              />
            </RightColWrapper> */}
            <RightColWrapper xs={12} sm={12} md={12}>
              <TextInput
                name="meta.description"
                label={intl.formatMessage({
                  id: 'display_description'
                })}
                rows={4}
              />
              {updateMode && (
                <React.Fragment>
                  <FieldLabel>
                    {intl.formatMessage({ id: 'actions' })}
                  </FieldLabel>
                  <div>
                    <Link
                      onClick={() =>
                        history.push(
                          `/${!isTemplate ? 'pages' : 'page-templates'}/${
                            initialValues._id
                          }/content`
                        )
                      }
                    >
                      {intl.formatMessage({ id: 'display_page_content_edit' })}
                    </Link>
                  </div>
                </React.Fragment>
              )}
            </RightColWrapper>
          </RowWrapper>
        )}
      </React.Fragment>
    );
  }
}
