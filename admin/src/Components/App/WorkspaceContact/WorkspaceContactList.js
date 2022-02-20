import React from 'react';
import styled from 'styled-components';
import { List, Card } from 'antd';
import Button from '../../Common/Button';
// import Switch from '../../Common/Switch';

const RowContainer = styled.div``;
const TextContainer = styled.p`
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  height: ${({ rows = 1 }) => 21 * rows}px;
  color: black;
  ${({ lastOne }) => (lastOne ? 'margin-bottom:0' : '')};
`;
const AddButton = styled(Button)`
  width: 100%;
  height: 338px;
  margin: 0;
  font-size: 40px;
`;

const ADD_BUTTON = 'add_button';

class WorkspaceContactList extends React.PureComponent {
  static defaultProps = {
    onItemClick: () => true
  };
  renderAddButton() {
    // const { onAddClick, intl } = this.props;
    const { onAddClick } = this.props;
    //204
    return (
      <List.Item key={ADD_BUTTON}>
        <AddButton primary type="button" onClick={onAddClick}>
          +
        </AddButton>
      </List.Item>
    );
  }

  _renderItem = item => {
    const { onItemClick, intl } = this.props;
    return (
      <List.Item key={item._id}>
        <Card onClick={() => onItemClick(item._id)}>
          <RowContainer>
            {intl.formatMessage({ id: 'display_person' })}
            <TextContainer rows={2}>{item.name}</TextContainer>
          </RowContainer>
          <RowContainer>
            {intl.formatMessage({ id: 'display_department' })}
            <TextContainer rows={2}>{item.department}</TextContainer>
          </RowContainer>
          <RowContainer>
            {intl.formatMessage({ id: 'display_phone' })}
            <TextContainer rows={2}>{item.phoneNo}</TextContainer>
          </RowContainer>
          {/* <RowContainer>
            <TextContainer rows={1}>
              {!item.isPrimary && (
                <Popconfirm
                  title={`Are you sure delete ?`}
                  confirm={e => {
                    e.stopPropagation();
                    onDelectItem(item._id);
                  }}
                  cancel={e => {
                    e.stopPropagation();
                  }}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                />
              )}
            </TextContainer>
          </RowContainer>
          <RowContainer onClick={e => e.stopPropagation()}>
            <Switch
              onToggle={value => {
                onToggle(value ? true : false, item._id);
              }}
              value={item.isPrimary}
            />
          </RowContainer> */}
        </Card>
      </List.Item>
    );
  };

  // optionsFormat = data => {
  //   return [ADD_BUTTON].concat(data || []);
  // };

  render() {
    const { contacts } = this.props;
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
        // options={this.optionsFormat(contacts)}
        dataSource={contacts}
        renderItem={this._renderItem}
      />
    );
  }
}

export default WorkspaceContactList;
