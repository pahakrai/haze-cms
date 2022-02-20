import React, { useState, useCallback, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import Common from '@golpasal/common'
import { toast } from '../../../../../Lib/Toast'
import { FormattedMessage } from 'react-intl'
import UserService from '../../../../../Services/APIServices/UserService'
import OrderService from '../../../../../Services/APIServices/OrderService'
import Modal from '../../../../../Components/Modal'
import Button from '../../../../Common/Button'

import ModalContent from './ModalContent'

const DEFAULT_CONTROL = { set: (v) => v._id, get: (v) => v }
export const SelectUserModal = injectIntl(
  ({
    modalTitle,
    children,
    intl,
    query,
    style,
    formValue,
    onChange,
    meta: { touched, error } = {},
    control = DEFAULT_CONTROL,
    modal = true,
    disabled,
    placeholder,
    selected,
    isOrderIds,
    updateMode
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
      if (selected?.length > 0) {
        setModalOpen(true)
      } else {
        toast.error(<FormattedMessage id="msg.select_least_one" />)
      }
    }, [selected])
    const onModalClose = useCallback(() => {
      setModalOpen(false)
    }, [])
    const onConfirm = useCallback(
      async (...args) => {
        const users = args[0].map((v) => v?.user)
        const peopelnCharges = users[0] ? users : args[0]
        const { data } = await OrderService.updatePeopleInCharge(isOrderIds, {
          orderIds: selected,
          poepleInCharge: peopelnCharges
        })
        if (isOrderIds ? data?.length > 0 : data?._id) {
          updateMode && window.location.reload()
          toast.success(<FormattedMessage id="updated_successfully" />)
        } else {
          toast.error(<FormattedMessage id="updated_failure" />)
        }
        setModalOpen(false)
      },
      [selected, isOrderIds, updateMode]
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
        <div>
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
        </div>
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
export const SelectUserModalWithField = ({ ...props }) => {
  return <SelectUserModal {...props} />
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

export default SelectUserModalWithField
