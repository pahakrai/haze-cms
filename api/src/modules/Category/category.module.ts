import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/category.schemas';
import {CategoryController} from './category.controller';
import {CategoryService} from './category.service';
import {CategoryResolver} from './category.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService]
})
export class CategoryModule {}
