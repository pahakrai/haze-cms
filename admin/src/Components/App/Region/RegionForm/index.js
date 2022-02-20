import React from 'react';
import PropTypes from 'prop-types';
import { hasIn } from 'lodash';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Tabs } from 'antd';

import { isMultiLanguageRegion } from '../../../../Lib/util';

import Button from '../../../Common/Button';
import Title from '../../../Common/Title';
import Card from '../../../Common/Card';

import { RowWrapper, ColWrapper } from '../../Form/Wrapper';
import Errors from '../../../Form/Errors';
import CheckBox from '../../../Form/Checkbox';
import Form from '../../../Form/Form';
import TextInput from '../../../Form/TextInput';
import Switch from '../../../Form/Switch';
import MultiLanguageTextInput, {
  validateMTField
} from '../../../Form/MultiLanguageTextInput';
import Uploader from '../../../Form/Uploader';

import SubTypesInput from './SubTypesInput';
import AncestorsInput from './AncestorsInput';

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

export const LeftColWrapper = styled(ColWrapper)`
  @media (min-width: 0px) {
    padding-left: 0px;
    padding-right: 0px;
  }
  @media (min-width: ${props => props.theme.flexa.breakpoints.sm}rem) {
    padding-right: 7px;
  }
`;
export const RightColWrapper = styled(ColWrapper)`
  @media (min-width: 0px) {
    padding-left: 0px;
    padding-right: 0px;
  }
  @media (min-width: ${props => props.theme.flexa.breakpoints.sm}rem) {
    padding-right: 7px;
  }
`;
const validate = (values, { currentUserType }) => {
  const errors = {};

  const nameError = validateMTField(values.name || {}, isMultiLanguageRegion);

  if (!values.code) {
    errors.code = <FormattedMessage id={'error.required'} />;
  }
  if (nameError) {
    errors.name = nameError;
  }
  if (
    hasIn(values, 'location.geometry.coordinates[0]') &&
    (values.location.geometry.coordinates[0] > 180 ||
      values.location.geometry.coordinates[0] < -180)
  ) {
    errors.location = {
      geometry: {
        coordinates: []
      }
    };
    errors.location.geometry.coordinates[0] = (
      <FormattedMessage id={'error.longitude_value'} />
    );
  }
  if (
    hasIn(values, 'location.geometry.coordinates[1]') &&
    (values.location.geometry.coordinates[1] > 90 ||
      values.location.geometry.coordinates[1] < -90)
  ) {
    errors.location = {
      geometry: {
        coordinates: []
      }
    };
    errors.location.geometry.coordinates[1] = (
      <FormattedMessage id={'error.latitude_value'} />
    );
  }
  return errors;
};

class RegionForm extends React.PureComponent {
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
      // workspaces,
      // currentUserType
      // svgFileMetas
    } = this.props;

    // let workspaceIds = workspaces.reduce(
    //   (wsIds, workspace) => {
    //     wsIds.push({ label: workspace.code, value: workspace._id });
    //     return wsIds;
    //   },
    //   [{ label: '', value: '' }]
    // );

    const inputConent = (
      <RowWrapper>
        <ColWrapper xs={12}>
          <TextInput
            name="code"
            disabled={updateMode}
            label={intl.formatMessage({
              id: 'display_code'
            })}
          />
        </ColWrapper>
        <LeftColWrapper xs={12} sm={6}>
          <AncestorsInput
            name="ancestors"
            label={intl.formatMessage({
              id: 'display_parent'
            })}
            disabled
            intl={intl}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12} sm={6}>
          <SubTypesInput
            name="subTypes"
            label={intl.formatMessage({
              id: 'display_region_sub_types'
            })}
            disabled
            intl={intl}
          />
        </RightColWrapper>
        <ColWrapper xs={12}>
          <TextInput
            name="idx"
            type="number"
            label={intl.formatMessage({
              id: 'idx'
            })}
          />
        </ColWrapper>
        <ColWrapper xs={12}>
          <MultiLanguageTextInput
            intl={intl}
            isMultiLanguage={isMultiLanguageRegion}
            name="name"
            label={intl.formatMessage({
              id: 'display_name'
            })}
          />
        </ColWrapper>
        <LeftColWrapper xs={12} sm={6}>
          <TextInput
            name="location.geometry.coordinates[0]"
            label={intl.formatMessage({
              id: 'display_longitude'
            })}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12} sm={6}>
          <TextInput
            type="number"
            name="location.geometry.coordinates[1]"
            label={intl.formatMessage({
              id: 'display_latitude'
            })}
          />
        </RightColWrapper>
        <ColWrapper
          xs={12}
          sm={12}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CheckBox
            name="isAddress"
            label={intl.formatMessage({
              id: 'display_isAddress'
            })}
          />
        </ColWrapper>
        <ColWrapper xs={12} sm={12}>
          <Switch
            type="number"
            name="isActive"
            label={intl.formatMessage({
              id: 'enable'
            })}
          />
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
            <Title>{intl.formatMessage({ id: 'nav.regions' })}</Title>
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
                  name="filemeta"
                  label={intl.formatMessage({
                    id: 'display_region_icon'
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
})(RegionForm);
