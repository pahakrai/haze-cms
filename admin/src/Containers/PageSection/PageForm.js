import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';

import { PageActions } from '../../Redux/Page/actions';
import { PageTemplateActions } from '../../Redux/PageTemplate/actions';
import { getPageById } from '../../Redux/selectors';

import PageForm from '../../Components/App/Page/PageForm';
import Loading from '../../Components/Common/Loading';

class PageFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  componentDidMount() {
    const { pageId, getPageById } = this.props;
    if (pageId) getPageById(pageId);
  }

  componentDidUpdate(prevProps) {
    const { getPageErrors, history } = this.props;
    if (getPageErrors) history.push('/error');
  }

  onSubmit(page) {
    const { createPage, updatePage, pageTemplate } = this.props;
    const updateMode = !!page._id;
    const fn = updateMode ? updatePage : createPage;
    const initialValues = this.getInitialValues();
    const formValues = { ...page };

    delete formValues.pageTemplate;

    const submitValue = updateMode
      ? formValues
      : {
          ...formValues,
          content: pageTemplate ? pageTemplate.content : initialValues.content
        };
    fn && fn(submitValue);
  }

  onSubmitSuccess() {
    const { history, onSubmitSuccess, isSection } = this.props;
    history.push(isSection ? '/page-section' : '/page-seo');
    onSubmitSuccess && onSubmitSuccess();
  }

  onSubmitFail() {
    const { updateMode } = this.props;

    toast.error(
      <FormattedMessage
        id={updateMode ? 'updated_failure' : 'created_failure'}
      />
    );
  }

  getInitialValues = () => {
    const { page, updateMode, type, isSection, isSeo } = this.props;
    if (updateMode && page) {
      const layout =
        page.layout && typeof page.layout === 'object'
          ? page.layout._id
          : page.layout || null;
      const pageValues = { ...page, layout };
      // Unwanted content
      delete pageValues.content;
      return pageValues;
    } else {
      // create defalut values
      return {
        isSystem: false,
        isActive: true,
        type,
        version: 1,
        isTemplate: false,
        isSection: isSection ? true : false,
        isSeo: isSeo ? true : false,
        layout: null,
        // path: '/',
        content: {
          _id: '5e747ec29b06e3981c6752b8',
          layout: {
            stackName: 'flex',
            stack: [
              {
                _id: '5e747ec29b06e3981c6752b9',
                direction: 'column',
                widgets: []
              }
            ]
          },
          widgets: []
        },
        diffNodes: [
          {
            version: 1,
            up: { layout: [], widgets: [] },
            down: { layout: [], widgets: [] },
            date: new Date().toISOString()
          }
        ]
      };
    }
  };

  getLoading = () => {
    let isLoading = false; // dummy
    const { updateMode, page } = this.props;
    if (updateMode && !page) isLoading = true;
    return isLoading;
  };

  render() {
    const {
      updateMode,
      intl,
      form,
      type,
      history,
      isSection,
      isSeo
    } = this.props;
    const key = this.props.page ? this.props.page._id : 'new';
    const isLoading = this.getLoading();
    const initialValues = this.getInitialValues();
    return isLoading ? (
      <Loading />
    ) : (
      <PageForm
        // form props
        history={history}
        isSection={isSection}
        isSeo={isSeo}
        type={type}
        key={key}
        form={form}
        updateMode={updateMode}
        initialValues={initialValues}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        // other props
        intl={intl}
      />
    );
  }
}
const mapStateToProps = (state, { pageId }) => {
  const { PAGE_CREATE, PAGE_UPDATE } = FormName;
  const updateMode = Boolean(pageId);
  const form = updateMode ? PAGE_UPDATE : PAGE_CREATE;
  const page = getPageById(state, pageId);
  const pageTemplate = getPageById(
    state,
    formValueSelector(form)(state, 'pageTemplate')
  );
  return {
    form,
    page,
    pageTemplate,
    getPageErrors: state.error.getPage,
    updateMode
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createPage: PageActions.createPage,
      updatePage: PageActions.updatePage,
      getPages: PageActions.getPages,
      getPageById: PageActions.getPageById,
      getPageTemplateById: PageTemplateActions.getPageTemplateById
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageFormContainer));
