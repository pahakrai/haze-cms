import React, { useState, useCallback, PureComponent } from 'react'
import { Field } from 'redux-form'
import { useDispatch } from 'react-redux'
import { injectIntl } from 'react-intl'
import Common from '@golpasal/common'
import { normalize } from 'normalizr'

import ProductService from '../../../Services/APIServices/ProductService'

import Modal from '../../../Components/Modal'
import Button from '../../../Components/Common/Button'
import { ErrorMessage } from '../../../Components/Form/Errors'
import ResourceActions from '../../../Redux/Resources/actions'
import FieldContainer from '../../../Components/Form/FieldContainer'
import { entities as Schemas } from '../../../Services/Schemas'

import ModalContent from './ModalContent'

const DEFAULT_CONTROL = { set: (v) => v._id, get: (v) => v }
export const SelectProductModal = injectIntl(
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
    label,
    multiple = false
  }) => {
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    // const [searchKeyWord, setSearchKeyWord] = useState(true);
    const { allData, searchData, searchProduct } = useSearhProducts({
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
      (value) => {
        onChange(multiple ? value : value && value[0])
        setModalOpen(false)
      },
      [onChange, multiple]
    )

    const modalContent = (
      <ModalContent
        intl={intl}
        selected={multiple ? formValue : formValue ? [formValue] : []}
        control={control}
        onConfirm={onConfirm}
        loading={loading}
        allData={allData}
        searchData={searchData}
        searchProduct={searchProduct}
        onChange={onChange}
        disabled={disabled}
        multiple={multiple}
      />
    )

    return (
      <>
        <SelectProductModalLauncher {...{ modal, modalOpen, searchProduct }} />
        <FieldContainer style={style}>
          <div onClick={onClick}>
            {children ? (
              typeof children === 'function' ? (
                children(formValue, {
                  disabled,
                  product: allData && allData[formValue]
                })
              ) : (
                children
              )
            ) : (
              <Button type="button" style={{ minWidth: 'auto' }}>
                {intl.formatMessage({ id: 'display_select' })}
              </Button>
            )}
          </div>
          {touched && error && <ErrorMessage>{error}</ErrorMessage>}
        </FieldContainer>
        {modal ? (
          <Modal.Default
            contentStyle={{ maxWidth: '112rem' }}
            shouldOpenModal={modalOpen}
            title={modalTitle || intl.formatMessage({ id: 'display_select' })}
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
class SelectProductModalLauncher extends PureComponent {
  componentDidMount() {
    const { searchProduct } = this.props
    searchProduct()
  }
  componentDidUpdate(prevProps) {
    const { modalOpen, modal, searchProduct } = this.props
    if (modal !== prevProps.modal || modalOpen !== prevProps.modalOpen) {
      if (!modal || (modal && modalOpen)) {
        searchProduct()
      }
    }
  }
  render = () => null
}
export const SelectProductModalWithField = ({ input, ...props }) => {
  return (
    <SelectProductModal
      {...props}
      value={input.value}
      onChange={input.onChange}
    />
  )
}

export const useSearhProducts = ({ query, setLoading, setSearchKeyWord }) => {
  // product data
  const [allData, setAllData] = useState({})
  const [searchData, setSearchData] = useState([])
  const dispatch = useDispatch()

  const searchProduct = useCallback(
    (keyword) => {
      const request = async () => {
        try {
          setLoading && setLoading(true)
          const result = await ProductService.getProducts({
            q: keyword || undefined,
            statuses: [Common.status.ProductStatus.ACTIVE],
            sort: '-createdAt',
            offset: 0,
            limit: 9999,
            populates: ['specs', 'skus', 'category'],
            paginate: true,
            ...(query || {})
          })

          const data = (result && result.data && result.data.docs) || []
          setAllData(
            data.reduce(
              (r, value) => ({ ...r, [value && value._id]: value }),
              allData
            )
          )
          setSearchData(data)
          setSearchKeyWord && setSearchKeyWord(keyword)

          const { entities } = normalize(data, [Schemas.productSchema])
          dispatch(ResourceActions.addEntities(entities))
        } catch (e) {
        } finally {
          setLoading && setLoading(false)
        }
      }

      request()
    },
    [setLoading, query, allData, setSearchKeyWord, dispatch]
  )

  return { allData, searchData, searchProduct }
}

export default (props) => (
  <Field component={SelectProductModalWithField} {...props} />
)
