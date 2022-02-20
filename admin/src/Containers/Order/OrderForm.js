import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Common from '@golpasal/common'
import queryString from 'query-string'

import { getOrderById } from '../../Redux/selectors'
import { getCurrentWorkspace } from '../../Redux/Account/selectors'
import { OrderActions } from '../../Redux/Order/actions'
import ResourcesActions from '../../Redux/Resources/actions'

import Loading from '../../Components/Common/Loading'
import OrderEducationForm from './OrderEducationForm'
import OrderLogisticForm from './OrderLogisticForm'
import OrderShoppingForm from './OrderShoppingForm'
import OrderUndefineForm from './OrderUndefineForm'

const { WorkspaceType } = Common.type

const OrderFormContainer = ({
  orderWorkspaceType,
  currentWorkspace,
  location,
  removeOrder,
  getOrderById,
  orderId,
  order,
  ...res
}) => {
  useEffect(() => {
    if (orderId) {
      removeOrder(orderId)
      getOrderById(orderId)
    }
  }, [orderId, removeOrder, getOrderById])

  const initialValues = useMemo(() => {
    const values = {}
    const orderType = queryString.parse(location.search)?.orderType
    if (orderType) {
      values.orderType = orderType
    }
    return values
  }, [location.search])

  const workspaceType = !orderId
    ? orderWorkspaceType ||
      initialValues.orderType ||
      (currentWorkspace && currentWorkspace.type)
    : order?.orderType || 'loading'

  const commonProps = {
    orderWorkspaceType,
    currentWorkspace,
    initialValues,
    removeOrder,
    getOrderById,
    orderId,
    order,
    ...res
  }

  switch (workspaceType) {
    case WorkspaceType.EDUCATION:
      return <OrderEducationForm {...commonProps} />
    case WorkspaceType.LOGISTICS:
      return <OrderLogisticForm {...commonProps} />
    case WorkspaceType.SHOPPING:
      return <OrderShoppingForm {...commonProps} />
    case 'loading':
      return <Loading isLoading fill />
    default:
      return <OrderUndefineForm {...commonProps} />
  }
}

const mapStateToProps = (state, { orderId }) => ({
  currentWorkspace: getCurrentWorkspace(state),
  order: getOrderById(state, orderId)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderById: OrderActions.getOrderById,
      removeOrder: ResourcesActions.removeOrder
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderFormContainer))
