import React from 'react'
import * as Common from '@golpasal/common'
import EcommCommonType from '@golpasal/common'
import { isMultiLanguageProduct } from '../../../../../Lib/util'

import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
} from '../../../Form/Wrapper'
import CategoryDropdown from '../../../../../Containers/Form/CategoryDropdown'
import ProductTagInput from '../../../../../Containers/Product/ProductTagInput'
import TabEditor from '../../../../Form/TabEditor'
import TextInput from '../../../../Form/TextInput'
import Dropdown from '../../../../Form/Dropdown'
import MultiLanguageTextInput from '../../../../Form/MultiLanguageTextInput'

import ProductWatchButton from '../ProductWatchButton'

const { WorkspaceType } = EcommCommonType.type

export const BaseTab = ({
  intl,
  updateMode,
  productId,
  workspaceType,
  productTypes,
  formValuePlaceOfOrigin
}) => {
  const getProductDesc = (intl, workspaceType) => {
    let localeKey =
      {
        [WorkspaceType.EDUCATION]: 'display_course_description'
      }[workspaceType] || 'display_description'
    return intl.formatMessage({ id: localeKey })
  }

  const getProductContent = (intl, workspaceType) => {
    let localeKey =
      {
        [WorkspaceType.EDUCATION]: 'display_course_content'
      }[workspaceType] || 'display_description'
    return intl.formatMessage({ id: localeKey })
  }

  const statusDropDown = (
    <Dropdown
      label={intl.formatMessage({
        id: 'status'
      })}
      name="status"
      options={Common.helpers
        .getConstants('status', 'ProductStatus', intl.locale)
        .map((status) => ({
          label: status.text,
          value: status.value
        }))}
    />
  )
  const TypesOption = []
  if (productTypes) {
    productTypes.forEach((type) => {
      TypesOption.push({
        label: type.name[intl.locale],
        value: type._id
      })
    })
  }
  const typesDropDown = (
    <Dropdown
      isMulti
      label={intl.formatMessage({
        id: 'display_type'
      })}
      name="types"
      options={TypesOption}
    />
  )

  return (
    <>
      <RowWrapper alignItems="flex-end">
        <LeftColWrapper xs={12} md={6}>
          <MultiLanguageTextInput
            intl={intl}
            isMultiLanguage={isMultiLanguageProduct}
            name="name"
            label={intl.formatMessage({
              id: 'product_name_display'
            })}
          />
        </LeftColWrapper>
        {updateMode ? (
          <LeftColWrapper xs={10} md={5}>
            {statusDropDown}
          </LeftColWrapper>
        ) : (
          <RightColWrapper xs={12} md={6}>
            {statusDropDown}
          </RightColWrapper>
        )}
        {updateMode && (
          <RightColWrapper xs={2} md={1}>
            <ProductWatchButton productId={productId} />
          </RightColWrapper>
        )}
      </RowWrapper>
      <RowWrapper justifyContent="space-between">
        <LeftColWrapper xs={12} md={6}>
          <CategoryDropdown name="_category" multiple={false} />
        </LeftColWrapper>
        <RightColWrapper xs={12} md={6}>
          <ProductTagInput
            label={intl.formatMessage({
              id: 'display_tags'
            })}
            name="tags"
            productId={productId}
          />
        </RightColWrapper>
        <LeftColWrapper xs={12} md={6}>
          {typesDropDown}
        </LeftColWrapper>
        <RightColWrapper xs={12} md={6}>
          <TextInput
            label={intl.formatMessage({
              id: 'display_remarks'
            })}
            rows={3}
            name="remarks"
            intl={intl}
          />
        </RightColWrapper>
        <LeftColWrapper xs={12}>
          <TabEditor
            label={intl.formatMessage({
              id: getProductDesc(intl, workspaceType)
            })}
            name="description"
            intl={intl}
            isMultiLanguage={isMultiLanguageProduct}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12}>
          <TabEditor
            label={intl.formatMessage({
              id: getProductContent(intl, workspaceType)
            })}
            name="content"
            intl={intl}
            isMultiLanguage={isMultiLanguageProduct}
          />
        </RightColWrapper>
      </RowWrapper>
    </>
  )
}
