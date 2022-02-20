import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'

import { getCurrentWorkspace } from '../../Redux/Account/selectors'

import QuotationShoppingForm from './QuotationShoppingForm'

const { WorkspaceType } = Common.type

class OrderFormContainer extends React.PureComponent {
  static defaultProps = {
    // when click order create button ，user select other orderForm create
    quotationWorkspaceType: null
  }

  render() {
    const { quotationWorkspaceType, currentWorkspace } = this.props

    const workspaceType =
      quotationWorkspaceType || (currentWorkspace && currentWorkspace.type)

    switch (workspaceType) {
      case WorkspaceType.SHOPPING:
        return <QuotationShoppingForm {...this.props} />
      default:
        return <p>This workspace type not support order</p>
    }
  }
}
const mapStateToProps = (state, { quotationId }) => ({
  currentWorkspace: getCurrentWorkspace(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormContainer)
