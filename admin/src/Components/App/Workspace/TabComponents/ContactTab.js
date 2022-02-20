import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexa'

import WorkTimeDropDown from '../WorkTimeDropDown'
import WorkDayDropDown from '../WorkDayDropDown'
import DeleteContactButton from '../DeleteContactButton'

import TextInput from '../../../Form/TextInput'

import Card from '../../../../Components/Common/Card'

const FormContent = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
`

const CardTitle = styled(Card.Title)`
  min-height: unset;
  padding-top: 0;
  padding-bottom: 10px;
  border: 0;
`

export class ContactTab extends React.PureComponent {
  render() {
    const { intl, formValueContacts } = this.props

    return (
      <>
        {formValueContacts &&
          formValueContacts.map((v, i) => (
            <FormContent style={{ marginTop: i === 0 ? 0 : 20 }} key={i}>
              <DeleteContactButton name="contacts" i={i} />
              <CardTitle>
                {intl.formatMessage({
                  id: 'display_contact_base'
                })}
              </CardTitle>
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <TextInput
                    name={`contacts[${i}].department`}
                    label={intl.formatMessage({
                      id: 'display_department'
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <TextInput
                    name={`contacts[${i}].name`}
                    label={intl.formatMessage({
                      id: 'display_person'
                    })}
                  />
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <TextInput
                    name={`contacts[${i}].phoneNo`}
                    label={intl.formatMessage({
                      id: 'display_phone'
                    })}
                    type="number"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <TextInput
                    name={`contacts[${i}].email`}
                    label={intl.formatMessage({
                      id: 'display_email'
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12}>
                  <TextInput
                    name={`contacts[${i}].address`}
                    label={intl.formatMessage({
                      id: 'address'
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={3} md={3}>
                  <TextInput
                    name={`contacts[${i}].coordinates[0]`}
                    label={intl.formatMessage({
                      id: 'display_longitude'
                    })}
                  />
                </Col>
                <Col xs={12} sm={3} md={3}>
                  <TextInput
                    name={`contacts[${i}].coordinates[1]`}
                    label={intl.formatMessage({
                      id: 'display_latitude'
                    })}
                  />
                </Col>
              </Row>

              {/* serviceHour */}
              <CardTitle>
                {intl.formatMessage({
                  id: 'display_service_hour'
                })}
              </CardTitle>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <WorkTimeDropDown intl={intl} />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <WorkDayDropDown
                    intl={intl}
                    name={`contacts[${i}].serviceHour.workdays`}
                    label={intl.formatMessage({
                      id: 'display_recruitment_workday'
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <TextInput
                    intl={intl}
                    name={`contacts[${i}].serviceHour.timeTableDescription`}
                    rows={4}
                    label={intl.formatMessage({
                      id: 'display_description'
                    })}
                  />
                </Col>
              </Row>
            </FormContent>
          ))}
      </>
    )
  }
}
