import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector } from 'redux-form'
import { withRouter } from 'react-router'
import { reset } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import * as Common from '@golpasal/common'

import { toast } from '../../Lib/Toast'
import FormName from '../../Constants/Form'
import Loading from '../../Components/Common/Loading'
import NotificationScheduleForm from '../../Components/App/NotificationSchedule/NotificationScheduleForm'
import { ParamActions } from '../../Redux/Param/actions'
// import { CategoryActions } from '../../Redux/Category/actions';
import { getMobileURINavigationOptions } from '../../Redux/Param/selectors'
import { NotificationScheduleActions } from '../../Redux/NotificationSchedule/actions'
import { UserActions } from '../../Redux/User/actions'
import { getNotificationScheduleById } from '../../Redux/selectors'
// ScreenParameters
import ScreenParameters from './ScreenParameters'
// RegionDropdownTree
import RegionDropdownTree from './QueriesInput/RegionDropdownTree'

const { NotificationScheduleStatus } = Common.default.status
const { PushNotificationMemberScreenType, PushNotificationMerchantScreenType } =
  Common.default.type

class NotificationScheduleFormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  }
  state = {
    groups: ''
  }
  componentDidMount() {
    const { id, fetchNotificationScheduleById, getParamMobileURINavigation } =
      this.props
    // isActive
    if (getParamMobileURINavigation) getParamMobileURINavigation()
    if (id && id !== 'create') fetchNotificationScheduleById(id)
  }
  componentDidUpdate(prevProps) {
    // const { updateMode } = this.props;
    // if (updateMode) {
    //   if (
    //     (preProps.updateMode &&
    //       preProps.updateMode.to &&
    //       preProps.updateMode.to[0] !== updateMode.to[0] &&
    //       updateMode.to) ||
    //     (!preProps.updateMode && updateMode.to)
    //   ) {
    //     this.setState({
    //       keywordForUserId: updateMode.to[0]._id
    //     });
    //   }
    // }
    const { formValueTo } = this.props
    if (formValueTo !== prevProps.formValueTo) {
      this.setState({ groups: formValueTo.groups[0] })
    }
  }

  _onSubmit = (notificationSchedule) => {
    const newImages = []
    const fileMetas = []
    const { createNotificationSchedule, updateNotificationSchedule } =
      this.props
    notificationSchedule.notification.images =
      notificationSchedule.notification.images || []

    notificationSchedule.notification.images.forEach((image) => {
      if (image.fileMeta) {
        // if (typeof image.fileMeta === 'string') {
        //   fileMetas.push(image);
        // } else {
        //   fileMetas.push({ fileMeta: image.fileMeta._id });
        // }
        fileMetas.push(image.fileMeta._id)
        // return image.fileMeta._id ? image.fileMeta._id : image.fileMeta;
      } else {
        newImages.push(image)
      }
    })

    // notificationSchedule.notification.images = notificationSchedule.notification.images.map(
    //   image => {
    //     if (image.fileMeta) {
    //       return image.fileMeta._id ? image.fileMeta._id : image.fileMeta;
    //     } else {
    //       newImages.push(image);
    //       return { fileMeta: { originalName: image.name } };
    //     }
    //   }
    // );
    // notificationTime
    const { notificationTime, ...currentNotificationSchedule } =
      notificationSchedule
    const newNotificationSchedule = {
      ...currentNotificationSchedule,
      ...notificationSchedule.notificationTime
    }
    if (!newNotificationSchedule.type) {
      newNotificationSchedule.type = 'Instant'
    }
    // if (!newNotificationSchedule.notificationMediaType) {
    //   newNotificationSchedule.notificationMediaType = 'Mobile';
    // }
    delete newNotificationSchedule.status
    delete newNotificationSchedule.type
    if (!newNotificationSchedule.notification.data.parameters) {
      newNotificationSchedule.notification.data.parameters = {}
    }
    newNotificationSchedule.notification.images = fileMetas
    newNotificationSchedule.notification.notificationMediaType = 'Mobile'
    delete newNotificationSchedule.notificationMediaType
    if (newNotificationSchedule._id)
      updateNotificationSchedule(newNotificationSchedule, newImages)
    else createNotificationSchedule(newNotificationSchedule, newImages)
  }

  _onSubmitSuccess = () => {
    const {
      updateMode,
      onSubmitSuccess,
      fetchNotificationScheduleById,
      id,
      history
    } = this.props
    toast.success(
      <FormattedMessage
        id={updateMode ? 'updated_successfully' : 'created_successfully'}
      />
    )
    if (updateMode) fetchNotificationScheduleById(id)
    if (!updateMode) history.push('/notification-schedule')
    onSubmitSuccess()
  }
  _getClientDetailsNavigationOptions = () => {
    const { intl } = this.props
    const values = Common.helpers
      .getConstants('type', 'PushNotificationMemberScreenType', intl.locale)
      .map((t) => ({
        label: t.text,
        value: t.value
      }))
      .filter(
        (item) =>
          item.value === PushNotificationMemberScreenType.POST ||
          item.value === PushNotificationMemberScreenType.POST_LIST
      )
    return values
  }
  _getDriverDetailsNavigationOptions = () => {
    const { intl } = this.props
    const values = Common.helpers
      .getConstants('type', 'PushNotificationMerchantScreenType', intl.locale)
      .map((t) => ({
        label: t.text,
        value: t.value
      }))
      .filter(
        (item) =>
          item.value ===
            PushNotificationMerchantScreenType.USER_NOTIFICATION_LIST ||
          item.value === PushNotificationMerchantScreenType.USER_NOTIFICATION
      )
    return values
  }

  _getMobileURINavigationOptions = () => {
    const { intl } = this.props
    const values = Common.helpers
      .getConstants('type', 'AppType', intl.locale)
      .map((t) => ({
        label: t.text,
        value: t.value
      }))
    return values
  }

  _onSubmitFail = () => {
    const { id } = this.props
    toast.error(`${id ? 'Updated' : 'Created'} with Failure`)
  }

  _setGroups = (value) => {
    this.setState({ groups: value })
  }

  render() {
    const key = this.props.user ? this.props.user._id : 'new'
    let isLoading = true

    // let initialValues = {};
    const {
      // loading,
      locale,
      updateMode,
      intl,
      id,
      formfieldTypeValue,
      categories
      // userSearchResults
    } = this.props
    if (id) {
      if (updateMode) isLoading = false
    } else {
      isLoading = false
    }
    const {
      PUSH_NOTIFICATION_SCHEDULE_UPDATE,
      PUSH_NOTIFICATION_SCHEDULE_CREATE
    } = FormName
    const defaultValues = updateMode
      ? updateMode.asMutable
        ? updateMode.asMutable({ deep: true })
        : updateMode
      : null

    const mobileURINavigationOptions = this._getMobileURINavigationOptions()
    const clientOptions = this._getClientDetailsNavigationOptions()
    const driverOptions = this._getDriverDetailsNavigationOptions()
    const canUpdate =
      updateMode &&
      defaultValues.status !== NotificationScheduleStatus.COMPLETE &&
      defaultValues.status !== NotificationScheduleStatus.SENDING
    let newValues = null
    let notificationTimeType = null
    if (defaultValues) {
      newValues = {
        notification: Object.assign({}, defaultValues.notification),
        notificationTime: defaultValues.notificationTime,
        to: defaultValues.to,
        status: defaultValues.status,
        startTime: defaultValues.startTime
      }
      newValues.notificationTime = {
        type: null,
        reoccurance: {},
        startTime: null
      }
      newValues.notificationTime.reoccurance = defaultValues.reoccurance

      newValues.notificationTime.startTime = defaultValues.startTime
      newValues.notificationMediaType =
        defaultValues.notification.notificationMediaType
      // if (
      //   defaultValues.reoccurance.weeklyDays.length > 0 ||
      //   defaultValues.reoccurance.monthlyDate ||
      //   defaultValues.reoccurance.yearlyDate
      // ) {
      //   newValues.notificationTime.type = 'Recurring';
      //   notificationTimeType = 'Recurring';
      // } else {
      //   newValues.notificationTime.type = 'Onetime';
      //   notificationTimeType = 'Onetime';
      // }
      if (defaultValues.reoccurance.everyType === 'never') {
        notificationTimeType = 'immediately'
        newValues.notification.everyType = 0
        newValues.notificationTime.type = 'immediately'
      } else {
        notificationTimeType = 'atSelectedTime'
        newValues.notification.everyType = 1
        newValues.notificationTime.type = 'atSelectedTime'
      }
      newValues.notification.images = newValues.notification.images.map(
        (item) => {
          return { fileMeta: item }
        }
      )
      // this.setState({
      // groups: newValues.to.groups[0]
      // });
    }
    return isLoading ? (
      <Loading fill isLoading={isLoading} />
    ) : (
      <div>
        <NotificationScheduleForm
          canUpdate={canUpdate}
          updateMode={updateMode}
          locale={locale}
          intl={intl}
          _onSearch={this._onSearch}
          _setGroups={this._setGroups}
          setGroups={this.state.groups}
          key={key}
          form={
            updateMode
              ? PUSH_NOTIFICATION_SCHEDULE_UPDATE
              : PUSH_NOTIFICATION_SCHEDULE_CREATE
          }
          initialValues={
            // updateMode
            updateMode
              ? newValues && {
                  ...newValues,
                  type: notificationTimeType
                  // notificationMediaType: 'Mobile'
                }
              : {
                  to: { filters: {}, groups: [], users: [] },
                  notificationTime: {},
                  notificationMediaType: 'Mobile',
                  notification: {
                    title: {},
                    body: {},
                    data: {},
                    images: []
                  },
                  reoccurance: {},
                  type: 'immediately',
                  status: NotificationScheduleStatus.PENDING
                }
          }
          mobileURINavigationOptions={mobileURINavigationOptions}
          clientOptions={clientOptions}
          driverOptions={driverOptions}
          onSubmit={this._onSubmit}
          onSubmitFail={this._onSubmitFail}
          onSubmitSuccess={this._onSubmitSuccess}
          screenParametersOption={ScreenParameters}
          queriesInputProps={{ RegionDropdownTree, categories }}
          notificationMediaType={
            formfieldTypeValue ||
            (defaultValues && defaultValues.notificationMediaType)
          }
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const updateMode = getNotificationScheduleById(state, ownProps.id)
  const formSelector = formValueSelector(
    updateMode
      ? FormName.PUSH_NOTIFICATION_SCHEDULE_UPDATE
      : FormName.PUSH_NOTIFICATION_SCHEDULE_CREATE
  )
  return {
    locale: state.intl.locale,
    updateMode,
    formfieldTypeValue: formSelector(state, 'notificationMediaType'),
    formValueTo: formSelector(state, 'to'),
    mobileURINavigation: getMobileURINavigationOptions(state)
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateNotificationSchedule:
        NotificationScheduleActions.updateNotificationSchedule,
      createNotificationSchedule:
        NotificationScheduleActions.createNotificationSchedule,
      fetchNotificationScheduleById:
        NotificationScheduleActions.getNotificationScheduleById,
      searchUsers: UserActions.searchUsers,
      getParamMobileURINavigation: ParamActions.getParamMobileNavigation,
      reset: reset
    },
    dispatch
  )
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationScheduleFormContainer)
)
