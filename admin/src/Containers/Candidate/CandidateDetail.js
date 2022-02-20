import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import CandidateDetail from '../../Components/App/Candidate/CandidateDetail';

import { ResumeActions } from '../../Redux/Resume/actions';
import { UserActions } from '../../Redux/User/actions';
import { getResumeByUserId } from '../../Redux/selectors';

import UserService from '../../Services/APIServices/UserService';

class CandidateListContainer extends React.PureComponent {
  state = {
    resume: {},
    member: {}
  };
  componentDidMount() {
    const { candidateId, fetchResumeByUserId } = this.props;
    fetchResumeByUserId(candidateId);
  }

  async getUserProfile(id) {
    const result = await UserService.getUserProfile(id);
    this.setState({
      member: result.data.member
    });
  }
  render() {
    const { resume, intl } = this.props;
    let isLoading = false;
    if (!resume) {
      isLoading = true;
    }
    return isLoading ? (
      <Loading isLoading={isLoading} />
    ) : (
      <CandidateDetail intl={intl} resume={resume} member={this.state.member} />
    );
  }
}
const mapStateToProps = (state, { candidateId }) => ({
  locale: state.intl.locale,
  resume: getResumeByUserId(state, candidateId)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchResumeByUserId: ResumeActions.getResumeByUserId,
      fetchUserProfile: UserActions.getUserProfile
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidateListContainer)
);
