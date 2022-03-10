import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loading from '../../Components/Common/Loading'
import CategoryTreeListComponent from '../../Components/App/Category/CategoryTreeList'
import Modal from '../../Components/Modal'

import { CategoryActions } from '../../Redux/Category/actions'

import CategoryTreeListItemWithExpand from './CategoryTreeListItemWithExpand'
import CategoryForm from './CategoryForm'

class _CategoryTreeList extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      modalOpen: false,
      formParams: {}
    }
  }

  fetchCategories(querys) {
    const { fetchCategories } = this.props
    fetchCategories({
      ...querys,
      populates: []
    })
  }

  _renderItem = (category) => {
    const {
      intl,
      toggleActiveLoading,
      selectItems,
      withCheckBox,
      onItemCheckboxChange,
      ancestors,
      deleteCategory
    } = this.props
    return (
      <CategoryTreeListItemWithExpand
        key={category._id}
        intl={intl}
        category={category}
        onEditBtnClick={this._onEditBtnClick}
        onItemSwitchToggle={this._onItemSwitchToggle}
        itemSwitchLoading={toggleActiveLoading}
        checkbox={withCheckBox}
        withCheckBox={withCheckBox}
        onItemCheckboxChange={onItemCheckboxChange}
        selectItems={selectItems}
        ancestors={ancestors}
        deleteCategory={deleteCategory}
      />
    )
  }

  handleChangeModalState = (otherState) => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
      ...otherState
    }))
  }

  _onItemSwitchToggle = (category, value) => {
    const { toggleActive } = this.props
    toggleActive(category._id, value)
  }

  _onEditBtnClick = (category) => {
    this.handleChangeModalState({ formParams: { categoryId: category._id } })
  }

  _onAddBtnClick = () => {
    const { parent, ancestors } = this.props
    this.handleChangeModalState({ formParams: { parent, ancestors } })
  }
  _oncategoriesubmitSuccess = () => {
    const { fetchCategories, parent } = this.props
    fetchCategories(parent ? { parent } : {})
    this.handleChangeModalState({ formParams: {} })
  }
  render() {
    const {
      categories = [],
      locale,
      intl,
      gutter,
      withCheckBox,
      onItemCheckboxChange,
      selectItems,
      parent
      // deleteCategory,
      // deleteCategoryLoading
    } = this.props
    const isLoading = false
    // const isLoading = deleteCategoryLoading;
    const { modalOpen, formParams } = this.state
    return isLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <CategoryTreeListComponent
          intl={intl}
          locale={locale}
          gutter={gutter}
          parent={parent}
          categories={categories}
          renderItem={this._renderItem}
          onAddBtnClick={this._onAddBtnClick}
          withCheckBox={withCheckBox}
          selectItems={selectItems}
          onItemCheckboxChange={onItemCheckboxChange}
          // deleteCategory={deleteCategory}
        />
        <Modal
          isOpen={modalOpen}
          closeTimeoutMS={100}
          contentLabel="Modal"
          ariaHideApp={false}
          appendStyle={{
            width: '90%',
            maxWidth: '80rem'
          }}
        >
          <Modal.Header
            title={intl.formatMessage({ id: 'nav.categories' })}
            onCloseClick={() => this.handleChangeModalState()}
          />
          <CategoryForm
            intl={intl}
            categoryType={this.props.categoryType}
            noCardWrapper
            noTitle
            onSubmitSuccess={this._oncategoriesubmitSuccess}
            {...formParams}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, { ancestors = [], parent }) => ({
  locale: state.intl.locale,
  ancestors: parent ? [...ancestors, parent] : [],
  toggleActiveLoading: state.loading.toggleActive,
  deleteCategoryLoading: state.loading.deleteCategory
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCategories: CategoryActions.getAllCategory,
      deleteCategory: CategoryActions.deleteCategory,
      toggleActive: CategoryActions.toggleActive
    },
    dispatch
  )
const CategoryTreeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CategoryTreeList)

export default CategoryTreeList
