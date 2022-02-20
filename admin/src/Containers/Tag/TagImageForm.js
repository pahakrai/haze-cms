import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';

import TagImageForm from '../../Components/App/Tag/TagImageForm';

import { toast } from '../../Lib/Toast';
import FormName from '../../Constants/Form';
import Loading from '../../Components/Common/Loading';
import { TagActions } from '../../Redux/Tag/actions';
import { getTagByText } from '../../Redux/selectors';
import TagService from '../../Services/APIServices/TagService';

class TagImageFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { text, getDistinctTags } = this.props;
    getDistinctTags({ query: { text } });
  }

  getInitialValues = () => {
    const { tag } = this.props;
    let cloneTag = {};
    if (tag) {
      cloneTag = cloneDeep(tag);
      if (cloneTag.tagImage.length > 0) {
        cloneTag.tagImage[0].image =
          tag.tagImage.length > 0 && tag.tagImage[0].image !== null
            ? [{ fileMeta: tag.tagImage[0].image }]
            : [];
      } else {
        cloneTag.tagImage = [{ image: [] }];
      }
    }

    return cloneTag;
  };

  async onSubmit(tag) {
    const { updateMode } = this.props;
    this.setState({ loading: true });
    const image = tag.tagImage[0].image;
    let filemeta = null;
    let preview = [];
    if (image.length > 0) {
      if (image[0].hasOwnProperty('preview')) {
        preview = image;
      } else {
        filemeta = image[0].fileMeta._id;
      }
    } else {
      filemeta = null;
      preview = [];
    }
    if (updateMode) {
      await TagService.updateTagImage(
        tag.tagImage[0]._id,
        { tag: tag._id, image: filemeta },
        preview
      );
    } else {
      await TagService.createTagImage(
        {
          text: tag.text,
          image: filemeta === null ? undefined : filemeta
        },
        preview
      );
    }
    this.setState({ loading: false });
    this.onSubmitSuccess();
  }

  onSubmitSuccess() {
    const { history, onSubmitSuccess } = this.props;
    toast.success(<FormattedMessage id={'updated_successfully'} />);
    history.push(`/tag`);
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

  render() {
    const { intl, form, tag, text } = this.props;
    let isLoading = false;
    const initialValues = this.getInitialValues();
    if (!tag) {
      isLoading = true;
    }
    return isLoading ? (
      <Loading isLoading={isLoading} />
    ) : (
      <div>
        <Loading fill isLoading={this.state.loading} />
        <TagImageForm
          intl={intl}
          form={form}
          tag={tag}
          text={text}
          initialValues={initialValues}
          onSubmit={this.onSubmit.bind(this)}
          onSubmitFail={this.onSubmitFail.bind(this)}
          onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, { text }) => {
  const { TAG_IMAGE_UPDATE, TAG_IMAGE_CREATE } = FormName;
  const tag = getTagByText(state, text);

  const updateMode = tag && tag.tagImage.length ? true : false;
  const form = updateMode ? TAG_IMAGE_UPDATE : TAG_IMAGE_CREATE;

  return {
    tag,
    form,
    updateMode
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDistinctTags: TagActions.getDistinctTags
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TagImageFormContainer)
);
