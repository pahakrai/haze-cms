import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/productWatch.schemas';
import {ProductWatchController} from './productWatch.controller';
import {ProductWatchService} from './productWatch.service';
import {ProductWatchResolver} from './productWatch.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [ProductWatchController],
  providers: [ProductWatchService, ProductWatchResolver],
  exports: [ProductWatchService]
})
export class ProductWatchModule {}
