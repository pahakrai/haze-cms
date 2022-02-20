import React from 'react';
import styled from 'styled-components';
// Utils
import moment from 'moment';
// Contents
import { helpers as EcommCommonHelpers } from '@golpasal/common';

// UI
import { List, Card } from 'antd';
// import Link from '../../Common/Link';

const RowContainer = styled.div``;
const TextContainer = styled.p`
  word-wrap: break-word;
  color: black;
`;

const ListItemContainer = styled.div`
  cursor: pointer;
`;

class NotificationScheduleList extends React.PureComponent {
  static defaultProps = {
    onItemClick: () => true,
    pageSize: 10,
    selectedIds: []
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = item => {
    const { onItemClick, intl } = this.props;
    const status = EcommCommonHelpers.getConstantByValue(
      'status',
      'NotificationScheduleStatus',
      item.status,
      intl.locale
    );
    return (
      <List.Item>
        <ListItemContainer>
          <Card onClick={() => onItemClick(item._id)}>
            <RowContainer>
              {intl.formatMessage({ id: 'display_message_title' })}
              <TextContainer>
                {(item.notification.title &&
                  item.notification.title[intl.locale]) ||
                  (item.notification.title &&
                    Object.keys(item.notification.title) &&
                    item.notification.title[
                      Object.keys(item.notification.title)[0]
                    ])}
              </TextContainer>
            </RowContainer>
            <RowContainer>
              {intl.formatMessage({ id: 'display_actionTime' })}
              <TextContainer>
                {moment(item.startTime).format('YYYY-MM-DD HH:mm')}
              </TextContainer>
            </RowContainer>
            <RowContainer>
              {intl.formatMessage({ id: 'display_create_at' })}
              <TextContainer>
                {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
              </TextContainer>
            </RowContainer>
            <RowContainer
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {intl.formatMessage({ id: 'display_send_status' })}
              <TextContainer>{status.text || '-'}</TextContainer>
            </RowContainer>
            {/* {NotificationMediaType.MOBILE === item.notificationMediaType && (
              <RowContainer>
                {intl.formatMessage({
                  id: 'display_pushnotificationschedule_screen'
                })}
                <TextContainer>
                  {JSON.stringify(item.data.screen)}
                </TextContainer>
              </RowContainer>
            )}
            {NotificationMediaType.EMAIL === item.notificationMediaType && (
              <RowContainer>
                {intl.formatMessage({
                  id: 'nav.send-email'
                })}
                <TextContainer>
                  <Link href={item.data.link} target="_blank">
                    <Icon type="link" />
                  </Link>
                </TextContainer>
              </RowContainer>
            )} */}
          </Card>
        </ListItemContainer>
      </List.Item>
    );
  };
  render() {
    const {
      notificationSchedules,
      // onItemClick,
      // intl,
      selectedIds
    } = this.props;
    return (
      <List
        grid={{ gutter: 16, sm: 1, md: 1, lg: 1, xl: 2 }}
        dataSource={notificationSchedules}
        renderItem={this._renderItem}
        selected={selectedIds.includes(notificationSchedules._id)}
      />
    );
  }
}

export default NotificationScheduleList;
