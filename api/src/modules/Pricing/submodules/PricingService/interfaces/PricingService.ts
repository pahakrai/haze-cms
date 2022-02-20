import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Pricing} from 'src/modules/Pricing/interfaces';
import {Service} from 'src/modules/Service/interfaces';

export interface PricingService extends Document {
  _id: ObjectId;
  pricing: Pricing | Pricing['_id'];
  service: Service | Service['_id'];
}

export type PricingServiceModel = PaginateModel<PricingService>;
