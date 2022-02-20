/**
 * @class HalfMoonPieDisplay
 */

import * as React from 'react';

export default class Display extends React.PureComponent {
  state = { showMenu: false };

  onMenuItemClick = menuItem => {
    const { updateIntl } = this.props;
    this.setState(
      { showMenu: false },
      () => updateIntl && updateIntl(menuItem)
    );
  };

  render() {
    const { widget } = this.props;
    const {
      data: { availableLocales, currentLocale }
    } = widget;
    const projectLocale = currentLocale;
    return (
      <div
        className="widget_locale_menu"
        onMouseOver={() => this.setState({ showMenu: true })}
        onMouseLeave={() => this.setState({ showMenu: false })}
      >
        <div className="menu_item fixed">
          {(availableLocales.find(l => l.value === projectLocale) || {}).label}
          <div
            className="menu_arrow"
            style={{
              transform: `translateY(-50%) ${
                this.state.showMenu ? 'rotate(90deg)' : ''
              }`
            }}
          />
        </div>

        {this.state.showMenu && (
          <div className="downMenu_container">
            {availableLocales.map(l => (
              <div
                className="menu_item actived"
                key={l.label}
                onClick={() => this.onMenuItemClick(l.value)}
              >
                {l.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
