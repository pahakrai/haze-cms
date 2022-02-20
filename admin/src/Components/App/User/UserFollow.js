import React, { useState, useEffect } from 'react';
import { Table, Rate } from 'antd';
import moment from 'moment';

import Modal from '../../Modal';

// import FollowService from '../../../Services/APIServices/FollowService';
import FeedbackService from '../../../Services/APIServices/FeedbackService';

const TableWrapper = ({ intl, type, userId, total, theme }) => {
  const [data, setData] = useState([]);
  let columns = [];
  useEffect(() => {
    const result = async () => {
      getData(1, type, userId);
    };
    result();
  }, [type, userId]);

  const getData = async (page, type, userId) => {
    if (type === 'feedback') {
      // get feedback data
      const { data } = await FeedbackService.getFeedbacks({
        sort: '-createdAt',
        page: page,
        localize: true,
        paginate: true,
        offset: 0,
        limit: 5,
        populates: ['ref', 'from'],
        to: userId
      });
      setData(data.docs);
    } else if (type === 'followings') {
      // get followings data
      // const { data } = await FollowService.getUserFollowings(userId, {
      //   sort: '-createdAt',
      //   page: page,
      //   localize: true,
      //   paginate: true,
      //   offset: 0,
      //   limit: 5,
      //   populate: ['followee']
      // });
      // setData(data.docs);
      setData([]);
    } else {
      // get followers data
      // const { data } = await FollowService.getUserFollowers(userId, {
      //   sort: '-createdAt',
      //   page: page,
      //   localize: true,
      //   paginate: true,
      //   offset: 0,
      //   limit: 5,
      //   populate: ['follower']
      // });
      // setData(data.docs);
      setData([]);
    }
  };

  if (type === 'feedback') {
    columns = [
      {
        title: intl.formatMessage({
          id: 'display_user_feedback_from'
        }),
        render: value => value.from.username,
        fixed: 'left'
      },
      {
        title: intl.formatMessage({
          id: 'display_user_feedback_comment'
        }),
        render: value => <div style={{ maxWidth: 300 }}>{value.comment}</div>
      },
      {
        title: intl.formatMessage({ id: 'display_feedback_rating' }),
        render: value => (
          <Rate
            allowHalf
            defaultValue={value.rating}
            style={{ color: theme.color.primary, minWidth: 135 }}
            disabled
          />
        )
      },
      {
        title: intl.formatMessage({
          id: 'display_user_feedback_create_time'
        }),
        render: value => moment(value.createdAt).format('YYYY-MM-DD hh:mm')
      }
    ];
  } else if (type === 'followings') {
    columns = [
      {
        title: intl.formatMessage({
          id: 'display_username'
        }),
        render: value => value._id
      }
    ];
  } else {
    columns = [
      {
        title: intl.formatMessage({
          id: 'display_username'
        }),
        render: value => value._id
      }
    ];
  }
  const onChangeSize = (page, pageSize) => {
    getData(page, type, userId);
  };
  return (
    <Table
      rowKey={record => record._id}
      columns={columns}
      dataSource={data}
      pagination={{ defaultPageSize: 5, total, onChange: onChangeSize }}
      scroll={{ x: 800 }}
    />
  );
};

const UserFollow = ({
  intl,
  text,
  title,
  type,
  userId,
  total,
  disabled,
  theme
}) => {
  return (
    <div>
      <Modal.Button
        button={openModal => {
          return disabled ? (
            <div>{text}</div>
          ) : (
            <div onClick={openModal}>{text}</div>
          );
        }}
        title={title}
        content={closeModal => (
          <TableWrapper
            intl={intl}
            type={type}
            userId={userId}
            total={total}
            theme={theme}
          />
        )}
      />
    </div>
  );
};

export default UserFollow;
