import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import PageTemplateList from '../../Components/App/PageTemplate/PageTemplateList';
import { PageTemplateActions } from '../../Redux/PageTemplate/actions';
import { getPageTemplates } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class PageTemplateListContainer extends React.PureComponent {
  componentDidMount() {
    const { pageTemplates } = this.props;
    if (!pageTemplates.length) {
      this.fetchPageTemplates({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { fetchPageTemplates } = this.props;
    fetchPageTemplates({ append: true });
  };

  fetchPageTemplates(options = { querys: {} }) {
    const { fetchPageTemplates } = this.props;
    fetchPageTemplates({
      ...options,
      query: { ...options.querys, populates: ['preview', 'page'] }
    });
  }

  onItemClick = pageTemplate => {
    this.props.history.push(`/page-templates/${pageTemplate._id}`);
  };

  render() {
    const { onItemClick } = this;
    const {
      pageTemplates,
      locale,
      intl,
      pagination: { fetching, isEnd, refreshing },
      renderFooter,
      header,
      gutter
    } = this.props;
    const isLoading = refreshing;
    return isLoading ? (
      <Loading isLoading={true} fill />
    ) : (
      <PageTemplateList
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={onItemClick}
        pageTemplates={pageTemplates}
        // onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  pageTemplates: getPageTemplates(state),
  pagination: state.pagination.pageTemplates
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPageTemplates: PageTemplateActions.getPageTemplates
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageTemplateListContainer)
);
