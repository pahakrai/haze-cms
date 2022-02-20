import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/productSku.schemas';
import {ProductSkuController} from './productSku.controller';
import {ProductSkuService} from './productSku.service';
import {ProductSkuResolver} from './productSku.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [ProductSkuController],
  providers: [ProductSkuService, ProductSkuResolver],
  exports: [ProductSkuService]
})
export class ProductSkuModule {}
