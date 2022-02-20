import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { withTheme } from 'styled-components';
import common from '@golpasal/common';
import { Rate } from 'antd';

import Loading from '../../Components/Common/Loading';
import H5 from '../../Components/Common/H5';

import {
  getUserFollowCount,
  getFeedbacks,
  getMerchantByUserId,
  getMemberByUserId
} from '../../Redux/selectors';
import FollowActions from '../../Redux/Follow/actions';
import { FeedbackActions } from '../../Redux/Feedback/actions';

import UserFollow from '../../Components/App/User/UserFollow';

const FollowCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FollowCountItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const FollowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > h5:last-child {
    margin-left: 5px;
  }
`;

class UserAvatarContainer extends React.PureComponent {
  componentDidMount() {
    const { userId, getUserFollowCount, getFeedback } = this.props;
    getUserFollowCount(userId);
    getFeedback({ query: { to: userId } });
  }
  componentDidUpdate(preProps) {
    const { userId, getUserFollowCount, getFeedback } = this.props;
    if (preProps.userId && preProps.userId !== userId) {
      getUserFollowCount(userId);
      getFeedback({ query: { to: userId } });
    }
  }

  render() {
    const {
      intl,
      userFollowCount = {},
      userId,
      pagination,
      merchant,
      member,
      userType,
      theme
    } = this.props;
    let isLoading = true;
    if (userFollowCount) {
      isLoading = false;
    }
    return isLoading ? (
      <Loading />
    ) : (
      <div>
        <FollowCountContainer>
          <FollowCountItemContainer>
            <UserFollow
              intl={intl}
              text={
                <FollowWrapper>
                  <H5>{userFollowCount.followers}</H5>
                  <H5>
                    {intl &&
                      intl.formatMessage({ id: 'display_user_followers' })}
                  </H5>
                </FollowWrapper>
              }
              title={intl.formatMessage({ id: 'display_user_followers' })}
              type="followers"
              userId={userId}
              total={userFollowCount.followers}
              disabled={true}
            />
          </FollowCountItemContainer>
          <FollowCountItemContainer>
            <UserFollow
              intl={intl}
              text={
                <FollowWrapper>
                  <H5>{userFollowCount.followings}</H5>
                  <H5>
                    {intl &&
                      intl.formatMessage({ id: 'display_user_folllowings' })}
                  </H5>
                </FollowWrapper>
              }
              title={intl.formatMessage({ id: 'display_user_folllowings' })}
              type="followings"
              userId={userId}
              total={userFollowCount.followings}
              disabled={true}
            />
          </FollowCountItemContainer>
          <FollowCountItemContainer>
            <UserFollow
              intl={intl}
              text={
                <FollowWrapper>
                  <H5>{pagination && pagination.total}</H5>
                  <H5>
                    {intl &&
                      intl.formatMessage({ id: 'display_user_feedback' })}
                  </H5>
                </FollowWrapper>
              }
              title={intl.formatMessage({ id: 'display_user_feedback' })}
              type="feedback"
              userId={userId}
              total={0}
              theme={theme}
            />
          </FollowCountItemContainer>
        </FollowCountContainer>
        <FollowCountContainer>
          <FollowCountItemContainer>
            {merchant && userType === common.type.UserType.USER && (
              <Rate
                allowHalf
                value={merchant.avgFeedback}
                style={{ color: theme.color.primary }}
                disabled
              />
            )}
            {member && userType === common.type.UserType.MEMBER && (
              <Rate
                allowHalf
                value={member.avgFeedback}
                style={{ color: theme.color.primary }}
                disabled
              />
            )}
          </FollowCountItemContainer>
        </FollowCountContainer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userFollowCount: getUserFollowCount(state, ownProps.userId),
  feedbacks: getFeedbacks(state),
  pagination: state.pagination.feedbacks,
  merchant: getMerchantByUserId(state, ownProps.userId),
  member: getMemberByUserId(state, ownProps.userId)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserFollowCount: FollowActions.getUserFollowCount,
      getFeedback: FeedbackActions.getFeedbacks
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(UserAvatarContainer));
