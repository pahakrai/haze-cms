import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import RegionTreeListComponent from '../../Components/App/Region/RegionTreeList';
import Modal from '../../Components/Modal';

import { RegionActions } from '../../Redux/Region/actions';

import RegionTreeListItemWithExpand from './RegionTreeListItemWithExpand';
import RegionForm from './RegionForm';

class _RegionTreeList extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      modalOpen: false,
      formParams: {}
    };
  }

  fetchRegions(querys) {
    const { fetchRegions } = this.props;

    fetchRegions({
      ...querys,
      populates: []
    });
  }

  _renderItem = region => {
    const {
      intl,
      toggleActiveLoading,
      selectItems,
      withCheckBox,
      onItemCheckboxChange,
      ancestors,
      deleteRegion
    } = this.props;

    return (
      <RegionTreeListItemWithExpand
        key={region._id}
        intl={intl}
        region={region}
        onEditBtnClick={this._onEditBtnClick}
        onItemSwitchToggle={this._onItemSwitchToggle}
        itemSwitchLoading={toggleActiveLoading}
        checkbox={withCheckBox}
        withCheckBox={withCheckBox}
        onItemCheckboxChange={onItemCheckboxChange}
        selectItems={selectItems}
        ancestors={ancestors}
        deleteRegion={deleteRegion}
      />
    );
  };
  handleChangeModalState = otherState => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
      ...otherState
    }));
  };
  _onItemSwitchToggle = (region, value) => {
    const { toggleActive } = this.props;

    toggleActive(region._id, value);
  };
  _onEditBtnClick = region => {
    this.handleChangeModalState({ formParams: { regionId: region._id } });
  };
  _onAddBtnClick = () => {
    const { parent, ancestors } = this.props;
    this.handleChangeModalState({ formParams: { parent, ancestors } });
  };
  _onRegionSubmitSuccess = () => {
    const { fetchRegions, parent } = this.props;
    fetchRegions(parent ? { parent } : {});
    this.handleChangeModalState({ formParams: {} });
  };
  render() {
    const {
      regions = [],
      locale,
      intl,
      gutter,
      withCheckBox,
      onItemCheckboxChange,
      selectItems,
      parent,
      deleteRegion,
      deleteRegionLoading
    } = this.props;
    const isLoading = deleteRegionLoading;
    const { modalOpen, formParams } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <RegionTreeListComponent
          intl={intl}
          locale={locale}
          gutter={gutter}
          parent={parent}
          regions={regions}
          renderItem={this._renderItem}
          onAddBtnClick={this._onAddBtnClick}
          withCheckBox={withCheckBox}
          selectItems={selectItems}
          onItemCheckboxChange={onItemCheckboxChange}
          deleteRegion={deleteRegion}
        />
        <Modal
          isOpen={modalOpen}
          closeTimeoutMS={100}
          contentLabel="Modal"
          ariaHideApp={false}
          appendStyle={{
            width: '90%',
            maxWidth: '80rem'
          }}
        >
          <Modal.Header
            title={intl.formatMessage({ id: 'nav.regions' })}
            onCloseClick={() => this.handleChangeModalState()}
          />
          <RegionForm
            intl={intl}
            noCardWrapper
            noTitle
            onSubmitSuccess={this._onRegionSubmitSuccess}
            {...formParams}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { ancestors = [], parent }) => ({
  locale: state.intl.locale,
  ancestors: parent ? [...ancestors, parent] : [],
  toggleActiveLoading: state.loading.toggleActive,
  deleteRegionLoading: state.loading.deleteRegion
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRegions: RegionActions.getAllRegion,
      deleteRegion: RegionActions.deleteRegion,
      toggleActive: RegionActions.toggleActive
    },
    dispatch
  );
const RegionTreeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RegionTreeList);

export default RegionTreeList;
