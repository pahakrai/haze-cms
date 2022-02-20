import React, { useState, useCallback } from 'react'
import { injectIntl } from 'react-intl'

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'

import { getCurrentWorkspace } from '../Redux/Account/selectors'

import ServiceListContainer from '../Containers/Service/ServiceList'
import ServiceSearchButton from '../Containers/Service/ServiceSearchButton'
import ServiceSearchInput from '../Containers/Service/ServiceSearchInput'
import ServiceCreateButton from '../Containers/Service/ServiceCreateButton'
import ServiceTypeFilter from '../Containers/Service/ServiceTypeFilter'
import ServiceUnitFilter from '../Containers/Service/ServiceUnitFilter'
import ServiceFilterClear from '../Containers/Service/ServiceFilterClear'
import ServiceCategoriesFilter from '../Containers/Service/ServiceCategoriesFilter'

import ContentContainer from '../Components/Common/ContentContainer'
import DocumentTitle from '../Components/Common/DocumentTitle'
import FilterLayout from '../Components/Common/FilterLayout'

const Page = ({ intl, currentWorkspace }) => {
  const [filterValues, setFilterValues] = useState({})
  const breakpoint = useAntdBreakpoint()

  const _onChanged = useCallback(
    (value) => {
      setFilterValues({
        ...filterValues,
        ...value
      })
    },
    [filterValues]
  )

  const _onClear = () => {
    setFilterValues({})
  }
  const commonFilter = {
    intl,
    filterValues: filterValues,
    onChanged: _onChanged,
    onClear: _onClear
  }

  return (
    <DocumentTitle
      title={intl.formatMessage({
        id:
          currentWorkspace.type === Common.type.WorkspaceType.EDUCATION ||
          currentWorkspace.type === Common.type.WorkspaceType.JOBHUNTING
            ? 'nav.skills'
            : 'nav.service'
      })}
    >
      <ContentContainer>
        <FilterLayout>
          <ServiceSearchInput {...commonFilter} />
          <ServiceTypeFilter {...commonFilter} />
          <ServiceUnitFilter {...commonFilter} />
          <ServiceCategoriesFilter {...commonFilter} />

          {breakpoint.xl && breakpoint.lg && <div />}
          {breakpoint.xl && breakpoint.lg && <div />}
          {breakpoint.xl && breakpoint.lg && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}
          {!breakpoint.xl && !breakpoint.lg && <div />}

          <FilterLayout.ButtonFloatLayout>
            <ServiceSearchButton {...commonFilter} />
            <ServiceFilterClear {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>

          <React.Fragment>
            <FilterLayout.ButtonFloatLayout marginRight={16}>
              <ServiceCreateButton intl={intl} />
            </FilterLayout.ButtonFloatLayout>
            <ServiceListContainer intl={intl} query={filterValues} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentWorkspace: getCurrentWorkspace(state)
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(Page))
)
