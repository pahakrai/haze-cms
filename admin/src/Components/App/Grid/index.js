import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
const ResponsiveGridLayout = WidthProvider(Responsive);

class GridLayout extends React.PureComponent {
  ref = React.createRef();
  static defaultProps = {
    rowHeight: 150,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 6, sm: 6, xs: 4, xxs: 2 },
    layouts: {},
    onChange: layouts => {}
  };

  render() {
    const { cols, layouts, breakpoints, rowHeight, margin } = this.props;
    return (
      <React.Fragment>
        <ResponsiveGridLayout
          ref={this.ref}
          className="layout"
          useCSSTransforms
          rowHeight={rowHeight}
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          margin={margin}
        >
          {this.props.children}
        </ResponsiveGridLayout>
      </React.Fragment>
    );
  }
}

export default GridLayout;
