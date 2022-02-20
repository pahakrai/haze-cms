import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/pricing.schemas';
import {PricingController} from './pricing.controller';
import {PricingService} from './pricing.service';
import {PricingResolver} from './pricing.resolver';

import {PricingServiceModule} from './submodules/PricingService/pricingService.module';
import {PricingAdjustmentModule} from './submodules/PricingAdjustment/pricingAdjustment.module';
import {ProductSkuModule} from '../Product/submodules/ProductSku/productSku.module';
import {CouponModule} from '../Coupon/coupon.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    PricingServiceModule,
    ProductSkuModule,
    PricingAdjustmentModule,
    CouponModule
  ],
  controllers: [PricingController],
  providers: [PricingService, PricingResolver],
  exports: [PricingService]
})
export class PricingModule {}
