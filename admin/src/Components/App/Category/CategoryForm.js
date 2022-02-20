import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Tabs } from 'antd';

import { isMultiLanguageCategory } from '../../../Lib/util';

import Button from '../../Common/Button';
import Title from '../../Common/Title';
import Card from '../../Common/Card';

import { RowWrapper, ColWrapper } from '../Form/Wrapper';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import Uploader from '../../Form/Uploader';
// import Dropdown from '../../Form/Dropdown';
// import FileMetaDropdown from '../../Form/FileMetaDropdown';
import TextInput from '../../Form/TextInput';
import Switch from '../../Form/Switch';
import MultiLanguageTextInput, {
  validateMTField
} from '../../Form/MultiLanguageTextInput';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 550px;
  border: 1px solid #eee;
  padding: 20px;
  overflow: auto;
`;

const validate = (values, { currentUserType }) => {
  const errors = {};

  const nameError = validateMTField(values.name || {}, isMultiLanguageCategory);

  if (!values.code) {
    errors.code = <FormattedMessage id={'error.required'} />;
  }
  if (values.idx && !/^[0-9]+$/.test(values.idx)) {
    errors.idx = <FormattedMessage id={'error.number'} />;
  }
  if (nameError) {
    errors.name = nameError;
  }

  // if (!values.workspace) {
  //   if (currentUserType === common.type.UserType.PROVIDER) {
  //     errors.workspace = <FormattedMessage id="error.re_select" />;
  //   } else if (currentUserType === common.type.UserType.USER) {
  //     errors.workspace = <FormattedMessage id="error.workspace.required" />;
  //   }
  // }
  return errors;
};

class CategoryForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  renderButtons() {
    const { intl, pristine, submitting, updateMode } = this.props;

    if (updateMode) {
      return (
        <ButtonWrapper>
          <Button.Primary disabled={pristine || submitting} type="submit">
            {intl.formatMessage({
              id: 'update_btn'
            })}
          </Button.Primary>
        </ButtonWrapper>
      );
    }
    return (
      <ButtonWrapper>
        <Button.Primary disabled={submitting} type="submit">
          {intl.formatMessage({
            id: 'create_btn'
          })}
        </Button.Primary>
      </ButtonWrapper>
    );
  }

  render() {
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true,
      noTitle,
      noCardWrapper,
      updateMode
      // currentUserType
      // svgFileMetas
    } = this.props;
    const inputConent = (
      <RowWrapper>
        <ColWrapper xs={12}>
          <TextInput
            name="parent"
            label={intl.formatMessage({
              id: 'display_parent'
            })}
            disabled
          />
          <TextInput
            name="code"
            disabled={updateMode}
            label={intl.formatMessage({
              id: 'display_id'
            })}
          />
          <TextInput
            name="idx"
            type="number"
            label={intl.formatMessage({
              id: 'idx'
            })}
          />
          <MultiLanguageTextInput
            intl={intl}
            isMultiLanguage={isMultiLanguageCategory}
            name="name"
            label={intl.formatMessage({
              id: 'display_name'
            })}
          />
          {/* <FileMetaDropdown
            name="icon.fileMeta"
            label={intl.formatMessage({ id: 'label_images' })}
            fileMetas={svgFileMetas}
          /> */}
          {/* [longitude, latitude] */}
        </ColWrapper>
        <ColWrapper xs={12}>
          <Switch
            type="number"
            name="isActive"
            label={intl.formatMessage({
              id: 'enable'
            })}
          />{' '}
        </ColWrapper>
      </RowWrapper>
    );
    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />

        <Title.Wrapper>
          {!noTitle && (
            <Title>{intl.formatMessage({ id: 'nav.categories' })}</Title>
          )}
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        {noCardWrapper ? (
          <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
            <Tabs.TabPane
              tab={intl.formatMessage({ id: 'tab_category_base' })}
              key="1"
            >
              <Wrapper>{inputConent}</Wrapper>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={intl.formatMessage({
                id: 'tab_category_icon'
              })}
              key="2"
            >
              <Wrapper>
                <Uploader
                  intl={intl}
                  name="icon"
                  label={intl.formatMessage({
                    id: 'display_category_icon'
                  })}
                  disableDelete={false}
                />
              </Wrapper>
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <Card style={{ marginTop: 0 }}>{inputConent}</Card>
        )}
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(CategoryForm);
