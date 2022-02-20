import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/productSpec.schemas';
import {ProductSpecController} from './productSpec.controller';
import {ProductSpecService} from './productSpec.service';
import {ProductSpecResolver} from './productSpec.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [ProductSpecController],
  providers: [ProductSpecService, ProductSpecResolver],
  exports: [ProductSpecService]
})
export class ProductSpecModule {}
