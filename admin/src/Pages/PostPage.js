import React, { useState, useCallback } from 'react'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import useAntdBreakpoint from '../Lib/common/useAntdBreakpoint'

import PostListContainer from '../Containers/Post/PostList'
import PostSearchButton from '../Containers/Post/PostSearchButton'
import PostSearchInput from '../Containers/Post/PostSearchInput'
import PostDateFilter from '../Containers/Post/PostDateFilter'
import PostStatusFilter from '../Containers/Post/PostStatusFilter'
import PostPlatformTypesFilter from '../Containers/Post/PostPlatformTypesFilter'
import PostCreateButton from '../Containers/Post/PostCreateButton'

import DocumentTitle from '../Components/Common/DocumentTitle'
import ContentContainer from '../Components/Common/ContentContainer'
import FilterLayout from '../Components/Common/FilterLayout'

const Page = ({ intl, pagination }) => {
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

  const commonFilter = {
    intl,
    filterValues: filterValues,
    onChanged: _onChanged
  }

  return (
    <DocumentTitle title={intl.formatMessage({ id: 'nav.posts' })}>
      <ContentContainer>
        <FilterLayout>
          <PostSearchInput {...commonFilter} />
          <PostStatusFilter {...commonFilter} />
          <PostPlatformTypesFilter {...commonFilter} />
          <PostDateFilter {...commonFilter} />
          {breakpoint.xl && breakpoint.lg && <div />}
          {breakpoint.xl && breakpoint.lg && <div />}
          {breakpoint.xl && breakpoint.lg && <div />}
          {!breakpoint.xl && breakpoint.lg && <div />}
          {!breakpoint.xl && !breakpoint.lg && <div />}
          <FilterLayout.ButtonFloatLayout>
            <PostSearchButton {...commonFilter} />
          </FilterLayout.ButtonFloatLayout>
          <React.Fragment>
            <FilterLayout.ButtonFloatLayout>
              <FilterLayout.ButtonFloatLayout marginRight={8}>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {intl.formatMessage(
                    {
                      id: 'display_page.total_record'
                    },
                    {
                      n: pagination.total
                    }
                  )}
                </span>
                <PostCreateButton intl={intl} />
              </FilterLayout.ButtonFloatLayout>
            </FilterLayout.ButtonFloatLayout>
            <PostListContainer intl={intl} />
          </React.Fragment>
        </FilterLayout>
      </ContentContainer>
    </DocumentTitle>
  )
}

const intledPage = injectIntl(Page)
const mapStateToProps = (state) => ({
  pagination: state.pagination.posts
})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(intledPage)
)
