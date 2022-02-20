import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import 'antd/dist/antd.min.css'
import downloadFile from '../../../../Lib/common/downloadFile'
import Form from '../../../Form/Form'
import Errors from '../../../Form/Errors'
import Uploader from '../../../Form/Uploader'
import Button from '../../../Common/Button'
import Card from '../../../Common/Card'

const ButtonContainer = styled.div`
  padding: 40px 0px;
  display: flex;
  justify-content: flex-start;
`

class OrderImportForm extends React.Component {
  static contextTypes = {
    _reduxForm: PropTypes.object
  }

  renderButtons() {
    const { intl, invalid, pristine, submitting } = this.props
    return (
      <Button.Primary
        disabled={invalid || pristine || submitting}
        type="primary"
      >
        {intl.formatMessage({
          id: 'upload_btn'
        })}
      </Button.Primary>
    )
  }

  render() {
    const {
      intl,
      onSubmit,
      onSubmitSuccess,
      onSubmitFail = () => true
    } = this.props

    return (
      <Form
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
      >
        <Errors />
        <Row>
          <Col xs={12} sm={12} md={6}>
            <Button
              type="button"
              primary
              onClick={(e) => {
                e.stopPropagation()
                downloadFile(
                  process.env.REACT_APP_API_URL +
                    '/data-mappings/views/templates?filepath=import_order_template.xlsx'
                )
              }}
            >
              <FormattedMessage id="display_download" />
              <FormattedMessage id="display_template" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Card>
              <Uploader
                intl={intl}
                name={'values'}
                fileMaxSize={1050000 * 20}
                noLabel
                accept=".xlsx"
                formatExcel={true}
                labelFile={true}
                displayFileMetas={false}
              />
            </Card>
          </Col>
        </Row>

        <Row alignItems="center">
          <Col sm={12} md={4} alignSelf="flex-end">
            <ButtonContainer>{this.renderButtons()}</ButtonContainer>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {}
})(OrderImportForm)
