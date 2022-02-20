import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {DeviceController} from './device.controller';
import {DeviceService} from './device.service';
import {DeviceResolver} from './device.resolver';
import {Schema, CollectionName} from './schemas/device.schema';
import {DeviceLocationLogModule} from '../DeviceLocationLog';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    DeviceLocationLogModule
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceResolver],
  exports: [DeviceService]
})
export class DeviceModule {}
