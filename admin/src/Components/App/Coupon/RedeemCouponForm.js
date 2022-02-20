import React from 'react';
import { reduxForm } from 'redux-form';
// import { reduxForm, formValueSelector } from 'redux-form';
import styled from 'styled-components';
// import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import {
  RowWrapper,
  LeftColWrapper,
  // RightColWrapper,
  FormCard
} from '../Form/Wrapper';

import Button from '../../Common/Button';
// import { DATE_FORMAT, TIME_FORMAT } from '../../Common/TimePicker';

// import Uploader from '../../Form/Uploader';
// import NewFileCard from '../../Upload/NewFileCard';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import TextInput from '../../Form/TextInput';
// import Switch from '../../Form/Switch';
// import FormName from '../../../Constants/Form';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 130px;
  margin-bottom: 40px;
`;

const validate = (values, { formValueUnit, formValueIsRange, isProvider }) => {
  const errors = {};

  if (!values.code) {
    errors.code = <FormattedMessage id={'error.required'} />;
  }

  return errors;
};

const renderButtons = props => {
  const {
    intl,
    // pristine,
    submitting
    // updateMode,
    // onCloseButtonClick = () => {}
  } = props;

  return (
    <ButtonWrapper>
      <Button.Primary disabled={submitting} type="submit">
        {intl.formatMessage({
          id: 'redeem'
        })}
      </Button.Primary>
    </ButtonWrapper>
  );
};

const getComponentText = props => {
  const { intl } = props;
  const t = v => intl.formatMessage(v);

  return {
    formTitle: t({ id: 'nav.redeemCoupon' }),
    code: t({ id: 'display_coupon_code' })
  };
};

const CouponForm = props => {
  const {
    // coupon,
    // currencies,
    // workspaces,
    // locale,
    onSubmit,
    // form,
    // initialValues,
    onSubmitSuccess,
    // invalid,
    // submitting,
    // pristine,
    // currentUser,
    onSubmitFail = () => true
    // formValueIsRange,
    // formValueUnit,
    // updateMode,
    // intl
  } = props;
  // const { isProvider } = LibUtil.UserTypeJudge(currentUser);

  // const isUpdateForm = form === FormName.COUPON_UPDATE;
  // let workspaceIds = workspaces.reduce((wsIds, workspace) => {
  //   wsIds.push({ label: workspace.code, value: workspace._id });
  //   return wsIds;
  // }, []);
  // const CurrenciesOption = [];
  // if (currencies) {
  //   currencies.forEach(currency => {
  //     CurrenciesOption.push({
  //       label: currency.code,
  //       value: currency.code
  //     });
  //   });
  // }
  const texts = getComponentText(props);

  const inputConent = (
    <RowWrapper>
      <LeftColWrapper xs={12} sm={6} md={4}>
        <TextInput name="code" label={texts.code} />
      </LeftColWrapper>
    </RowWrapper>
  );

  return (
    <Form
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
    >
      <Errors />
      {/* <Title.Wrapper>
        <Title>{texts.formTitle}</Title>
        <Title.Right />
      </Title.Wrapper> */}
      <FormCard>
        {inputConent}
        {renderButtons(props)}
      </FormCard>
    </Form>
  );
};

export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
  // asyncValidate,
  // asyncBlurFields: ['code']
})(CouponForm);
