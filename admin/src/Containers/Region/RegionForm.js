import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Common from '@golpasal/common';

import { toast } from '../../Lib/Toast';

import { RegionActions } from '../../Redux/Region/actions';
import { FileMetaActions } from '../../Redux/FileMeta/actions';
import AccountSelector from '../../Redux/Account/selectors';
import { getRegionById, getAllSvgFileMeta } from '../../Redux/selectors';

import RegionForm from '../../Components/App/Region/RegionForm';
import Loading from '../../Components/Common/Loading';

import FormName from '../../Constants/Form';

const { RegionSubType } = Common.type;

class RegionFormContainer extends React.PureComponent {
  componentDidMount() {
    const { regionId, getRegionById } = this.props;

    if (regionId) getRegionById(regionId);
  }
  componentDidUpdate(prevProps) {
    const { getRegionErrors, history } = this.props;

    if (getRegionErrors) {
      history.push('/error');
    }
  }

  onSubmit(_region) {
    const { createRegion, updateRegion, updateMode } = this.props;
    const fn = updateMode ? updateRegion : createRegion;

    let Metas = [];
    let newImages = [];
    const region = { ..._region };
    if (region.filemeta && region.filemeta[0] && region.filemeta[0].preview) {
      newImages.push(region.filemeta[0]);
      delete region.filemeta;
    } else if (
      // selected a media image
      region.filemeta &&
      region.filemeta[0] &&
      region.filemeta[0].fileMeta &&
      region.filemeta[0].fileMeta._id
    ) {
      region.filemeta.forEach(image => {
        Metas.push(image.fileMeta._id);
      });
      region.filemeta = Metas[0];
    } else if (
      // not changed when update keep original image
      region.filemeta &&
      region.filemeta[0] &&
      region.filemeta[0].fileMeta &&
      typeof region.filemeta[0].fileMeta === 'string'
    ) {
      region.filemeta = region.filemeta[0].fileMeta;
    } else {
      // not select image
      region.filemeta = null;
    }
    if (updateMode) {
      fn(region, newImages);
    } else {
      fn(region, newImages);
    }
  }

  onSubmitSuccess() {
    const { getIndustries, onSubmitSuccess, parent } = this.props;
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      getIndustries({
        query: parent ? { parent } : {},
        refresh: true
      });
    }
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
    const { region, updateMode, parent = null, ancestors } = this.props;
    const {
      COUNTRY,
      ADMINISTRATIVE_AREA_LEVEL_1,
      DISTRICT,
      NEIGHBORHOOD
    } = RegionSubType;
    const subTypesIndex = (ancestors && ancestors.length) || 0;

    const createValue = {
      // workspace: currentUserWorkspace,
      workspace: null,
      parent,
      ancestors: ancestors,
      isActive: false,
      isAddress: false,
      subTypes: [
        [COUNTRY, ADMINISTRATIVE_AREA_LEVEL_1, DISTRICT, NEIGHBORHOOD][
          subTypesIndex > 3 ? 3 : subTypesIndex
        ]
      ],
      idx: 1
    };
    return updateMode
      ? {
          ...region,
          filemeta: region.filemeta ? [{ fileMeta: region.filemeta }] : []
        }
      : createValue;
  };

  render() {
    const key = this.props.region ? this.props.region._id : 'new';
    let isLoading = false; // dummy
    const {
      updateMode,
      intl,
      region,
      form,
      noCardWrapper,
      noTitle,
      workspaces,
      currentUserType,
      svgFileMetas
    } = this.props;
    if (updateMode && !region) {
      isLoading = true;
    }

    const initialValues = this.getInitialValues();

    return isLoading ? (
      <Loading />
    ) : (
      <RegionForm
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
        currentUserType={currentUserType}
        noCardWrapper={noCardWrapper}
        noTitle={noTitle}
        workspaces={workspaces}
        svgFileMetas={svgFileMetas}
      />
    );
  }
}
const mapStateToProps = (state, { regionId }) => {
  const { REGION_CREATE, REGION_UPDATE } = FormName;
  const updateMode = Boolean(regionId);
  const form = updateMode ? REGION_UPDATE : REGION_CREATE;
  const region = getRegionById(state, regionId, { populate: false });

  return {
    form,
    region,
    // workspaces: getWorkspaces(state),
    getRegionErrors: state.error.getRegion,
    updateMode,
    currentUserWorkspace: (AccountSelector.getCurrentUser(state) || {})
      .workspace,
    currentUserType: (AccountSelector.getCurrentUser(state) || {}).userType,
    svgFileMetas: getAllSvgFileMeta(state)
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createRegion: RegionActions.createRegion,
      updateRegion: RegionActions.updateRegion,
      getIndustries: RegionActions.getIndustries,
      getRegionById: RegionActions.getRegionById,
      getAllSvgFileMeta: FileMetaActions.getAllSvgFileMeta
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegionFormContainer)
);
