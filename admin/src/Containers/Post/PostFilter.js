import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DatePicker, Row, Select, Col } from 'antd';
import moment from 'moment';

import Title from '../../Components/Common/H5';

const FilterLabel = styled(Title)`
  display: block;
  margin-right: 0.5em;
`;
const Spacer10 = styled.div`
  height: 10px;
`;

export default class Filter extends PureComponent {
  static propTypes = {
    onChanged: PropTypes.func
  };
  static defaultProps = {
    onChanged: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      createdAt: []
    };
  }
  _onChanged = () => {
    const { onChanged } = this.props;
    const createdAt = this.state.createdAt.length
      ? moment(this.state.createdAt[0]).format('YYYY-MM-DD hh:mmZ') +
        ',' +
        moment(this.state.createdAt[1]).format('YYYY-MM-DD hh:mmZ')
      : '';
    onChanged({
      ...this.state,
      createdAt
    });
  };
  render() {
    const { _onChanged } = this;
    const { intl } = this.props;

    return (
      <div>
        <Row style={{ marginTop: '0.5em' }}>
          <Col xs={24} span={8}>
            <FilterLabel>
              {intl.formatMessage({ id: 'device.create_time' })}
            </FilterLabel>
            <DatePicker.RangePicker
              defaultValue={this.state.createdAt}
              onChange={value => {
                this.setState(
                  {
                    createdAt: value
                  },
                  _onChanged
                );
              }}
            />
            <Spacer10 />
          </Col>
          <Col xs={24} span={8}>
            <FilterLabel>
              {intl.formatMessage({ id: 'display_page_status' })}
            </FilterLabel>
            <Select
              style={{ width: 120 }}
              defaultValue=""
              onChange={value => {
                this.setState(
                  {
                    isActive: value
                  },
                  _onChanged
                );
              }}
            >
              <Select.Option value="">
                {intl.formatMessage({ id: 'all' })}
              </Select.Option>
              <Select.Option value="true">
                {intl.formatMessage({ id: 'display_available' })}
              </Select.Option>
              <Select.Option value="false">
                {intl.formatMessage({ id: 'display_unavailable' })}
              </Select.Option>
            </Select>
          </Col>
        </Row>
      </div>
    );
  }
}
