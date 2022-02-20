import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/coupon.schemas';
import {CouponController} from './coupon.controller';
import {CouponService} from './coupon.service';
import {CouponResolver} from './coupon.resolver';
import {CouponLogModule} from './submodules/CouponLog/couponLog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    CouponLogModule
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponResolver],
  exports: [CouponService]
})
export class CouponModule {}
