import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { formatUserName } from '../../../Lib/util';
// Components Form
import FieldContainer from '../../../Components/Form/FieldContainer';
import FieldLabel from '../../../Components/Form/FieldLabel';
// UserList
import UserList from './UserList';
import SearchUser from '../SelectUser';

const LableLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export class SelectUserList extends React.PureComponent {
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
      noLabel
    } = this.props;

    return (
      <FieldContainer>
        {!noLabel && (
          <React.Fragment>
            <FieldLabel style={{ whiteSpace: 'nowrap' }}>{label}</FieldLabel>
            <LableLayout>
              <SearchUser
                meta={{}}
                full
                formatOption={user =>
                  [user.phone, formatUserName(user), user.email]
                    .filter(v => v)
                    .join(' / ')
                }
                input={{
                  value: '',
                  onBlur: () => true,
                  onChange: option => onChange && onChange([option, ...value])
                }}
                filterUsers={value}
              />
            </LableLayout>
          </React.Fragment>
        )}
        <UserList
          intl={intl}
          users={value}
          onDelectItem={_id =>
            onChange && onChange(value && value.filter(i => i !== _id))
          }
        />
      </FieldContainer>
    );
  }
}

export default props => {
  return <Field {...props} component={SelectUserList} />;
};
