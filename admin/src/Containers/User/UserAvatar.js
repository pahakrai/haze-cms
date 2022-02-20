import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from '../../Components/Common/Loading';
import { getUserById } from '../../Redux/selectors';
import { ParamActions } from '../../Redux/Param/actions';
import UserAvatar from '../../Components/Common/Avatar';

class UserAvatarContainer extends React.PureComponent {
  componentDidMount() {
    const { getParamAvatar, param } = this.props;
    if (!(param && param.parameters && param.parameters.uri)) {
      getParamAvatar();
    }
  }
  render() {
    const { user, param, fileMetaId, ...props } = this.props;
    let isLoading = true;
    if (user || fileMetaId) {
      isLoading = false;
    }
    return isLoading ? (
      <Loading />
    ) : (
      <UserAvatar
        fileMetaId={
          user && user.avatars && user.avatars.length > 0
            ? user.avatars[0].fileMeta
            : fileMetaId
        }
        src={
          user && user.avatars && user.avatars[0]
            ? user.avatars[0].uri
            : param && param.parameters && param.parameters.uri
        }
        {...props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: getUserById(state, ownProps.userId),
  param: state.param.defaultAvatar
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getParamAvatar: ParamActions.getParamAvatar
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatarContainer);
