import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button from '../../common/Button';

import Form from '../../common/Form/Form';
import ReportLink from '../../App/Report';
import CustomTextInput from '../../common/Form/CustomTextInput';
import Separator from '../../common/Separator';
import { Icon } from '../../common/Image';

import CommentUserAvatar, { AVATAR_SIZE } from './CommentUserAvatar';

const BottomSeparator = styled(Separator)`
  margin-top: 3.2rem;
`;
const validate = values => {
  const errors = {};

  if (!values.comment) {
    errors.comment = <FormattedMessage id={'error.required'} />;
  }

  return errors;
};
const Wrapper = styled.div`
  display: flex;
`;
const FormWrapper = styled.div`
  margin-left: 1.6rem;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  margin-top: 35px;
`;

const DefaultAvatar = styled(Icon)`
  margin-top: 20px;
  min-width: ${props => props.size}px;
`;

class CommentForm extends React.PureComponent {
  _getReportSubject = () => {
    const { currentPost, intl } = this.props;
    const headerTitle = intl.formatMessage({ id: 'email_report_subject' });
    if (currentPost && currentPost.title)
      return `${headerTitle} [${
        currentPost.title[intl.locale] || currentPost.title
      }]`;
  };

  render() {
    const {
      onSubmit,
      onSubmitSuccess,
      onSubmitFailed,
      intl,
      defaultAvatar,
      currentUser
    } = this.props;
    const subject = this._getReportSubject();
    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFailed={onSubmitFailed}
      >
        <Wrapper>
          <AvatarWrapper>
            {!currentUser ? (
              <DefaultAvatar size={AVATAR_SIZE} round src={defaultAvatar} />
            ) : (
              <CommentUserAvatar comment={{ user: currentUser }} />
            )}
          </AvatarWrapper>
          <FormWrapper>
            <ReportLink subject={subject} />
            <CustomTextInput
              name="comment"
              label={intl.formatMessage({ id: 'form.placeholder.comment' })}
              rows={3}
              custom={(Container, label, input, other) => (
                <Container>
                  {input}
                  {other}
                </Container>
              )}
            />
            {/* <TextInput
                name="title"
                label={intl.formatMessage({ id: 'form.placeholder.title' })}
              /> */}
            <Button.Primary type="submit">
              <FormattedMessage id={'submit'} />
            </Button.Primary>
          </FormWrapper>
        </Wrapper>
        <BottomSeparator />
      </Form>
    );
  }
}
export default reduxFormParams =>
  injectIntl(
    reduxForm({
      validate,
      enableReinitialize: true,
      ...reduxFormParams
    })(CommentForm)
  );
