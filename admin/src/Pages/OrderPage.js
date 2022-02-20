import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'

import { getCurrentWorkspace } from '../Redux/Account/selectors'
import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint'
import OrderListContainer from '../Containers/Order/OrderList'
import OrderSearchInput from '../Containers/Order/OrderSearchInput'
import OrderSearchButton from '../Containers/Order/OrderSearchButton'
import OrderCreateButton from '../Containers/Order/OrderCreateButton'
import OrderDateFilter from '../Containers/Order/OrderDateFilter'
import OrderStatusFilter from '../Containers/Order/OrderStatusFilter'
import OrderServicesFilter from '../Containers/Order/OrderServicesFilter'
import ContentContainer from '../Components/Common/ContentContainer'
import DocumentTitle from '../Components/Common/DocumentTitle'
import FilterLayout from '../Components/Common/FilterLayout'

import ServiceService from '../Services/APIServices/ServiceService'

const { WorkspaceType } = Common.type

const Page = ({ intl, currentWorkspace, currentWorkspaceType, match }) => {
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState()
  const [filterValues, setFilterValues] = useState({})
  const breakpoint = useAntdBreakpoint()
  const _onClear = useCallback(() => {
    setSearchTerm(undefined)
  }, [])
  const _onChanged = useCallback(
    (value) => {
      setFilterValues({
        ...filterValues,
        ...value
      })
    },
    [filterValues]
  )

  const _onSerchInputChanged = useCallback((value) => {
    setSearchTerm(value || undefined)
  }, [])

  const query = { ...filterValues, q: searchTerm || undefined }
  const commonFilterProps = {
    intl,
    filterValues: filterValues,
    searchTerm,
    onChanged: _onChanged,
    onClear: _onClear
  }
  const getOrderWorkspaceType = () => {
    const path = match?.path
    let workspaceType = currentWorkspaceType
    if (match?.isExact && /orders\/[a-zA-Z]+$/.test(path)) {
      const execs = /orders\/([a-zA-Z-]+)$/.exec(path)
      if (execs?.[1]) {
        workspaceType = execs?.[1]
      }
    }
    return workspaceType
  }
  const workspaceType = getOrderWorkspaceType()
  const allowEdit = currentWorkspace?.preferences?.order?.allowEdit

  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await ServiceService.getServices({
          isActive: true,
          platformTypes: ['admin']
        })

        setServices(data)
      } catch (e) {}
    }

    fn()
  }, [])

  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.products' })}>
      <ContentContainer>
        <FilterLayout>
          <OrderSearchInput
            {...commonFilterProps}
            query={query}
            onChanged={_onSerchInputChanged}
          />
          <OrderDateFilter {...commonFilterProps} />
          <OrderStatusFilter
            workspaceType={workspaceType}
            {...commonFilterProps}
          />
          {services.length > 0 && workspaceType === WorkspaceType.LOGISTICS && (
            <OrderServicesFilter services={services} {...commonFilterProps} />
          )}
          {services.length > 0 && workspaceType === WorkspaceType.LOGISTICS && (
            <></>
          )}
          {services.length > 0 &&
            breakpoint.xl &&
            workspaceType === WorkspaceType.LOGISTICS && <></>}
          {services.length > 0 &&
            breakpoint.xl &&
            workspaceType === WorkspaceType.LOGISTICS && <></>}

          {!breakpoint.xl &&
            breakpoint.lg &&
            (workspaceType !== WorkspaceType.LOGISTICS ||
              (workspaceType === WorkspaceType.LOGISTICS &&
                services.length === 0)) && <></>}
          {!breakpoint.xl &&
            breakpoint.lg &&
            (workspaceType !== WorkspaceType.LOGISTICS ||
              (workspaceType === WorkspaceType.LOGISTICS &&
                services.length === 0)) && <></>}

          <FilterLayout.ButtonFloatLayout>
            <OrderSearchButton
              {...commonFilterProps}
              onChanged={_onSerchInputChanged}
              workspaceType={workspaceType}
            />
          </FilterLayout.ButtonFloatLayout>
          <Fragment>
            {allowEdit && workspaceType !== WorkspaceType.LOGISTICS && (
              <FilterLayout.ButtonFloatLayout marginRight={16}>
                <OrderCreateButton intl={intl} workspaceType={workspaceType} />
              </FilterLayout.ButtonFloatLayout>
            )}
            <OrderListContainer
              intl={intl}
              filterValues={filterValues}
              workspaceType={workspaceType}
            />
          </Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  )
}

const mapStateToProps = (state, ownProps) => {
  const currentWorkspace = getCurrentWorkspace(state)
  return {
    currentWorkspace: currentWorkspace,
    currentWorkspaceType:
      currentWorkspace && currentWorkspace.type
        ? currentWorkspace.type
        : undefined
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
)
