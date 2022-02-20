import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EcommCommonType from '@golpasal/common';
import { withRouter } from 'react-router-dom';
const { UserType } = EcommCommonType.type;

class UserListContainer extends React.PureComponent {
  render() {
    const {
      pagination = { total: 0 },
      paginationMember = { total: 0 },
      intl,
      userType
    } = this.props;
    return (
      <span
        style={{
          lineHeight: '57px',
          overflow: 'hidden',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
      >
        {intl.formatMessage(
          {
            id: 'display_page.total_record'
          },
          {
            n:
              userType === UserType.MEMBER
                ? paginationMember.total
                : pagination.total
          }
        )}
      </span>
    );
  }
}
const mapStateToProps = (state, props) => ({
  pagination: state.pagination.user,
  paginationMember: state.pagination.members
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
);
