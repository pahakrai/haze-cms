import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';

import {Pricing} from 'src/modules/Pricing/interfaces';
import {Service} from 'src/modules/Service/interfaces';

export interface PricingAdjustment extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * prining data for this adjustment
   */
  pricing: Pricing | Pricing['_id'];

  /**
   * Model name of ref
   */
  refType: string;

  /**
   * related items, can be service, region..etc
   * currently only support service
   */
  ref: Service | Service['_id'];

  /**
   * type of this adjustment
   */
  type: string;

  /**
   * min value to apply this adjustment (inclusive)
   */
  min: number;

  /**
   * max value to apply this adjustment (inclusive)
   */
  max: number;

  /**
   * optional remark
   */
  remark: string;
}

export type PricingAdjustmentModel = PaginateModel<PricingAdjustment>;
