import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import UserVehiclesService from '../../Services/APIServices/UserVehiclesService';

const VehicleList = ({ intl, user }) => {
  const columns = [
    {
      title: intl.formatMessage({ id: 'display_vehicle_plateNo' }),
      render: v => (
        <Link to={`/vehicles/${v?.vehicle?._id}`} target="_blank">
          <div>{v.vehicle && v.vehicle.plateNo}</div>
        </Link>
      )
    },
    {
      title: intl.formatMessage({ id: 'display_vehicle_type' }),
      render: v => (
        <div>
          {v.vehicle && v.vehicle.type && v.vehicle.type.name[intl.locale]}
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: 'display_vehicle_make' }),
      render: v => (
        <div>
          {v.vehicle && v.vehicle.make && v.vehicle.make.name[intl.locale]}
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: 'display_year' }),
      render: v => <div>{v.vehicle && v.vehicle.year}</div>
    },
    {
      title: intl.formatMessage({ id: 'display_vehicle_isDefault' }),
      render: v => (
        <div>
          {v.isDefault
            ? intl.formatMessage({ id: 'display_yes' })
            : intl.formatMessage({ id: 'display_no' })}
        </div>
      )
    }
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await UserVehiclesService.getUserVehicleList({
          user: user._id,
          populates: [
            'user',
            'vehicle',
            'vehicle.type',
            'vehicle.model',
            'vehicle.make'
          ]
        });

        setData(data);
      } catch (e) {}
    };

    fn();
  }, [user]);

  return (
    <Table rowKey={record => record._id} dataSource={data} columns={columns} />
  );
};

export default VehicleList;
