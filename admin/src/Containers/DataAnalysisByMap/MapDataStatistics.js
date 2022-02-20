import React, { useCallback } from 'react';
import { Spin, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

export const MapDataStatistics = ({ loading, data, onItemClick }) => {
  const onMenuClick = useCallback(
    ({ key }) => {
      onItemClick(data[key]);
    },
    [data, onItemClick]
  );

  return (
    <Dropdown
      overlay={
        data.length ? (
          <Menu
            onClick={onMenuClick}
            style={{ maxHeight: 210, overflow: 'auto' }}
          >
            {data.map((v, i) => {
              return (
                <Menu.Item key={i}>
                  <img
                    alt="icon"
                    width={25}
                    height={25}
                    style={{ objectFit: 'contain', marginRight: 5 }}
                    src={v.icon}
                  />
                  {v?.meta?.order?.orderNo || v?.meta?.vehicle.plateNo || ''}
                </Menu.Item>
              );
            })}
          </Menu>
        ) : (
          <></>
        )
      }
    >
      <Container>
        <Spin spinning={loading} size="small">
          <FormattedMessage
            id="total_record"
            values={{ n: data?.length || 0 }}
          />
        </Spin>
      </Container>
    </Dropdown>
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
  cursor: pointer;
`;

export default MapDataStatistics;
