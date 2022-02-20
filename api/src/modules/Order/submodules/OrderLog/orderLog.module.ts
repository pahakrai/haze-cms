import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/orderLog.schemas';

import {OrderLogService} from './orderLog.service';
import {OrderLogResolver} from './orderLog.resolver';

import {OrderLogController} from './orderLog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [OrderLogController],
  providers: [OrderLogService, OrderLogResolver],
  exports: [OrderLogService]
})
export class OrderLogModule {}
