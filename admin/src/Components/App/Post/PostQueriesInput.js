import React from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';
import Immutable from 'seamless-immutable';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import * as CommonUtils from '@golpasal/common';
import { FormattedMessage } from 'react-intl';
import { Tabs as AntTabs } from 'antd';

import TextInput from '../../Common/TextInput';
import Button from '../../Common/Button';
import FieldLabel from '../../Form/FieldLabel';
import FieldContainer from './../../Form/FieldContainer';

const TabPane = AntTabs.TabPane;
const RemoveBtn = styled.span`
  position: absolute;
  top: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const RowWarp = styled(Row)`
  & .ant-tabs-bar {
    margin-bottom: 0px !important;
    border-bottom: none;
  }
  @media (min-width: 788px) {
    & .ant-tabs-tab {
      padding-top: 0px !important;
      padding-bottom: 8px !important;
    }
  }
`;
const QueriesItemField = {
  FILTERS: 'filters',
  QUERY_TYPE: 'queryType',
  TITLE: {
    en: 'en',
    'zh-hk': 'zh-hk',
    'zh-cn': 'zh-cn'
  }
};

class QueriesItemInput extends React.PureComponent {
  static defaultProps = {
    value: {
      filters: '',
      queryType: null,
      title: {
        en: ' ',
        'zh-hk': '',
        'zh-cn': ' '
      }
    },
    onChange: () => true,
    onRemove: () => true
  };
  render() {
    const { intl, value, index, onChange, onRemove } = this.props;
    const navTypeOptions = CommonUtils.helpers
      .getConstants('type', 'PostQueryType', intl.locale)
      .map(item => ({
        label: item.text,
        value: item.value
      }));
    return (
      <RowWarp gutter={30} style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          {!index ? (
            <FieldLabel>
              {intl.formatMessage({ id: 'display_post_query_type' })}
            </FieldLabel>
          ) : (
            <FieldLabel>&nbsp;</FieldLabel>
          )}
          <Select
            placeholder={intl.formatMessage({ id: 'display_select' })}
            options={navTypeOptions}
            onChange={(value, e) => {
              onChange(index, QueriesItemField.QUERY_TYPE, value, e);
            }}
            onBlur={() => true}
            value={navTypeOptions.find(opt => opt.value === value.queryType)}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11}>
          <FieldContainer>
            <FieldContainer>
              <AntTabs>
                <TabPane
                  tab={<FormattedMessage id="display_post_query_title" />}
                  key={1}
                >
                  <TextInput
                    placeholder={intl.formatMessage({
                      id: 'display_post_query_title'
                    })}
                    value={(value && value.title && value.title['zh-hk']) || ''}
                    onChange={(value, e) => {
                      onChange(
                        index,
                        QueriesItemField.TITLE['zh-hk'],
                        value,
                        e
                      );
                    }}
                  />
                </TabPane>
              </AntTabs>
            </FieldContainer>
          </FieldContainer>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          {!index ? (
            <FieldLabel>
              {intl.formatMessage({ id: 'display_post_query' })}
            </FieldLabel>
          ) : (
            <FieldLabel>&nbsp;</FieldLabel>
          )}
          <TextInput
            placeholder={intl.formatMessage({ id: 'display_post_query' })}
            value={value.filters || ''}
            onChange={(value, e) => {
              onChange(index, QueriesItemField.FILTERS, value, e);
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={1} xl={1}>
          <RemoveBtn onClick={e => onRemove(index, e)}>x</RemoveBtn>
        </Col>
      </RowWarp>
    );
  }
}

class QueriesInputContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queries:
        this.props.input &&
        this.props.input.value &&
        this.props.input.value.length
          ? this.props.input.value
          : [
              {
                filters: '',
                queryType: '',
                title: {
                  en: null,
                  'zh-hk': null,
                  'zh-cn': null
                }
              }
            ]
    };
  }
  static defaultProps = {
    input: {
      value: [],
      onChange: () => true,
      onBlur: () => true
    }
  };
  _onAddItem = e => {
    e.stopPropagation();
    e.preventDefault();
    const {
      input: { onChange }
    } = this.props;
    const { queries } = this.state;
    const newQueries = Immutable.asMutable(queries, { deep: true });
    newQueries.push({
      [QueriesItemField.FILTERS]: null,
      [QueriesItemField.QUERY_TYPE]: null,
      [QueriesItemField.TITLE]: {
        en: null,
        'zh-hk': null,
        'zh-cn': null
      }
    });
    this.setState({
      queries: newQueries
    });
    onChange(newQueries);
  };

  _onItemChange = (key, field, v, e) => {
    const {
      input: { value, onChange }
    } = this.props;
    const { queries } = this.state;
    if (!value || value.length === 0) {
      let newItem = {};
      if (QueriesItemField.TITLE.hasOwnProperty(field)) {
        newItem = { title: { [field]: v.value ? v.value : v } };
      } else newItem = { [field]: v.value ? v.value : v };
      this.setState({
        queries: [newItem]
      });
      onChange([newItem]);
    } else {
      const newQueries = Immutable.asMutable(queries, { deep: true });
      if (QueriesItemField.TITLE.hasOwnProperty(field)) {
        newQueries[key || 0].title = newQueries[key || 0].title || {};
        newQueries[key || 0].title[field] = v.value ? v.value : v;
      } else newQueries[key || 0][field] = v.value ? v.value : v;
      this.setState({
        queries: newQueries
      });
      onChange(Immutable(newQueries));
    }
  };

  _onRemoveItem = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    const {
      input: { onChange }
    } = this.props;
    const { queries } = this.state;
    const newQueries = Immutable.asMutable(queries, { deep: true });
    if (newQueries.length === 1) {
      this.setState({
        queries: []
      });
      onChange([]);
      return;
    }
    if (newQueries[index]) {
      newQueries.splice(index, 1);
      this.setState({
        queries: newQueries
      });
      onChange(newQueries);
    }
  };
  render() {
    const { intl } = this.props;
    const { queries } = this.state;
    const disabledBtn =
      queries &&
      queries.length &&
      (!queries[queries.length - 1].title ||
        !queries[queries.length - 1].title[QueriesItemField.TITLE.en] ||
        !queries[queries.length - 1].title[QueriesItemField.TITLE['zh-cn']] ||
        !queries[queries.length - 1].title[QueriesItemField.TITLE['zh-hk']] ||
        !queries[queries.length - 1][QueriesItemField.QUERY_TYPE]);
    return (
      <div>
        <FieldLabel>
          {intl.formatMessage({ id: 'display_post_queries' })}
        </FieldLabel>
        {!queries || queries.length === 0 ? (
          <QueriesItemInput
            intl={intl}
            onChange={this._onItemChange}
            onRemove={this._onRemoveItem}
          />
        ) : (
          queries.map((v, index) => (
            <QueriesItemInput
              onChange={this._onItemChange}
              onRemove={this._onRemoveItem}
              index={index}
              key={index}
              value={v}
              intl={intl}
            />
          ))
        )}
        <Button.Primary disabled={disabledBtn} onClick={this._onAddItem}>
          +
        </Button.Primary>
      </div>
    );
  }
}

export default props => {
  return <Field {...props} component={QueriesInputContainer} />;
};
