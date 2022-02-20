import React, { PureComponent } from 'react';

// Components
import CreatePolicyButton from '../../../Components/App/UserGroupPolicy/CreatePolicyButton';
import Modal from '../../../Components/Modal';
import Button from '../../../Components/Common/Button';
// User Group Policy
import PolicyList from './PolicyList';

export class SelectPolicyModalButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initValue
    };
  }

  componentDidUpdate(prevProps) {
    const { initValue } = this.props;
    if (initValue !== prevProps.initValue) {
      this.setState({ value: initValue });
    }
  }

  _onChange = keys => {
    this.setState({
      value: keys
    });
  };

  render() {
    const { disabled, intl, onDone, initValue } = this.props;
    const { value } = this.state;

    return (
      <Modal.Button
        modalContentStyle={{
          width: '90%',
          maxWidth: '90vw',
          margin: ' 0 auto'
        }}
        button={openModal => (
          <CreatePolicyButton
            disabled={disabled}
            onClick={() => {
              openModal && openModal();
              this.setState({
                value: initValue
              });
            }}
          />
        )}
        title={intl.formatMessage({
          id: 'display_userGroup_permissions'
        })}
        content={closeModal => (
          <PolicyList
            intl={intl}
            selectedRowKeys={value}
            showHeader
            disabledDelete
            pageSize={10}
            disabledSelected={false}
            onSelectChange={this._onChange}
          />
        )}
        footer={({ closeModal }) => (
          <Button.Primary
            style={{ float: 'right' }}
            onClick={() => {
              onDone(value);
              closeModal();
            }}
          >
            {intl.formatMessage({ id: 'done' })}
          </Button.Primary>
        )}
      />
    );
  }
}

export default SelectPolicyModalButton;
