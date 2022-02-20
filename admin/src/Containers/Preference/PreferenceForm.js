import React from 'react';
import { connect } from 'react-redux';
import { toast } from '../../Lib/Toast';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { formValueSelector } from 'redux-form';

import Loading from '../../Components/Common/Loading';

import PreferenceForm from '../../Components/App/Preference/PreferenceForm';

import { CategoryActions } from '../../Redux/Category/actions';
import { MemberActions } from '../../Redux/Member/actions';
import { TagRecommendationActions } from '../../Redux/TagRecommendation/actions';

import { RegionActions } from '../../Redux/Region/actions';
import {
  getAllCategory,
  getAllTagRecommendation,
  getRegionById,
  getMemberById
} from '../../Redux/selectors';

import FormName from '../../Constants/Form';

class PreferenceFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  componentDidMount() {
    const {
      getAllCategory,
      getRegionById,
      getTagRecommendations,
      member
    } = this.props;

    getAllCategory({ aggregate: false, isActive: true }, true);

    getTagRecommendations();
    if (member) {
      getRegionById(member.preferences.locations[0]);
    }
    // if (preferenceId) getPreferenceById(preferenceId);
  }
  componentDidUpdate(prevProps) {
    const { getPreferenceErrors, history } = this.props;

    if (getPreferenceErrors) {
      history.push('/error');
    }
  }

  onSubmit() {}

  onSubmitSuccess() {
    const { updateMode, history, onSubmitSuccess } = this.props;
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    );
    history.push('/preferences');
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
    const { member, updateMode, regions } = this.props;
    const createValue = {};
    return updateMode
      ? {
          ...member.preferences,
          locations: regions
            ? {
                properties: {
                  district: regions._id,
                  regions: regions.ancestors.concat(regions._id)
                }
              }
            : {}
        }
      : createValue;
  };

  render() {
    const key = this.props.member ? this.props.member._id : 'new';
    let isLoading = false;
    const {
      updateMode,
      intl,
      form,
      workspaceType,
      categories,
      formValueCategory,
      formValueTag,
      formValueEmploymentType,
      formValueUnit,
      tagRecommendations,
      currentWorkspace,
      currencies
    } = this.props;

    const initialValues = this.getInitialValues();
    return isLoading ? (
      <Loading />
    ) : (
      <PreferenceForm
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
        workspaceType={workspaceType}
        noTitle={true}
        categories={categories}
        tagRecommendations={tagRecommendations}
        formValueCategory={formValueCategory}
        formValueEmploymentType={formValueEmploymentType}
        formValueUnit={formValueUnit}
        formValueTag={formValueTag}
        currentWorkspace={currentWorkspace}
        currencies={currencies}
      />
    );
  }
}
const mapStateToProps = (state, { memberId }) => {
  const { PREFERENCE_UPDATE, PREFERENCE_CREATE } = FormName;
  const updateMode = Boolean(memberId);
  const member = getMemberById(state, memberId);
  const form = updateMode ? PREFERENCE_UPDATE : PREFERENCE_CREATE;
  const selector = formValueSelector(form);

  return {
    form,
    member,
    getPreferenceErrors: state.error.getPreference,
    formValueCategory: selector(state, 'categories'),
    formValueTag: selector(state, 'tags'),
    formValueEmploymentType: selector(state, 'employmentTypes'),
    formValueUnit: selector(state, 'wage.unit'),
    categories: getAllCategory(state),
    tagRecommendations: getAllTagRecommendation(state),
    regions:
      member && member.preferences && member.preferences.locations
        ? getRegionById(state, member.preferences.locations[0])
        : [],
    updateMode
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCategory: CategoryActions.getAllCategory,
      getRegionById: RegionActions.getRegionById,
      getMemberById: MemberActions.getMemberById,
      getTagRecommendations: TagRecommendationActions.getTagRecommendations
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreferenceFormContainer)
);
