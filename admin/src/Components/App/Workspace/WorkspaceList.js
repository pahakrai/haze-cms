import React from 'react';
import styled from 'styled-components';
import { List, Card } from 'antd';
import { helpers as EcommCommonHelpers } from '@golpasal/common';

const RowContainer = styled.div``;
const TextContainer = styled.p`
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  height: ${({ rows = 1 }) => 21 * rows}px;
  color: black;
`;

class WorkspaceList extends React.PureComponent {
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
    let workspaceStatus = EcommCommonHelpers.getConstantByValue(
      'status',
      'WorkspaceStatus',
      item.status,
      intl.locale
    );

    return (
      <List.Item>
        <Card onClick={() => onItemClick(item._id)}>
          <RowContainer>
            {intl.formatMessage({ id: 'display_workspace_code' })}
            <TextContainer rows={2}>{item.code}</TextContainer>
          </RowContainer>
          <RowContainer>
            {intl.formatMessage({ id: 'display_workspace_name' })}
            <TextContainer rows={1}>{item.name}</TextContainer>{' '}
          </RowContainer>
          <RowContainer>
            {intl.formatMessage({ id: 'display_workspace_status' })}
            <TextContainer rows={1}>
              {workspaceStatus && workspaceStatus.text}
            </TextContainer>
          </RowContainer>
        </Card>
      </List.Item>
    );
  };
  render() {
    const { workspaces } = this.props;
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
        dataSource={workspaces}
        renderItem={this._renderItem}
      />
    );
  }
}

export default WorkspaceList;
