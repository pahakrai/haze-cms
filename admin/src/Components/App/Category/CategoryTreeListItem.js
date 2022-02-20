import React from 'react';
import styled from 'styled-components';
import { hasIn } from 'lodash';
import { Tooltip, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Checkbox from '../../Common/Checkbox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Container = styled.div`
  padding: 10px 13px;
  border: 1px solid #888;
  background-color: #fff;
  width: 270px;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// const Icon = styled.img`
//   background-color: #ddd;
//   background-image: url ${props => props.url};
//   height: 20px;
//   width: 20px;
// `;

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;
  cursor: pointer;
`;

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// const SwitchSideWrapper = styled.div`
//   margin-right: 8px;
// `;

// const formatSvgHtml = (svgHtml, { height, width }) => {
//   const match = svgHtml.match(/<svg width=.+ height=.+?"/);
//   if (match[0]) {
//     return svgHtml.replace(
//       match[0],
//       `<svg width="${width}" height="${height}"`
//     );
//   } else {
//     return svgHtml;
//   }
// };

class CategoryTreeListItem extends React.PureComponent {
  _onEditBtnClick = e => {
    const { category, onEditBtnClick } = this.props;
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
    onEditBtnClick(category);
  };

  _onItemSwitchToggle = value => {
    const { category, onItemSwitchToggle } = this.props;
    onItemSwitchToggle(category, value);
  };

  _onItemCheckboxChange = value => {
    const { category, onItemCheckboxChange } = this.props;
    onItemCheckboxChange(category, value);
  };
  _onItemDeleteToggle = e => {
    const { deleteCategory, category } = this.props;
    deleteCategory(category._id);
  };

  onClickStopPropagation = e => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  };

  render() {
    const {
      category,
      intl,
      onClick,
      // itemSwitchLoading,
      checkbox = true,
      selectItems = []
    } = this.props;
    if (!category) {
      return;
    }
    const name = hasIn(category, `name.${intl.locale}`)
      ? category.name[intl.locale]
      : '';
    // const iconUri = hasIn(category, `icon.fileMeta.uri`)
    //   ? category.icon.fileMeta.uri
    //   : '';
    const continerStyle = { marginBottom: 10 };

    const content = (
      <Container onClick={onClick} style={checkbox ? {} : continerStyle}>
        {/* {!iconUri ? (
          <Icon />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: formatSvgHtml(iconUri, { width: '20px', height: '20px' })
            }}
          />
        )} */}
        <Tooltip placement="left" title={name}>
          <Text>{name}</Text>
        </Tooltip>
        <RightSideWrapper>
          {/* <SwitchSideWrapper>
            <Switch
              size={5}
              onToggle={this._onItemSwitchToggle}
              disabled={itemSwitchLoading}
              value={category.active}
            />
          </SwitchSideWrapper> */}
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            size="small"
            onClick={this._onEditBtnClick}
            style={{ marginRight: 8 }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            onClick={e => {
              this.onClickStopPropagation(e);
              Modal.confirm({
                title: intl.formatMessage({
                  id: 'msg.remove_category'
                }),
                okText: intl.formatMessage({ id: 'display_yes' }),
                cancelText: intl.formatMessage({ id: 'cancel' }),
                onOk: () => {
                  this._onItemDeleteToggle(e);
                  return Promise.resolve();
                }
              });
            }}
          />
        </RightSideWrapper>
      </Container>
    );

    if (checkbox) {
      return (
        <Wrapper style={continerStyle}>
          <Checkbox
            label=" "
            checked={selectItems.includes(category._id)}
            onChange={this._onItemCheckboxChange}
          />
          {content}
        </Wrapper>
      );
    }

    return content;
  }
}

export default CategoryTreeListItem;
