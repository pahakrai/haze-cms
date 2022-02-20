import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/productReview.schemas';
import {ProductReviewController} from './productReview.controller';
import {ProductReviewService} from './productReview.service';
import {ProductReviewResolver} from './productReview.resolver';
import {ProductModule} from '../../product.module';
import {OrderModule} from 'src/modules/Order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    ProductModule,
    OrderModule
  ],
  controllers: [ProductReviewController],
  providers: [ProductReviewService, ProductReviewResolver],
  exports: [ProductReviewService]
})
export class ProductReviewModule {}
