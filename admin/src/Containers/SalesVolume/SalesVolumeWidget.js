import React, { useRef } from 'react';
// import moment from 'moment';

import { mergeGridLayouts } from '../Dashboard';
import DynamicWidget from '../Dashboard/Widgets/DynamicWidget';
import GridLayout from '../../Components/App/Grid';

// const getMonth = (month, locale) => {
//   const date = moment();
//   return date.month(month).locale(locale).format('MMMM');
// };
export const SalesVolumeWidget = ({ intl }) => {
  const gridLayout = useRef();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const data = {
    _id: 'salesVolume',
    apiUrl: '/sales-volumes/month-overview',
    widgetType: 'salesVolume',
    title: intl.formatMessage(
      { id: 'data_overview_month' },
      { month: `${year}-${month > 9 ? '' : '0'}${month}` }
    ),
    position: Position
  };
  return (
    <GridLayout
      ref={gridLayout}
      rowHeight={230}
      mar
      layouts={mergeGridLayouts([data], ['lg', 'md', 'sm', 'xs', 'xxs'])}
      cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 3 }}
      margin={[0, 0]}
    >
      <DynamicWidget
        key={data._id}
        intl={intl}
        data={data}
        filter={{ month: month - 1 }}
        gridLayout={gridLayout}
        cardStyle={{
          border: 0,
          borderRadius: 4,
          boxShadow: 'unset'
        }}
      />
    </GridLayout>
  );
};

const Position = {
  x: 0,
  y: 0,
  w: 12,
  h: 2,
  lg: {
    x: 0,
    y: 0,
    w: 12,
    h: 1
  },
  md: {
    x: 0,
    y: 0,
    w: 12,
    h: 1
  },
  sm: {
    x: 0,
    y: 0,
    w: 12,
    h: 1
  }
};

export default SalesVolumeWidget;
