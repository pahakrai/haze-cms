import React from 'react'
import { connect } from 'react-redux'
import { message as AntMessage } from 'antd'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import Immutable from 'seamless-immutable'
// common
import Common from '@golpasal/common'
// component
import PageContent from '../../Components/App/Page/PageContent'
import Loading from '../../Components/Common/Loading'
// redux
import { PageActions } from '../../Redux/Page/actions'
import { PageTemplateActions } from '../../Redux/PageTemplate/actions'
import { getPageById, getPageTemplateById } from '../../Redux/selectors'
import AccountSelector from '../../Redux/Account/selectors'

const { UserType } = Common.type

class PageContentContainer extends React.PureComponent {
  componentDidMount() {
    const {
      pageId,
      getPageById,
      pageTemplate,
      pageTemplateId,
      getPageTemplateById
    } = this.props
    if (pageId) getPageById(pageId)
    if (!pageTemplate && pageTemplateId)
      getPageTemplateById(pageTemplateId, { populates: ['preview', 'page'] })
  }

  // onSubmit(page) {
  //   const { createPage, updatePage } = this.props;
  //   const fn = page._id ? updatePage : createPage;

  //   if (page._id) {
  //     fn(page);
  //   } else {
  //     fn(page);
  //   }
  // }

  getRedirectFromLocation(location) {
    const params = new URLSearchParams(location.search)
    return params.get('redirect')
  }

  onBack = () => {
    const { location, history, isTemplate, pageId } = this.props
    const redirect = this.getRedirectFromLocation(location)
    history.push(
      redirect || `/${isTemplate ? 'page-templates' : 'pages'}/${pageId}`
    )
  }

  // pulish page content
  onPublish = (content, page, cb = {}) => {
    const { updatePageNotForm, intl } = this.props
    updatePageNotForm &&
      updatePageNotForm(page, {
        success: cb.success
          ? cb.success()
          : () =>
              AntMessage.success(
                intl.formatMessage({
                  id: 'updated_successfully'
                })
              ),
        fail: cb.fail
          ? cb.fail()
          : () =>
              AntMessage.error(intl.formatMessage({ id: 'updated_failure' }))
      })
  }

  getPage = () => {
    const { page, pageTemplateId, pageTemplate } = this.props
    const defalutValue = page && Immutable.asMutable(page, { deep: true })
    // if exits pageTemplateId , create content page by pageTemplate.content
    return !pageTemplateId
      ? defalutValue
      : {
          ...defalutValue,
          content:
            pageTemplate && pageTemplate.page && pageTemplate.page.content
        }
  }

  getLoading = () => {
    let isLoading = false // dummy
    const { page, pageTemplate, pageTemplateId } = this.props
    if (!page) isLoading = true
    if (pageTemplateId && !pageTemplate) isLoading = true
    return isLoading
  }

  getLimitAccess = () => this.props.currentUserType !== UserType.PROVIDER

  render() {
    const { intl, type } = this.props
    const isLoading = this.getLoading()
    const page = this.getPage()
    const limitAccess = this.getLimitAccess()
    return isLoading ? (
      <Loading />
    ) : (
      <PageContent
        page={page}
        intl={intl}
        contentType={type}
        limitAccess={limitAccess}
        onBack={this.onBack}
        onPublish={this.onPublish}
      />
    )
  }
}
const mapStateToProps = (state, { pageId, pageTemplateId }) => {
  const currentUser = AccountSelector.getCurrentUser(state)
  const currentUserType = currentUser && currentUser.userType
  const page = getPageById(state, pageId)
  const pageTemplate =
    !!pageTemplateId && getPageTemplateById(state, pageTemplateId)
  return {
    page,
    pageTemplateId,
    pageTemplate,
    getPageErrors: state.error.getPage,
    currentUserType
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createPage: PageActions.createPage,
      updatePageNotForm: PageActions.updatePageNotForm,
      getPages: PageActions.getPages,
      getPageById: PageActions.getPageById,
      getPageTemplateById: PageTemplateActions.getPageTemplateById
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageContentContainer)
)
