import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// UI
import Loading from '../../Components/Common/Loading';
import PageList from '../../Components/App/PageSection/PageSectionList';
// import Modal from '../../Components/Modal';
// import { modalStyle as ModalButtonStyle } from '../../Components/Modal/ModalButton';
// import PageFormContainer from './PageForm';
// redux saga
import { PageActions } from '../../Redux/Page/actions';
import { getPages } from '../../Redux/selectors';

class PageListContainer extends React.PureComponent {
  state = {
    selectId: null
  };

  // state = { shouldOpenModal: false };

  componentDidMount() {
    this.fetchPages({ refresh: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.fetchPages({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { fetchPages } = this;
    fetchPages({ append: true });
  };

  fetchPages = (options = { querys: {} }) => {
    const { fetchPages, type, isSection, isSeo } = this.props;
    fetchPages({
      ...options,
      query: {
        ...options.querys,
        isSection: isSection ? isSection : false,
        isTemplate: false,
        isSystem: false,
        isSeo: isSeo ? isSeo : false,
        type,
        populate: 'layout'
      }
    });
  };
  onPageChange = (page, limit) => {
    this.fetchPages({ querys: { page, limit } });
  };
  onItemEdit = page => {
    const { isSeo } = this.props;
    this.props.history.push(
      isSeo
        ? `page-seo/${page._id}/content`
        : `page-section/${page._id}/content`
    );
  };

  render() {
    const { onItemEdit } = this;
    const {
      pages,
      locale,
      intl,
      type,
      pagination,
      renderFooter,
      header,
      gutter,
      isSeo,
      isSection
      // isTemplate
    } = this.props;
    const isLoading = pagination.refreshing;
    return isLoading ? (
      <Loading isLoading={true} fill />
    ) : (
      <React.Fragment>
        <PageList
          locale={locale}
          intl={intl}
          type={type}
          onLoadMore={this._onLoadMore}
          onItemEdit={onItemEdit}
          pages={pages}
          // onDeleteClick={expense => true}
          renderFooter={renderFooter}
          gutter={gutter}
          header={header}
          isSeo={isSeo}
          isSection={isSection}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            showQuickJumper: true,
            total: pagination.total,
            onChange: this.onPageChange
          }}
        />
        {/* <Modal.Default
          shouldOpenModal={this.state.shouldOpenModal}
          onModalClose={() => this.setState({ shouldOpenModal: false })}
          resModal={{ style: ModalButtonStyle }}
          title={intl.formatMessage({ id: 'nav.pages' })}
          content={closeModal => (
            <PageFormContainer
              type={type}
              pageId={this.state.selectId}
              intl={intl}
              isTemplate={isTemplate}
              onSubmitSuccess={() => closeModal()}
            />
          )}
        /> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  pages: getPages(state),
  pagination: state.pagination.pages
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPages: PageActions.getPages
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageListContainer)
);
