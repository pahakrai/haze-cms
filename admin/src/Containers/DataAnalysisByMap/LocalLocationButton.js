import React, { useCallback, useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

import {
  getCurrentPosition as _getCurrentPosition,
  defaultMapCoordinates
} from '../../Lib/util';
export const getCurrentPosition = () => {
  return _getCurrentPosition();
};
const LocalLocationButton = ({ onChange, params, engine, intl }) => {
  const ref = useRef();
  const getCurrentPositionInfo = useCallback(async () => {
    try {
      const { lat, lng } = await getCurrentPosition();
      onChange([lng, lat]);
    } catch (e) {
      onChange([...defaultMapCoordinates]);
    }
  }, [onChange]);

  useEffect(() => {
    getCurrentPositionInfo();
  }, [getCurrentPositionInfo]);
  useEffect(() => {
    if (params && ref.current) {
      const engineSelf = engine.self();
      params.mapRef.controls[engineSelf.maps.ControlPosition.RIGHT_BOTTOM].push(
        ref.current
      );
    }
  }, [ref, params, engine]);

  return (
    <div ref={ref}>
      <Tooltip
        placement="top"
        title={intl.formatMessage({
          id: 'display_address_back_local_location'
        })}
      >
        <Button onClick={getCurrentPositionInfo}>
          <MdAdd size={30} />
        </Button>
      </Tooltip>
    </div>
  );
};

const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  align-items: center;
  background-color: #fff;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 1px 4px -1px rgb(0 0 0 / 30%);
  cursor: pointer;
  height: 40px;
  width: 40px;
`;
export default LocalLocationButton;
