import React from 'react';
import WidgetTypes from './widgets/WidgetTypes';
import GridItem from './gridlayout';

export default class GridBase extends React.PureComponent {
  onChange = () => {};

  onClose = () => {};

  getWidgetType = () => {
    throw new Error('GridBase:: method getWidgetType must be defined');
  };

  getKey = () => {
    return this.props.key;
  };

  getDataGrid = () => {
    return this.props['data-grid'];
  };

  getData = () => {
    throw new Error('GridBase:: method getData must be defined');
  };

  render() {
    const type = this.getWidgetType();
    const WidgetContext = WidgetTypes[type] && WidgetTypes[type].context;
    const key = this.getKey();
    const dataGrid = this.getDataGrid() || {};
    const gridItemData = this.getData() || {};
    return (
      <GridItem
        {...this.props}
        data-grid={dataGrid}
        onClose={() => this.onClose(key)}
      >
        {WidgetContext && (
          <WidgetContext
            {...this.props}
            gridItem={{ data: gridItemData }}
            onChange={gridItem => this.onChange(key, gridItem)}
          />
        )}
      </GridItem>
    );
  }
}
