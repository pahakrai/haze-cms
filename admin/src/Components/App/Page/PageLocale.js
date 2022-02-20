import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Locales, { locales as AppSupportLanguages } from '../../../Locales';
import './styles.css';

const LocaleItem = styled.div`
  color: #000;
  padding: 15px;
  min-width: 65px;
  line-height: 20px;
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.color.primarySelectedBg};
    color: ${props => props.theme.color.primary};
  }
`;

const Row = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LocaleMenu = ({ currentLocale, onLocaleChange }) => (
  <Menu selectedKeys={[currentLocale]} onClick={e => onLocaleChange(e.key)}>
    {AppSupportLanguages.map(v => (
      <Menu.Item key={v}>{Locales[v.replace('-', '_')].__name__}</Menu.Item>
    ))}
  </Menu>
);

const PageLocale = ({ currentLocale = 'en', onLocaleChange }) => (
  <Dropdown
    overlay={() => (
      <LocaleMenu
        currentLocale={currentLocale}
        onLocaleChange={onLocaleChange}
      />
    )}
  >
    <Row>
      <FormattedMessage
        id={'display_page_content'}
        style={{ marginLeft: 10 }}
      />
      {`：`}
      <LocaleItem>
        {Locales[currentLocale.replace('-', '_')].__name__}
        <DownOutlined style={{ fontSize: 10 }} />
      </LocaleItem>
    </Row>
  </Dropdown>
);

export default PageLocale;
