import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import CandidateList from '../../Components/App/Candidate/CandidateList';
import { CandidateActions } from '../../Redux/Candidate/actions';
import { getCandidates } from '../../Redux/selectors';

class CandidateListContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchCandidates({ refresh: true });
  }

  _onLoadMore = () => {
    const { fetchCandidates } = this.props;
    fetchCandidates({ append: true });
  };

  fetchCandidates(options = { querys: {} }) {
    const { fetchCandidates, recruitmentPostId } = this.props;
    fetchCandidates({
      ...options,
      query: {
        ...options.querys,
        recruitmentIds: [recruitmentPostId],
        populates: ['recruitment', 'candidate']
      }
    });
  }

  onItemClick = values => {
    this.props.history.push(
      `/recruitment-posts/candidate/detail/${values.candidate._id}`
    );
  };

  render() {
    const { onItemClick } = this;
    const isLoading = false;
    const {
      candidates,
      locale,
      intl,
      pagination: { fetching, isEnd },
      renderFooter,
      header,
      gutter
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <CandidateList
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={onItemClick}
        candidates={candidates}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  candidates: getCandidates(state),
  pagination: state.pagination.candidates
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCandidates: CandidateActions.getCandidates
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CandidateListContainer)
);
