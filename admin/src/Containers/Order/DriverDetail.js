import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { hasIn } from 'lodash';
// import { StarFilled } from '@ant-design/icons';

import UserAvatar from '../../Components/Common/Avatar';
import { formatUserName } from '../../Lib/util';

import DriverRating from './DriverRating';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;
export class DriverDetail extends PureComponent {
  render() {
    const { intl, input, logistic } = this.props;
    const driver = input.value || {};
    const user = driver;
    return (
      <Container>
        <UserAvatar
          fileMetaId={
            hasIn(user, 'avatars[0].fileMeta') ? user.avatars[0].fileMeta : ''
          }
          avatarStyle={{ width: 35, height: 35 }}
        />
        <div style={{ marginLeft: 10 }}>
          <div style={{ fontSize: 14 }}>{formatUserName(user)} </div>
          <div style={{ fontSize: 12, color: '#999' }}>
            {logistic ? logistic?.vehicle?.plateNo : ''}
            {hasIn(logistic, `vehicle.make.name[${intl.locale}]`)
              ? logistic.vehicle.make.name[intl.locale]
              : ''}
          </div>
          {input.value && (
            <div style={{ fontSize: 12, color: '#ccc' }}>
              <DriverRating userId={user?._id} />
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default props => {
  return <Field {...props} component={DriverDetail} />;
};
