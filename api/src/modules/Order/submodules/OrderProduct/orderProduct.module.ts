import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/orderProduct.schemas';
import {OrderProductService} from './orderProduct.service';
import {OrderProductResolver} from './orderProduct.resolver';
import {ProductSkuModule} from 'src/modules/Product/submodules/ProductSku/productSku.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    ProductSkuModule
  ],
  providers: [OrderProductService, OrderProductResolver],
  exports: [OrderProductService]
})
export class OrderProductModule {}
