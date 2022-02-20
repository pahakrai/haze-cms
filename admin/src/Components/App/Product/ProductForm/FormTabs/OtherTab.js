import React from 'react'
import * as Common from '@golpasal/common'
import EcommCommonType from '@golpasal/common'

import {
  RowWrapper,
  LeftColWrapper,
  RightColWrapper
} from '../../../Form/Wrapper'

import Dropdown from '../../../../Form/Dropdown'
import DatePicker from '../../../../Form/DatePicker'

import PlaceOfRegion from './PlaceOfRegion'

const { WorkspaceType } = EcommCommonType.type

export const OtherTab = ({
  intl,
  updateMode,
  productId,
  workspaceType,
  formValuePlaceOfOrigin
}) => {
  return (
    <>
      <RowWrapper justifyContent="space-between">
        <LeftColWrapper xs={12} md={6}>
          <Dropdown
            isMulti
            label={intl.formatMessage({
              id: 'display_platform_types'
            })}
            name="platformTypes"
            options={Common.helpers
              .getConstants('type', 'PlatformType', intl.locale)
              .map((status) => ({
                label: status.text,
                value: status.value
              }))}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12} md={6}>
          <PlaceOfRegion
            intl={intl}
            name="placeOfOrigin"
            workspaceType={workspaceType}
            formValuePlaceOfOrigin={formValuePlaceOfOrigin}
          />
        </RightColWrapper>
        <LeftColWrapper xs={12} md={6}>
          <DatePicker
            name="productionDate"
            label={intl.formatMessage({
              id:
                workspaceType === WorkspaceType.EDUCATION
                  ? 'display_start_date'
                  : 'display_production_date'
            })}
          />
        </LeftColWrapper>
        <RightColWrapper xs={12} md={6}>
          <DatePicker
            name="productExpiryDate"
            label={intl.formatMessage({
              id:
                workspaceType === WorkspaceType.EDUCATION
                  ? 'display_complete_date'
                  : 'display_product_expiryDate'
            })}
          />
        </RightColWrapper>
      </RowWrapper>
    </>
  )
}
