import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/salesVolume.schemas';
import {SalesVolumeController} from './salesVolume.controller';
import {SalesVolumeService} from './salesVolume.service';
import {SalesVolumeResolver} from './salesVolume.resolver';
import {OrderModule} from '../Order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    OrderModule
  ],
  controllers: [SalesVolumeController],
  providers: [SalesVolumeService, SalesVolumeResolver],
  exports: [SalesVolumeService]
})
export class SalesVolumeModule {}
