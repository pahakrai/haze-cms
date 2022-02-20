import React from 'react';
import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

export default class DropdownTreeView extends React.PureComponent {
  static defaultProps = {};
  constructor(props) {
    super(props);
    const defaultCategoryValue = true;
    const valueArray = this.inputValueToArray(
      props.input.value,
      defaultCategoryValue
    );
    this.state = {
      categoriesState: valueArray.length > 0 ? valueArray : []
    };
  }
  inputValueToArray = (inputValue, defaultCategoryValue) => {
    const { multiple } = this.props;
    let inputValueArray = [];
    if (multiple) {
      for (let i = 0; i < inputValue.length; i++) {
        if (defaultCategoryValue)
          inputValueArray.push(
            inputValue[i] && inputValue[i]._id
              ? inputValue[i]._id
              : inputValue[i]
          );
        else inputValueArray.push(inputValue[i]);
      }
    } else {
      inputValueArray = inputValue || defaultCategoryValue;
    }
    return inputValueArray;
  };

  componentDidUpdate(prevProps) {
    const { input } = this.props;
    if (input.value !== prevProps.input.value) {
      this.setState({
        categoriesState: input.value
      });
    }
  }

  onChangeValue = value => {
    const { onChange } = this.props.input;
    const defaultCategoryValue = false;
    const valueArray = this.inputValueToArray(value, defaultCategoryValue);
    onChange(value);
    this.setState({
      categoriesState: valueArray
    });
  };

  renderParent = (categories, currentLang) => {
    const parentArray = [];
    const parent = categories.filter(x => x.parent === null);
    for (let i = 0; i < parent.length; i++) {
      parentArray.push(
        this.renderChildren(categories, parent[i], i, currentLang)
      );
    }
    return parentArray;
  };

  renderChildren = (categories, category, index, currentLang) => {
    const childArray = categories.filter(x => x.parent === category._id);

    return (
      <TreeNode
        value={category._id}
        title={category.name[currentLang]}
        key={category._id}
      >
        {childArray.map((child, index) => {
          return (
            <TreeNode
              value={child._id}
              title={child.name[currentLang]}
              key={child._id}
            />
          );
        })}
      </TreeNode>
    );
  };

  render() {
    const { categories, intl } = this.props;
    const children = this.renderParent(categories, intl.locale);
    return (
      <TreeSelect
        //defaultValue={inputValue.length > 0 ? inputValue : undefined}

        value={this.state.categoriesState}
        listHeight={400}
        dropdownStyle={{ overflow: 'auto' }}
        placeholder={intl.formatMessage({
          id: 'categories'
        })}
        // treeDefaultExpandAll
        multiple
        //required
        {...this.props}
        allowClear
        autoClearSearchValue
        // {...this.state}
        onChange={item => this.onChangeValue(item)}
      >
        {children}
      </TreeSelect>
    );
  }
}
