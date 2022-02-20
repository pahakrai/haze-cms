import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Common from '@golpasal/common';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import { QuotationActions } from '../../Redux/Quotation/actions'
import { getCurrentUser } from '../../Redux/Account/selectors'
import { getQuotations } from '../../Redux/selectors'

import QuotationList from '../../Components/App/Quotation/QuotationList'

const ListWrapper = styled.div`
  margin-bottom: 12px;
`
const LoadingWarper = styled.div`
  text-align: center;
  margin-top: 12px;
  line-height: 32px;
`

class QuotationListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchQuotation({ refresh: true }, true)
  }

  _onLoadMore = () => {
    const { fetchQuotation } = this.props
    fetchQuotation({ append: true })
  }

  fetchQuotation(options = { querys: {} }) {
    const { fetchQuotation } = this.props
    fetchQuotation({
      ...options,
      query: { ...options.querys, populates: [] }
    })
  }

  render() {
    const isLoading = false
    const {
      quotations,
      locale,
      intl,
      header,
      pagination: { fetching, isEnd }
    } = this.props

    return isLoading ? (
      <LoadingWarper>
        {fetching && <Button>{intl.formatMessage({ id: 'loading' })}</Button>}
      </LoadingWarper>
    ) : (
      <ListWrapper>
        <QuotationList
          locale={locale}
          intl={intl}
          loading={fetching}
          isEnd={isEnd}
          onLoadMore={this._onLoadMore}
          quotations={quotations}
          header={header}
        />
      </ListWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.intl.locale,
  quotations: getQuotations(state),
  pagination: state.pagination.quotations,
  currentUser: getCurrentUser(state)
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuotation: QuotationActions.getQuotations
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuotationListContainer)
)
