import React, { useState, useCallback, PureComponent } from 'react'
import { Field } from 'redux-form'
import { injectIntl } from 'react-intl'
import Common from '@golpasal/common'

import UserService from '../../../../Services/APIServices/UserService'

import Modal from '../../../../Components/Modal'
import Button from '../../../../Components/Common/Button'
import { ErrorMessage } from '../../../../Components/Form/Errors'
import FieldContainer from '../../../../Components/Form/FieldContainer'

import ModalContent from './ModalContent'

const DEFAULT_CONTROL = { set: (v) => v._id, get: (v) => v }
export const SelectUserModal = injectIntl(
  ({
    modalTitle,
    children,
    intl,
    query,
    style,
    value: formValue,
    onChange,
    meta: { touched, error } = {},
    control = DEFAULT_CONTROL,
    modal = true,
    disabled,
    placeholder
  }) => {
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    // const [searchKeyWord, setSearchKeyWord] = useState(true);
    const { allData, searchData, searchUser } = useSearhUsers({
      query,
      setLoading
      // setSearchKeyWord
    })
    const onClick = useCallback(() => {
      setModalOpen(true)
    }, [])
    const onModalClose = useCallback(() => {
      setModalOpen(false)
    }, [])
    const onConfirm = useCallback(
      (...args) => {
        onChange(...args)
        setModalOpen(false)
      },
      [onChange]
    )

    const modalContent = (
      <ModalContent
        intl={intl}
        selected={formValue}
        control={control}
        placeholder={placeholder}
        onConfirm={onConfirm}
        loading={loading}
        allData={allData}
        searchData={searchData}
        searchUser={searchUser}
        confirmButton={modal}
        onChange={onChange}
        disabled={disabled}
      />
    )

    return (
      <>
        <SelectUserModalLauncher {...{ modal, modalOpen, searchUser }} />
        <FieldContainer style={style}>
          <div onClick={onClick}>
            {children ? (
              typeof children === 'function' ? (
                children(formValue, { disabled })
              ) : (
                children
              )
            ) : (
              <Button type="button" style={{ minWidth: 'auto' }}>
                {intl.formatMessage({ id: 'display_select_users' })}
              </Button>
            )}
          </div>
          {touched && error && <ErrorMessage>{error}</ErrorMessage>}
        </FieldContainer>
        {modal ? (
          <Modal.Default
            shouldOpenModal={modalOpen}
            title={
              modalTitle || intl.formatMessage({ id: 'display_select_users' })
            }
            onModalClose={onModalClose}
            content={() => modalContent}
          />
        ) : (
          modalContent
        )}
      </>
    )
  }
)
class SelectUserModalLauncher extends PureComponent {
  componentDidMount() {
    const { modalOpen, modal, searchUser } = this.props
    if (!modal || (modal && modalOpen)) {
      searchUser()
    }
  }
  componentDidUpdate(prevProps) {
    const { modalOpen, modal, searchUser } = this.props
    if (modal !== prevProps.modal || modalOpen !== prevProps.modalOpen) {
      if (!modal || (modal && modalOpen)) {
        searchUser()
      }
    }
  }
  render = () => null
}
export const SelectUserModalWithField = ({ input, ...props }) => {
  return (
    <SelectUserModal {...props} value={input.value} onChange={input.onChange} />
  )
}

export const useSearhUsers = ({ query, setLoading, setSearchKeyWord }) => {
  // user data
  const [allData, setAllData] = useState({})
  const [searchData, setSearchData] = useState([])

  const searchUser = useCallback(
    (keyword) => {
      const request = async () => {
        setLoading && setLoading(true)
        const result = await UserService.getUsers({
          q: keyword || undefined,
          statuses: [Common.status.UserStatus.ACTIVE],
          ...(query || {})
        })

        const data = (result && result.data) || []
        setAllData(
          data.reduce(
            (r, value) => ({ ...r, [value && value._id]: value }),
            allData
          )
        )
        setSearchData(data)
        setLoading && setLoading(false)
        setSearchKeyWord && setSearchKeyWord(keyword)
      }

      request()
    },
    [setLoading, query, allData, setSearchKeyWord]
  )

  return { allData, searchData, searchUser }
}

export default (props) => (
  <Field component={SelectUserModalWithField} {...props} />
)
