import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Common from '@golpasal/common'

import { getCurrentWorkspace } from '../../Redux/Account/selectors'
import OrderShoppingList from '../../Components/App/Order/OrderShoppingList'
import OrderEducationList from '../../Components/App/Order/OrderEducationList'
import OrderLogisticList from '../../Components/App/Order/OrderLogisticList'
import { OrderActions } from '../../Redux/Order/actions'
import { getOrders } from '../../Redux/selectors'
import Modal from '../../Components/Modal'
import downloadFile, { appendSecureQuery } from '../../Lib/common/downloadFile'
const { WorkspaceType } = Common.type

class OrderListContainer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.modelContent = React.createRef()
    this.modelCotentClassName = 'Order-model-content'
    this.state = { modalOpen: false, previewPdfUrl: '' }
  }
  componentDidMount() {
    this.fetchOrders()
  }
  componentWillUnmount() {
    this.props.setOrdersResults([])
  }

  fetchOrders(options = {}) {
    const { fetchOrders, filterValues, workspaceType } = this.props

    fetchOrders({
      ...options,
      query: {
        ...filterValues,
        ...(options.query || {}),
        populates: [],
        orderType: workspaceType
      }
    })
  }

  _onLoadMore = () => {
    const { fetchOrders } = this.props
    fetchOrders()
  }

  _onPageChange = (page, limit) => {
    this.fetchOrders({ query: { page, limit } })
  }

  _onItemPdfBtnClick = (order = {}) => {
    const fileUrl = `${process.env.REACT_APP_API_URL}/invoices/${order._id}/download-invoice-pdf`
    downloadFile(fileUrl)
  }

  _onItemEyeBtnClick = async (order = {}) => {
    const previewPdfUrl = appendSecureQuery(
      `${process.env.REACT_APP_API_URL}/invoices/${order._id}/preview-pdf/${order.orderNo}.pdf`
    )
    this.setState({
      modalOpen: true,
      previewPdfUrl
    })
  }
  _closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  _onSubmit(orders) {
    const { importOrder } = this.props
    if (orders) {
      importOrder(orders)
    } else {
      this.onSubmitFail()
    }
  }

  _onSubmitSuccess() {
    window.location.reload()
  }

  _onSubmitFail() {}

  render() {
    const { pagination, ...propsRes } = this.props

    const { workspaceType, currentWorkspace, intl } = this.props
    const { modalOpen } = this.state

    const props = {
      ...propsRes,
      workspaceType,
      currentWorkspace: currentWorkspace,
      onLoadMore: this._onLoadMore,
      loading: pagination.fetching,
      isEnd: pagination.isEnd,
      isNextPageLoading: pagination.fetching,
      pagination: {
        current: pagination.page,
        pageSize: pagination.limit,
        showQuickJumper: true,
        total: pagination.total,
        onChange: this._onPageChange
      }
    }

    const pdfModal = (
      <Modal
        isOpen={modalOpen}
        closeTimeoutMS={100}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <Modal.Header
          title={intl.formatMessage({ id: 'nav.orders' })}
          onCloseClick={this._closeModal}
          custom={({
            ModalHeaderContainer,
            title,
            IconButton,
            closeButton
          }) => {
            return (
              <ModalHeaderContainer>
                {title}
                <div style={{ display: 'flex' }}>{closeButton}</div>
              </ModalHeaderContainer>
            )
          }}
        />
        <div className={this.modelCotentClassName} style={{ height: 700 }}>
          <iframe
            type="application/pdf"
            title="pdf"
            style={{ width: '100%', height: '100%', border: 0 }}
            src={this.state.previewPdfUrl}
          />
        </div>
      </Modal>
    )
    switch (workspaceType) {
      case WorkspaceType.EDUCATION:
        return (
          <div>
            <OrderEducationList
              onItemEyeBtnClick={this._onItemEyeBtnClick}
              onItemPdfBtnClick={this._onItemPdfBtnClick}
              {...props}
            />
            {pdfModal}
          </div>
        )
      case WorkspaceType.LOGISTICS:
        return (
          <div>
            <OrderLogisticList
              onItemEyeBtnClick={this._onItemEyeBtnClick}
              onItemPdfBtnClick={this._onItemPdfBtnClick}
              _onSubmit={this._onSubmit.bind(this)}
              _onSubmitSuccess={this._onSubmitSuccess.bind(this)}
              _onSubmitFail={this._onSubmitFail.bind(this)}
              {...props}
            />
            {pdfModal}
          </div>
        )
      case WorkspaceType.SHOPPING:
        return (
          <div>
            <OrderShoppingList
              onItemEyeBtnClick={this._onItemEyeBtnClick}
              onItemPdfBtnClick={this._onItemPdfBtnClick}
              {...props}
            />
            {pdfModal}
          </div>
        )
      default:
        return <p>This workspace type not support order</p>
    }
  }
}
const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  orders: getOrders(state),
  pagination: state.pagination.orders,
  currentWorkspace: getCurrentWorkspace(state)
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchOrders: OrderActions.getOrders,
      importOrder: OrderActions.importOrder,
      setOrdersResults: OrderActions.setResults
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderListContainer)
)
