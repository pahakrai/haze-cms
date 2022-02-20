import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Loading from '../../Components/Common/Loading';
import { TagActions } from '../../Redux/Tag/actions';
import { getTagsText } from '../../Redux/selectors';

import TagForm from '../../Components/App/Tag/TagForm/index';

class TagFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  componentDidMount() {
    const { getTagByText, text } = this.props;

    if (text) getTagByText(text);
  }

  render() {
    let isLoading = false;
    const {
      tagsText,
      intl,
      locale,
      pagination,
      renderFooter,
      header,
      gutter
    } = this.props;
    if (!tagsText) {
      isLoading = true;
    }

    return isLoading ? (
      <Loading />
    ) : (
      <div style={{ background: '#fff', padding: '10px' }}>
        <TagForm
          tagsText={tagsText}
          locale={locale}
          intl={intl}
          isNextPageLoading={pagination.fetching}
          isEnd={pagination.isEnd}
          onLoadMore={this._onLoadMore}
          onDeleteClick={expense => true}
          renderFooter={renderFooter}
          gutter={gutter}
          header={header}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            showQuickJumper: true,
            total: pagination.total,
            onChange: this.onPageChange
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, { text }) => {
  return {
    tagsText: getTagsText(state),
    pagination: state.pagination.tags
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTagByText: TagActions.getTagByText
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TagFormContainer)
);
