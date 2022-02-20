import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexa';
import { FormattedMessage } from 'react-intl';

import Title from '../../Common/Title';
import Button from '../../Common/Button';
import Card from '../../../Components/Common/Card';
import Errors from '../../Form/Errors';
import Form from '../../Form/Form';
import Uploader from '../../Form/Uploader';

const validate = values => {
  const errors = {};
  if (values && values.tagImage && values.tagImage[0].image.length === 0) {
    errors.tagImage = [{ image: {} }];
    errors.tagImage[0].image = <FormattedMessage id={'error.required'} />;
  }

  return errors;
};

class TagImageForm extends React.PureComponent {
  static contextTypes = {
    _reduxForm: PropTypes.object
  };

  renderButtons() {
    const { intl, pristine, submitting } = this.props;
    return (
      <Button.Primary disabled={pristine || submitting} type="submit">
        {intl.formatMessage({
          id: 'update_btn'
        })}
      </Button.Primary>
    );
  }

  render() {
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Title.Wrapper>
          <Title>
            {intl.formatMessage({
              id: 'nav.tag_edit_picture'
            })}
          </Title>
          <Title.Right>{this.renderButtons()}</Title.Right>
        </Title.Wrapper>
        <Card>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Uploader
                intl={intl}
                name="tagImage[0].image"
                label={`${intl.formatMessage({
                  id: 'label_images'
                })}`}
              />
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }
}
export default reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(TagImageForm);
