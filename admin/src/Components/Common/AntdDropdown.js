import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
/**
 * props
 * @onSelect (value): void
 * @options  {label value}
 */
class AntdDropdown extends React.PureComponent {
  state = {
    // Dropdown Visible
    visible: false
  };
  _onDropdownVisibleChange = visible => {
    this.setState({ visible });
  };
  _onMenuClick = menuItem => {
    const { onSelect } = this.props;
    onSelect && onSelect({ value: (menuItem && menuItem.key) || undefined });
  };
  _renderDropdownOverlay = () => {
    const { options } = this.props;
    return (
      <Menu onClick={this._onMenuClick}>
        {options &&
          options.length &&
          options.map(option => {
            return <Menu.Item key={option.value}>{option.label}</Menu.Item>;
          })}
      </Menu>
    );
  };
  render() {
    return (
      <Dropdown
        onVisibleChange={this._onDropdownVisibleChange}
        trigger={['click']}
        overlay={this._renderDropdownOverlay}
        {...this.props}
      />
    );
  }
}
export default AntdDropdown;
