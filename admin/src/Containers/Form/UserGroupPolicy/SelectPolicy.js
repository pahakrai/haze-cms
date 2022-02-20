import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
// Components Form
import FieldContainer from '../../../Components/Form/FieldContainer';
import FieldLabel from '../../../Components/Form/FieldLabel';
// Components
import Spacer from '../../../Components/Common/Spacer';
// Permission
import PolicyList from './PolicyList';
import SelectPolicyModalButton from './SelectPolicyModalButton';

const LableLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export class SelectPolicy extends React.PureComponent {
  _onDone = keys => {
    const {
      input: { onChange }
    } = this.props;
    onChange && onChange(keys);
  };
  render() {
    const {
      input: { value, onChange },
      intl,
      label,
      noLabel,
      disabled
    } = this.props;
    return (
      <FieldContainer>
        {!noLabel && (
          <LableLayout>
            <FieldLabel>{label}</FieldLabel>
            <Spacer width={10} />
            <SelectPolicyModalButton
              disabled={disabled}
              intl={intl}
              initValue={value}
              onDone={this._onDone}
            />
          </LableLayout>
        )}
        <PolicyList
          intl={intl}
          disabledSelected
          filterRowKeys={value}
          onSelectChange={keys => onChange && onChange(keys)}
          showHeader={false}
        />
      </FieldContainer>
    );
  }
}

export default props => {
  return <Field {...props} component={SelectPolicy} />;
};
