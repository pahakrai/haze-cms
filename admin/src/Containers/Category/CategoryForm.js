import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl'

import { toast } from '../../Lib/Toast'

import { CategoryActions } from '../../Redux/Category/actions'
import { FileMetaActions } from '../../Redux/FileMeta/actions'
import AccountSelector from '../../Redux/Account/selectors'
import {
  getCategoryById,
  // getWorkspaces,
  getAllSvgFileMeta
} from '../../Redux/selectors'

import CategoryForm from '../../Components/App/Category/CategoryForm'
import Loading from '../../Components/Common/Loading'

import FormName from '../../Constants/Form'

class CategoryFormContainer extends React.PureComponent {
  componentDidMount() {
    const {
      // categoryId,
      // getCategoryById,
      // fetchWorkspaces,
      getAllSvgFileMeta
    } = this.props

    // if (categoryId) getCategoryById(categoryId);
    // fetchWorkspaces();
    getAllSvgFileMeta()
  }
  componentDidUpdate(prevProps) {
    const { getCategoryErrors, history } = this.props

    if (getCategoryErrors) {
      history.push('/error')
    }
  }

  onSubmit(_category) {
    const { createCategory, updateCategory, updateMode, categoryType } =
      this.props
    const fn = updateMode ? updateCategory : createCategory
    let iconMetas = []
    let newImages = []
    //NOTE: CategoryType is required
    const category = { ..._category, type: categoryType }
    if (category.icon && category.icon[0] && category.icon[0].preview) {
      newImages.push(category.icon[0])
      delete category.icon
    } else if (
      // selected a media image
      category.icon &&
      category.icon[0] &&
      category.icon[0].fileMeta &&
      category.icon[0].fileMeta._id
    ) {
      category.icon.forEach((image) => {
        iconMetas.push(image.fileMeta._id)
      })
      category.icon = iconMetas[0]
    } else if (
      // not changed when update keep original image
      category.icon &&
      category.icon[0] &&
      category.icon[0].fileMeta &&
      typeof category.icon[0].fileMeta === 'string'
    ) {
      category.icon = category.icon[0].fileMeta
    } else {
      // not select image
      category.icon = null
    }
    if (updateMode) {
      fn(category._id, category, newImages)
    } else {
      fn(category, newImages)
    }
  }

  onSubmitSuccess() {
    const { getIndustries, onSubmitSuccess, parent } = this.props
    if (onSubmitSuccess) {
      onSubmitSuccess()
    } else {
      getIndustries({
        query: parent ? { parent } : {},
        refresh: true
      })
    }
  }

  onSubmitFail() {
    const { updateMode } = this.props

    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    )
  }

  getInitialValues = () => {
    const {
      category,
      updateMode,
      // currentUserWorkspace,
      parent = null,
      ancestors
    } = this.props

    const createValue = {
      // workspace: currentUserWorkspace,
      parent,
      ancestors: ancestors,
      isActive: true,
      idx: 0
    }
    return updateMode
      ? {
          ...category,
          icon: category.icon ? [{ fileMeta: category.icon }] : []
        }
      : createValue
  }

  render() {
    const key = this.props.category ? this.props.category._id : 'new'
    let isLoading = false // dummy
    const {
      updateMode,
      intl,
      category,
      form,
      noCardWrapper,
      noTitle,
      workspaces,
      currentUserType,
      svgFileMetas
    } = this.props
    if (updateMode && !category) {
      isLoading = true
    }
    const initialValues = this.getInitialValues()

    return isLoading ? (
      <Loading />
    ) : (
      <CategoryForm
        // form props
        key={key}
        categoryType={this.props.categoryType}
        form={form}
        updateMode={updateMode}
        initialValues={initialValues}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        // other props
        intl={intl}
        currentUserType={currentUserType}
        noCardWrapper={noCardWrapper}
        noTitle={noTitle}
        workspaces={workspaces}
        svgFileMetas={svgFileMetas}
      />
    )
  }
}
const mapStateToProps = (state, { categoryId }) => {
  const { CATEGORY_CREATE, CATEGORY_UPDATE } = FormName
  const updateMode = Boolean(categoryId)
  const form = updateMode ? CATEGORY_UPDATE : CATEGORY_CREATE
  const category = getCategoryById(state, categoryId, { populate: false })
  return {
    form,
    category,
    // workspaces: getWorkspaces(state),
    getCategoryErrors: state.error.getCategory,
    updateMode,
    currentUserWorkspace: (AccountSelector.getCurrentUser(state) || {})
      .workspace,
    currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType,
    svgFileMetas: getAllSvgFileMeta(state)
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createCategory: CategoryActions.createCategory,
      updateCategory: CategoryActions.updateCategory,
      getIndustries: CategoryActions.getIndustries,
      // getCategoryById: CategoryActions.getCategoryById,
      getAllSvgFileMeta: FileMetaActions.getAllSvgFileMeta
    },
    dispatch
  )
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryFormContainer)
)
