import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/couponLog.schemas';
import {CouponLogService} from './couponLog.service';
import {CouponLogResolver} from './couponLog.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  providers: [CouponLogService, CouponLogResolver],
  exports: [CouponLogService]
})
export class CouponLogModule {}
