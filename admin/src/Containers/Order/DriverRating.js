import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import MerchantService from '../../Services/APIServices/MerchantService';

export default ({ userId }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      if (userId) {
        const { data } = await MerchantService.getMerchants({
          user: userId
        });
        setData(data);
      }
    })();
  }, [userId]);
  return (
    <Rate allowHalf value={data && data[0] && data[0].avgFeedback} disabled />
  );
};
