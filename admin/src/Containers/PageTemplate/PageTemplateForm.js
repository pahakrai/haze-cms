import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';

import { PageTemplateActions } from '../../Redux/PageTemplate/actions';
import { getPageTemplateById } from '../../Redux/selectors';

import PageTemplateForm from '../../Components/App/PageTemplate/PageTemplateForm';
import Loading from '../../Components/Common/Loading';

class PageTemplateFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  componentDidMount() {
    const { pageTemplateId, getPageTemplateById } = this.props;

    if (pageTemplateId)
      getPageTemplateById(pageTemplateId, { populates: ['preview', 'page'] });
  }
  componentDidUpdate(prevProps) {
    const { getPageTemplateErrors, history } = this.props;

    if (getPageTemplateErrors) {
      history.push('/error');
    }
  }

  onSubmit(_pageTemplate) {
    const { createPageTemplate, updatePageTemplate } = this.props;
    const fn = _pageTemplate._id ? updatePageTemplate : createPageTemplate;

    const newImages = [];
    const pageTemplate = {
      ..._pageTemplate,
      preview: [..._pageTemplate.preview]
    };

    // images
    const images = pageTemplate.preview;

    if (images.length !== 0) {
      images.forEach(image => {
        if (image.fileMeta) {
          if (typeof image.fileMeta === 'string') {
            pageTemplate.preview = image.fileMeta;
          } else {
            pageTemplate.preview = image.fileMeta._id;
          }
        } else {
          newImages.push(image);
        }
      });
    } else {
      pageTemplate.preview = undefined;
    }

    // update
    if (_pageTemplate._id) {
      fn(_pageTemplate, newImages);
    } else {
      fn(_pageTemplate, newImages);
    }
  }

  onSubmitSuccess() {
    const {
      updateMode,
      getPageTemplates,
      history,
      onSubmitSuccess
    } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    history.push('/page-templates');
    getPageTemplates({
      query: {
        populates: ['preview', 'page']
      },
      refresh: true
    });
    onSubmitSuccess();
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
    const { pageTemplate, updateMode } = this.props;
    const createValue = { preview: [], isActive: 'true' };
    return updateMode
      ? {
          ...pageTemplate,
          page: pageTemplate && pageTemplate.page && pageTemplate.page._id,
          preview:
            pageTemplate && pageTemplate.preview
              ? [{ fileMeta: pageTemplate.preview }]
              : []
        }
      : createValue;
  };

  render() {
    const key = this.props.pageTemplate ? this.props.pageTemplate._id : 'new';
    let isLoading = false; // dummy
    const { updateMode, intl, pageTemplate, form, location } = this.props;

    if (updateMode && !pageTemplate) {
      isLoading = true;
    }
    const initialValues = this.getInitialValues();

    return isLoading ? (
      <Loading />
    ) : (
      <PageTemplateForm
        // form props
        key={key}
        form={form}
        updateMode={updateMode}
        initialValues={initialValues}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        // other props
        intl={intl}
        currentLocation={location.pathname}
      />
    );
  }
}
const mapStateToProps = (state, { pageTemplateId }) => {
  const { PAGE_TEMPLATE_CREATE, PAGE_TEMPLATE_UPDATE } = FormName;
  const updateMode = Boolean(pageTemplateId);
  const form = updateMode ? PAGE_TEMPLATE_UPDATE : PAGE_TEMPLATE_CREATE;
  const pageTemplate = getPageTemplateById(state, pageTemplateId);

  return {
    form,
    pageTemplate,
    getPageTemplateErrors: state.error.getPageTemplate,
    updateMode
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createPageTemplate: PageTemplateActions.createPageTemplate,
      updatePageTemplate: PageTemplateActions.updatePageTemplate,
      getPageTemplates: PageTemplateActions.getPageTemplates,
      getPageTemplateById: PageTemplateActions.getPageTemplateById
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageTemplateFormContainer)
);
