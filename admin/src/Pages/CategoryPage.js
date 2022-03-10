import React from 'react'
import { injectIntl } from 'react-intl'

import ContentContainer from '../Components/Common/ContentContainer'
import DocumentTitle from '../Components/Common/DocumentTitle'

import CategoryTreeListContainer from '../Containers/Category/CategoryTreeList'
import CategoryTreeSearchListContainer from '../Containers/Category/CategoryTreeSearchList'
import CategorySearch from '../Containers/Category/CategorySearch'

class Page extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hideSearchSider: false,
      searchTerm: null,
      filterValue: {},
      withCheckBox: false,
      selects: []
    }
  }

  _onItemCheckboxChange = (item, value) => {
    this.setState(({ selects }) => {
      let nextSelects = [...selects]
      if (selects.includes(item._id)) {
        nextSelects = nextSelects.filter((v) => v !== item._id)
      } else {
        nextSelects.push(item._id)
      }
      return { selects: nextSelects }
    })
  }

  _onSelectToggle = () => {
    this.setState(({ withCheckBox }) => ({
      withCheckBox: !withCheckBox
    }))
  }

  render() {
    const { intl, type } = this.props
    const { withCheckBox, selects } = this.state

    const list = (
      <CategoryTreeListContainer
        intl={intl}
        categoryType={type}
        withCheckBox={withCheckBox}
        selectItems={selects}
        onItemCheckboxChange={this._onItemCheckboxChange}
      />
    )

    const searchList = (
      <CategoryTreeSearchListContainer
        categoryType={type}
        intl={intl}
        withCheckBox={false}
      />
    )

    return (
      <DocumentTitle title={intl.formatMessage({ id: 'nav.categories' })}>
        <ContentContainer>
          <CategorySearch
            selectItems={selects}
            withCheckBox={withCheckBox}
            onSelectToggle={this._onSelectToggle}
            filterValues={this.state.filterValue}
            searchTerm={this.state.searchTerm}
            onChanged={(value) => {
              this.setState({
                searchTerm: value
              })
            }}
            onFilterValueChange={(filterValue) => {
              this.setState(({ filterValue: prevFilterValue }) => ({
                filterValue: { ...prevFilterValue, ...filterValue }
              }))
            }}
            intl={intl}
          />
          {this.state.filterValue.name ? searchList : list}
        </ContentContainer>
      </DocumentTitle>
    )
  }
}

export default injectIntl(Page)
