import cloneDeep from 'lodash/cloneDeep'
import { validate } from '../../Components/App/User/UserForm'
import { validate as PreferenceFormValidate } from '../../Components/App/Preference/PreferenceForm'

import FormName from '../../Constants/Form'

export const onSubmit = (
  {
    activeKey,
    createUser,
    updateUserProfile,
    fromValues,
    preferenceFormValues,
    touchFormAction,
    requirementFields,
    currentWorkspace
  },
  { setState }
) => {
  const { USER_UPDATE, PREFERENCE_UPDATE } = FormName
  const user = { ...(fromValues || {}) }
  let member = {}
  if (!user._id) {
    createUser(user)
    return
  }

  const _preference = {
    ...(preferenceFormValues || {})
  }
  let preference = cloneDeep(_preference)
  // form value validate flow
  const fromValueKeys = Object.keys(user)
  const preferenceFromValueKeys = Object.keys(preference)

  const formHasError =
    Object.keys(validate(user, { requirementFields })).length > 0
  const preferenceFormHasError = preferenceFormValues
    ? Object.keys(PreferenceFormValidate(preference, { currentWorkspace }))
        .length > 0
    : false

  touchFormAction(
    USER_UPDATE,
    ...fromValueKeys,
    'preferences.language',
    'memberFields.meta.handledBy',
    'phone',
    'email'
  )
  touchFormAction(
    PREFERENCE_UPDATE,
    ...preferenceFromValueKeys,
    'wage.max',
    'wage.min',
    'wage.unit',
    'wage.currency'
  )

  // tab switch flow
  if (formHasError || preferenceFormHasError) {
    let newActiveKey = activeKey
    if (formHasError) {
      newActiveKey = '1'
    } else if (preferenceFormHasError) {
      newActiveKey = '2'
    }
    activeKey !== newActiveKey && setState({ activeKey: newActiveKey })
    return
  }

  // form value format flow
  // update userFiles flow
  // let userFiles = null;
  // let userAvatars = null;
  // user.avatars.forEach(image => {
  //   if (image.fileMeta) {
  //     // file meta stuff
  //     const img = {
  //       fileMetaId: image.fileMeta._id ? image.fileMeta._id : image.fileMeta
  //     };
  //     userAvatars ? userAvatars.push(img) : (userAvatars = [img]);
  //   } else {
  //     // upload file
  //     userFiles ? userFiles.push(image) : (userFiles = [image]);
  //   }
  // });
  // if (userAvatars) {
  //   user.avatars = userAvatars;
  // }

  if (Object.keys(preference).length) {
    preference.locations = [preference.locations.properties.district]
  }

  member = {
    ...member,
    ...(user.memberFields || {}),
    preferences: { ...(preference || {}) }
  }
  delete user.memberFields
  delete user.avatars

  updateUserProfile({
    user,
    member
  })
}
