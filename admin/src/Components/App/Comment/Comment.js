import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexa';
import Separator_ from '../../Common/Separator';
import Button from '../../Common/Button';
import { Popconfirm, message } from 'antd';

import CommentContent from './CommentContent';
import CommentUserName_ from './CommentUserName';
import CommentCreatedAt from './CommentCreatedAt';
import CommentUserAvatar from './CommentUserAvatar';

const Separator = styled(Separator_)`
  margin: 0.5rem 0;
`;

const CommentUserName = styled(CommentUserName_)`
  font-size: ${props => props.theme.fonts.size.h5};
  margin: 0 0 0.9rem 0;
`;

const CommentButtonWrapper = styled(Button)`
  float: right;
  @media (max-width: 700px) {
    min-width: 0px;
  }
`;

export default ({ comment, showSeparator, onDeleteClick, intl }) => {
  function confirm(e) {
    onDeleteClick(comment);
    message.success(`${intl.formatMessage({ id: 'msg.delete_successful' })}`);
  }
  function cancel(e) {
    message.error(`${intl.formatMessage({ id: 'msg.cancel_delete' })}`);
  }
  return (
    <div>
      <Row alignItems={'center'}>
        <Col xs={3} sm={3} md={2}>
          <CommentUserAvatar comment={comment} />
        </Col>
        <Col xs={6} sm={6} md={8}>
          <CommentUserName comment={comment} />
          <CommentContent comment={comment} />
          <CommentCreatedAt comment={comment} />
        </Col>
        <Col xs={3} sm={3} md={2}>
          <Popconfirm
            title={intl.formatMessage({ id: 'msg.remove_comment' })}
            placement="top"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <CommentButtonWrapper>
              {intl.formatMessage({ id: 'display_delete' })}
            </CommentButtonWrapper>
          </Popconfirm>
        </Col>
      </Row>
      {showSeparator && <Separator />}
    </div>
  );
};
