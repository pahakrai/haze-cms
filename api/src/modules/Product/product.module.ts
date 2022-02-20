import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/product.schemas';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {ProductResolver} from './product.resolver';

import {CategoryModule} from '../Category/category.module';
import {DataMappingModule} from '../DataMapping/dataMapping.module';
import {ProductSkuModule} from './submodules/ProductSku/productSku.module';
import {ProductSpecModule} from './submodules/ProductSpec/productSpec.module';
import {TagImageModule} from '../TagImage/tagImage.module';
import {ProductWatchModule} from './submodules/ProductWatch/productWatch.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    CategoryModule,
    DataMappingModule,
    ProductSkuModule,
    ProductSpecModule,
    TagImageModule,
    ProductWatchModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
  exports: [ProductService]
})
export class ProductModule {}
