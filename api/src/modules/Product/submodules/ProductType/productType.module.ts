import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/productType.schemas';
import {ProductTypeController} from './productType.controller';
import {ProductTypeService} from './productType.service';
import {ProductTypeResolver} from './productType.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, ProductTypeResolver],
  exports: [ProductTypeService]
})
export class ProductTypeModule {}
