import React from 'react';
import { createPortal } from 'react-dom';

import VehicleView from './VehicleView';
import OrderView from './OrderView';

export const MarkerInfoWindow = ({ parent, meta }) => {
  let content = <></>;
  if (meta?.order) {
    content = <OrderView order={meta?.order} />;
  }
  if (meta?.vehicle) {
    content = <VehicleView vehicle={meta?.vehicle} />;
  }

  return createPortal(content, parent);
};

export default MarkerInfoWindow;
