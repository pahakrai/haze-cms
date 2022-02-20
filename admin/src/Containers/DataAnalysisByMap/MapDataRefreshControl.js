import React, { useEffect, useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

export const MapDataRefreshControl = ({
  onRefresh,
  interval: _interval,
  retimeKey
}) => {
  const [count, setCount] = useState(0);
  const intl = useIntl();
  const interval = _interval ? _interval / 1000 : 0;

  useEffect(() => {
    let timer;
    if (interval && retimeKey) {
      timer = setInterval(() => {
        setCount(prev => {
          const newV = prev + 1;

          if (newV >= interval) {
            clearInterval(timer);
            onRefresh();
            return 0;
          } else {
            return newV;
          }
        });
      }, 1000);
    } else {
      setCount(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [interval, onRefresh, retimeKey]);

  if (!interval || !retimeKey) {
    return <></>;
  }
  return (
    <Tooltip
      placement="top"
      title={intl.formatMessage({
        id: 'refresh_interval'
      })}
    >
      <Container>
        <SyncOutlined size={8} />
        <span style={{ marginLeft: 3 }}>{interval - count}s</span>
      </Container>
    </Tooltip>
  );
};

const Container = styled.div`
  height: 37px;
  border-radius: 5px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 0;
  box-shadow: 0 1px 4px -1px rgb(0 0 0 / 30%);
  margin-right: 8px;
`;
export default MapDataRefreshControl;
