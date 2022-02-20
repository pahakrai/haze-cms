import React from 'react'
import { Field } from 'redux-form'
import Common from '@golpasal/common'

import FieldContainer from '../../../Form/FieldContainer'
import Modal from '../../../Modal'

import SelectProductTable from './SelectProductTable'

class SelectProducts extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      intl,
      currentWorkspaceType,
      updateMode,
      initialValues,
      formValueDetail
    } = this.props
    return (
      <div>
        <FieldContainer>
          <div style={{ marginTop: -5 }}>
            <Modal.Button
              // disabled={disabled}
              modalStyle={{
                content: { width: '90%', margin: ' 0 auto' }
              }}
              text={intl.formatMessage({
                id:
                  currentWorkspaceType === Common.type.WorkspaceType.EDUCATION
                    ? 'display_select_course'
                    : 'event_product_select_placeholder'
              })}
              title={intl.formatMessage({
                id:
                  currentWorkspaceType === Common.type.WorkspaceType.EDUCATION
                    ? 'display_select_course'
                    : 'event_product_select_placeholder'
              })}
              content={(closeModal) => (
                <SelectProductTable
                  intl={intl}
                  name="criteria.products"
                  currentWorkspaceType={currentWorkspaceType}
                  closeModal={closeModal}
                  updateMode={updateMode}
                  initialValues={initialValues}
                  formValueDetail={formValueDetail}
                />
              )}
            />
          </div>
        </FieldContainer>
      </div>
    )
  }
}

export default (props) => {
  return <Field {...props} component={SelectProducts} />
}
