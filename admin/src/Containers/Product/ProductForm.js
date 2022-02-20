import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  change as formValueChange,
  formValueSelector,
  touch as formTouchAction,
  untouch as formUnTouchAction,
  registerField as formRegisterFieldAction
} from 'redux-form'
import { bindActionCreators } from 'redux'
import Common from '@golpasal/common'
import { FormattedMessage } from 'react-intl'

import { toast } from '../../Lib/Toast'
import FormName from '../../Constants/Form'
import ProductForm from '../../Components/App/Product/ProductForm'
import Loading from '../../Components/Common/Loading'

import { ProductActions } from '../../Redux/Product/actions'
import { ProductTypeActions } from '../../Redux/ProductType/actions'
import ResourcesActions from '../../Redux/Resources/actions'
import { getCurrentWorkspace } from '../../Redux/Account/selectors'
import {
  getProductById,
  getCategoryById,
  getAllProductTypes
} from '../../Redux/selectors'

import ProductService from '../../Services/APIServices/ProductService'

import * as ProductFormUtils from './ProductFormUtils'

const { ProductTypeStatus } = Common.status
class ProductFormContainer extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      uploading: false
    }
  }
  componentDidMount() {
    const { productId, getProductById, removeProduct, getAllProductTypes } =
      this.props
    getAllProductTypes({ statuses: [ProductTypeStatus.ACTIVE] })
    removeProduct(productId)
    if (productId) getProductById(productId)
  }

  onSubmit = (_product) => {
    ProductFormUtils.onSubmit(_product, this.props)
  }
  componentDidUpdate(prevProps) {
    ProductFormUtils.componentDidUpdate(prevProps, this.props, this)
  }
  touchAllField = () => {
    const { formTouchAction, form, formValueProductSku } = this.props
    const _values = { sku: formValueProductSku }
    Array.isArray(_values.sku) &&
      _values.sku.forEach((v, i) =>
        formTouchAction(
          form,
          `sku[${i}].amount`,
          `sku[${i}].currency`,
          // `sku[${i}].discountType`,
          `sku[${i}].discountAmount`,
          `sku[${i}].qty`,
          `sku[${i}].idx`,
          `sku[${i}].code`
        )
      )
  }

  unTouchSkuField = () => {
    const { formUnTouchAction, form, formValueProductSku } = this.props
    const _values = { sku: formValueProductSku }
    _values.sku.forEach((v, i) =>
      formUnTouchAction(
        form,
        `sku[${i}].amount`,
        `sku[${i}].currency`,
        // `sku[${i}].discountType`,
        `sku[${i}].discountAmount`,
        `sku[${i}].qty`,
        `sku[${i}].idx`,
        `sku[${i}].code`
      )
    )
  }

  onSubmitSuccess = () => {
    const { history, onSubmitSuccess, updateMode } = this.props
    if (!updateMode) {
      history.push('/products')
    } else {
      this.componentDidMount()
    }
    onSubmitSuccess && onSubmitSuccess()
  }

  onSubmitFail = () => {}
  getInitialValues = () => {
    const { product: _product, updateMode } = this.props
    let product = {}
    const createValue = {
      spec: [],
      sku: [],
      images: [],
      status: Common.status.ProductStatus.DRAFT
    }
    if (_product) {
      product = {
        ..._product,
        images:
          _product && _product.images && _product.images.map
            ? _product.images.map((v) => ({ fileMeta: v }))
            : [],
        _category:
          _product.category && _product.category._id
            ? _product.category._id
            : '',
        mediaList1:
          _product.mediaList1 &&
          _product.mediaList1.map((v) => ({
            ...v,
            image: [{ fileMeta: v.image }]
          })),
        mediaList2:
          _product.mediaList2 &&
          _product.mediaList2.map((v) => ({
            ...v,
            image: [{ fileMeta: v.image }]
          })),
        mediaList3:
          _product.mediaList3 &&
          _product.mediaList3.map((v) => ({
            ...v,
            image: [{ fileMeta: v.image }]
          })),
        placeOfOrigin: _product.placeOfOrigin || null
      }
      delete product.category
      delete product.skus
      delete product.specs
    }

    return updateMode
      ? {
          ...product,
          sku: _product && _product.skus ? [..._product.skus] : null,
          spec: _product && _product.specs ? [..._product.specs] : []
        }
      : createValue
  }

  uploadSpecIcon = (spec, iconFile, activeIconFile) => {
    const { form, formValueChange } = this.props

    let flag = false
    const promiselist = spec.map(
      (v, i) =>
        new Promise(async (resolve, reject) => {
          if (!iconFile[i] && !activeIconFile[i]) {
            resolve(null)
            return
          }
          if (
            activeIconFile[i] === spec[i].activeIcon &&
            iconFile[i] === spec[i].icon
          ) {
            resolve(null)
            return
          }
          flag = true

          const formValue = {
            icon:
              iconFile[i] && iconFile[i].hasOwnProperty('thumbnailUri')
                ? iconFile[i]._id
                : typeof iconFile[i] === 'string'
                ? iconFile[i]
                : null,
            activeIcon:
              activeIconFile[i] &&
              activeIconFile[i].hasOwnProperty('thumbnailUri')
                ? activeIconFile[i]._id
                : typeof activeIconFile[i] === 'string'
                ? activeIconFile[i]
                : null
          }

          let { data } = await ProductService.uploadSpecIcon(
            v._id,
            formValue,
            iconFile[i] && iconFile[i].hasOwnProperty('preview')
              ? [iconFile[i]]
              : [],
            activeIconFile[i] && activeIconFile[i].hasOwnProperty('preview')
              ? [activeIconFile[i]]
              : []
          )

          data.name = v.name

          resolve(data)
        })
    )

    if (flag) {
      toast.warn(<FormattedMessage id={'msg.upload_image_loding'} />, {
        position: 'top-center',
        autoClose: 1000
      })
      this.setState({ uploading: true })
    }

    Promise.all(promiselist)
      .then((result) => {
        const _result = result.map((v, i) => {
          if (!v) {
            return spec[i]
          } else {
            return v
          }
        })
        if (flag) {
          toast.success(<FormattedMessage id={'msg.upload_image_success'} />, {
            position: 'top-center',
            autoClose: 1000
          })
        }
        this.setState({ uploading: false })
        formValueChange(form, 'spec', _result)
      })
      .catch((error) => {
        console.error('upload product spec icon error!')
      })
  }

  render() {
    const key = this.props.product ? this.props.product._id : 'new'
    let isLoading = false // dummy
    const {
      updateMode,
      intl,
      product,
      form,
      formErrors,
      currentWorkspaceType,
      productId,
      productTypes,
      getProductByIdError,
      formValuePlaceOfOrigin
    } = this.props
    if (updateMode && (!product || !product.specs)) {
      isLoading = true
    }
    if (getProductByIdError) {
      return (
        <div>
          <FormattedMessage id="error.data_no_exist" />
        </div>
      )
    }

    const initialValues = this.getInitialValues()
    if (this.state.uploading) return <Loading isLoading={true} />
    return isLoading ? (
      <Loading isLoading={isLoading} />
    ) : (
      <ProductForm
        // form props
        key={key}
        form={form}
        updateMode={updateMode}
        productTypes={productTypes}
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        onSubmitSuccess={this.onSubmitSuccess}
        // other props
        intl={intl}
        formErrors={formErrors}
        touchAllField={this.touchAllField}
        uploadSpecIcon={this.uploadSpecIcon}
        productId={productId}
        workspaceType={currentWorkspaceType}
        formValuePlaceOfOrigin={formValuePlaceOfOrigin}
      />
    )
  }
}
const mapStateToProps = (state, { productId }) => {
  const { PRODUCT_CREATE, PRODUCT_UPDATE } = FormName
  const updateMode = Boolean(productId)
  const form = updateMode ? PRODUCT_UPDATE : PRODUCT_CREATE
  const product = getProductById(state, productId)
  const selector = formValueSelector(form)
  const formCategory = getCategoryById(state, selector(state, '_category'))
  const currentWorkspace = getCurrentWorkspace(state)
  const productTypes = getAllProductTypes(state)
  return {
    form,
    product,
    updateMode,
    productTypes,
    getProductByIdError: state.error.getProductById,
    formValueProductSpec: selector(state, 'spec'),
    formValueProductSku: selector(state, 'sku'),
    formValuePlaceOfOrigin: selector(state, 'placeOfOrigin'),
    formValueCategoryCode:
      formCategory && formCategory.code ? formCategory.code : undefined,
    formAnyTouched: state.form[form] ? state.form[form].anyTouched : false,
    formRegisteredFields: state.form[form]
      ? state.form[form].registeredFields
      : false,
    formErrors: state.form[form] ? state.form[form].syncErrors : false,
    currentWorkspace,
    currentWorkspaceType:
      currentWorkspace && currentWorkspace.type
        ? currentWorkspace.type
        : undefined
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createProduct: ProductActions.createProduct,
      updateProduct: ProductActions.updateProduct,
      getProducts: ProductActions.getProducts,
      getProductById: ProductActions.getProductById,
      getAllProductTypes: ProductTypeActions.getAllProductTypes,
      formValueChange: formValueChange,
      formTouchAction,
      formUnTouchAction,
      formRegisterFieldAction,
      removeProduct: ResourcesActions.removeProduct
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductFormContainer))
