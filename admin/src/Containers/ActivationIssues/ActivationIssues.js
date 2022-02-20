import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col } from 'react-flexa';
import moment from 'moment';
import FieldLabel from '../../Components/Form/FieldLabel';
import Spacer from '../../Components/Common/Spacer';
import { Table, Button as AntdButton } from 'antd';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Button from '../../Components/Common/Button';
import Modal from '../../Components/Modal';
import { UserActions } from '../../Redux/User/actions';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.marginBottom || 0}px;
  justify-content: ${props =>
    !props.useJustify ? 'space-between' : 'flex-start'};
`;
const TextArea = styled.textarea`
  min-height: 100px;
  padding: 6px 10px;
  cursor: text;
  text-align: left;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(51, 51, 51, 1);
  background-color: #fff;
  background-image: none;
  border: 1px solid #e9e9e9;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-transition: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -moz-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -ms-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -o-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  &:disabled {
    cursor: default;
    background-color: rgba(0, 0, 0, 0.03);
    color: #999999;
  }
  border-radius: 6px;
  border: 1px solid rgba(236, 237, 237, 1);
`;
class Reason extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  state = {
    value: ''
  };
  UserOnchange = event => {
    this.setState({
      value: event.target.value
    });
  };
  onSubmit = () => {
    const { createReason, userId, onSubmitSuccess } = this.props;
    const { value } = this.state;
    createReason(userId, [
      {
        reason: value,
        status: 0
      }
    ]);
    onSubmitSuccess();
  };
  render() {
    const { value } = this.state;
    const { intl } = this.props;
    return (
      <React.Fragment>
        <TextArea
          value={value}
          onChange={this.UserOnchange}
          placeholder={intl.formatMessage({ id: 'display_reason' })}
          ref={ref => (this.textarea = ref)}
        />
        <Row>
          <Col
            xs={12}
            display="flex"
            style={{ justifyContent: 'flex-end', padding: 0 }}
          >
            <Button.Primary type="submit" onClick={this.onSubmit}>
              {intl.formatMessage({ id: 'display_submit' })}
            </Button.Primary>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

class TableReason extends React.PureComponent {
  updateReasonFunc = value => {
    const { updateReason, initialValues } = this.props;
    let values = Object.assign({}, value);
    values.status = 100;
    updateReason(initialValues._id, values);
  };
  render() {
    const { reason, intl } = this.props;
    const columns = [
      {
        title: intl.formatMessage({ id: 'display_reason' }),
        dataIndex: 'reason',
        key: 'Reason'
      },
      {
        title: intl.formatMessage({ id: 'display_time' }),
        dateIndex: 'createdAt',
        width: '20%',
        key: 'createdAt',
        render: (e, value) => {
          return (
            <div>{moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          );
        }
      },
      {
        title: intl.formatMessage({ id: 'status' }),
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: v => {
          let str =
            v === 0
              ? intl.formatMessage({ id: 'display_issues_status_un_resolved' })
              : v === 50
              ? intl.formatMessage({ id: 'display_issues_status_reviewing' })
              : intl.formatMessage({ id: 'display_issues_status_resolved' });
          return <div>{str}</div>;
        }
      },
      {
        title: intl.formatMessage({ id: 'display_coupon_action' }),
        width: '30%',
        render: v => {
          return v.status === 100 ? (
            <CheckOutlined style={{ height: 30, verticalAlign: 0 }} />
          ) : (
            <AntdButton
              style={{
                backgroundColor: '#fff',
                color: '#000',
                height: 30
              }}
              onClick={this.updateReasonFunc.bind(this, v)}
            >
              {intl.formatMessage({ id: 'display_update_as_resolved' })}
            </AntdButton>
          );
        }
      }
    ];
    return <Table dataSource={reason} columns={columns} />;
  }
}
class ActivationIssues extends React.PureComponent {
  _getLabel = () => {
    const { intl, lable } = this.props;
    return lable || intl.formatMessage({ id: 'create_btn' });
  };
  render() {
    const { intl, createReason, initialValues, updateReason } = this.props;
    const reason =
      initialValues.activationIssues &&
      initialValues.activationIssues.length > 0
        ? initialValues.activationIssues
        : [];

    return (
      <React.Fragment>
        <React.Fragment>
          <Row marginBottom={10} useJustify>
            <FieldLabel>{this._getLabel()}</FieldLabel>
            <Spacer width={10} />
            <Modal.Button
              button={openModal => (
                <AntdButton
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => openModal()}
                />
              )}
              title={intl.formatMessage({ id: 'display_issues_reason' })}
              content={closeModal => (
                <Reason
                  intl={intl}
                  createReason={createReason}
                  userId={initialValues._id}
                  initialValues={initialValues}
                  onSubmitSuccess={() => {
                    closeModal();
                  }}
                />
              )}
            />
          </Row>
          <TableReason
            reason={reason}
            intl={intl}
            initialValues={initialValues}
            updateReason={updateReason}
          />
        </React.Fragment>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createReason: UserActions.addReason,
      updateReason: UserActions.updateReason
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivationIssues)
);
