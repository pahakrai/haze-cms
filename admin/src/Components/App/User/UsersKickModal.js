import React from 'react';
import styled from 'styled-components';
import { message } from 'antd';
import { Field } from 'redux-form';
import Button from '../../Common/Button';
import H3 from '../../Common/H3';
import Modal from '../../Modal';
import KickUserList from './KickUserList';
import theme from '../../../Themes';

const ModalWrap = styled.div`
  width: 50vw;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -32px;
  margin-bottom: 30px;
  padding: 10px 32px;
  border-bottom: 1px solid rgb(226, 226, 226);
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalFooter = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-top: 1px solid ${props => props.theme.color.border};
`;

const UserListWrap = styled.div`
  height: 500px;
  overflow-x: auto;
`;

const KickButton = styled(Button.Primary)`
  margin-right: 20px;
  margin-bottom: 0px;
`;

const IconButton = styled(Button)`
  padding: 10px 14px;
  display: block;
  position: relative;
  width: auto;
  min-width: auto;
`;

const CheckAllButton = styled(IconButton)`
  margin-right: 15px;
  color: ${props => props.theme.color.secondaryHighlightText};
  background-color: ${props => props.theme.color.secondaryHighlight};
`;

class UsersKickModal extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      selected: []
    };

    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeSelected({ _id: id }) {
    const { selected } = this.state;
    const index = selected.indexOf(id);
    let newSelected = [...selected];

    index === -1 ? newSelected.push(id) : newSelected.splice(index, 1);

    this.setState({
      selected: newSelected
    });
  }
  handleCheckAll() {
    const { users } = this.props;
    const { selected } = this.state;
    let newSelected = [];
    if (selected.length !== users.length) {
      newSelected = users.map(v => v._id);
    }
    this.setState({
      selected: newSelected
    });
  }

  handleSubmit() {
    const { input } = this.props;
    const { selected } = this.state;
    if (selected.length === 0) {
      message.info('No user selected');
      return;
    }

    input.onChange(input.value.filter(v => !selected.includes(v.user._id)));
  }
  checkAllButton() {
    const { users, intl } = this.props;
    const { selected } = this.state;
    const checkAll = selected.length === users.length;
    const label = checkAll
      ? intl.formatMessage({ id: 'cancel' })
      : intl.formatMessage({ id: 'check_all' });

    return (
      <CheckAllButton theme={theme} onClick={this.handleCheckAll}>
        {label}
      </CheckAllButton>
    );
  }
  render() {
    const { isOpen, onRequestClose, users, intl } = this.props;
    const { selected } = this.state;

    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <ModalWrap>
          <HeaderContainer>
            <H3>{'Users Kick'}</H3>
            <HeaderRight>
              {this.checkAllButton()}
              <IconButton type="button" onClick={onRequestClose}>
                x
              </IconButton>
            </HeaderRight>
          </HeaderContainer>
          <UserListWrap>
            <KickUserList
              onItemClick={this.handleChangeSelected}
              selected={selected}
              users={users}
            />
          </UserListWrap>
          <ModalFooter theme={theme}>
            <KickButton onClick={this.handleSubmit}>
              {intl.formatMessage({ id: 'confirm' })}
            </KickButton>
            <KickButton onClick={onRequestClose}>
              {intl.formatMessage({ id: 'cancel' })}
            </KickButton>
          </ModalFooter>
        </ModalWrap>
      </Modal>
    );
  }
}

export default props => {
  return (
    <Field
      {...props}
      component={props => (
        <UsersKickModal
          {...props}
          users={
            props.input && props.input.value
              ? props.input.value.map(({ user }) => user)
              : []
          }
        />
      )}
    />
  );
};
