import React from 'react';
import { Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import hasIn from 'lodash/hasIn';
import objGet from 'lodash/get';
import P from '../../Common/P';
import Separator from '../../Common/Separator';

import { isLayoutType } from './Utils';

const Label = styled(P)`
  padding: 8px 5px;
  margin: 0;
  width: 100%;
  text-align: left;
`;

const Field = styled(P)`
  padding: 8px 5px;
  margin: 0;
  width: 100%;
  text-align: right;
  color: ${props => props.theme.fonts.color.h5};
`;

const FieldContainer = styled.div`
  display: flex;
  min-width: 250px;
  flex-direction: row;
  align-items: center;
  :hover {
    background-color: ${props => props.theme.color.primarySelectedBg};
  }
`;

const Row = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    background-color: ${props => props.theme.color.primarySelectedBg};
  }
`;

const ActiveItem = styled.div`
  padding: 15px;
  min-width: 75px;
  line-height: 20px;
  cursor: pointer;
  color: ${props => props.theme.color.primary};
`;

const PageTitle = ({ page, locale, ...props }) => (
  // for popover trigger
  <Row {...props}>
    <FormattedMessage id={'page'} />
    {`: `}
    <ActiveItem>
      {page && page.title[locale]}
      <DownOutlined style={{ fontSize: 10 }} />
    </ActiveItem>
  </Row>
);
const PageDetail = ({ page, locale }) => {
  const isHideSomeField = isLayoutType(page);
  const displayFields = [
    { title: 'display_page_title', key: 'title', dataIndex: ['title', locale] },
    {
      title: 'version',
      key: 'version',
      dataIndex: 'version',
      render: value => `V.${value}`
    },
    ...(isHideSomeField
      ? []
      : [{ title: 'display_page_path', key: 'path', dataIndex: 'path' }])
  ];
  return (
    <div>
      {displayFields.map((f, index) => {
        const value = hasIn(page, f.dataIndex)
          ? objGet(page, f.dataIndex)
          : null;
        return (
          <FieldContainer key={`${f.key}-${index}`}>
            <Label>
              <FormattedMessage id={f.title} />
            </Label>
            <Separator vertical />
            {f.input ? (
              <f.input value={value} />
            ) : (
              <Field>{f.render ? f.render(value || '~') : value || '~'}</Field>
            )}
          </FieldContainer>
        );
      })}
    </div>
  );
};

const PageBase = ({ page, currentLocale }) => (
  <Popover
    placement="bottom"
    content={<PageDetail page={page} locale={currentLocale} />}
    trigger="hover"
  >
    <PageTitle page={page} locale={currentLocale} />
  </Popover>
);

export default PageBase;
