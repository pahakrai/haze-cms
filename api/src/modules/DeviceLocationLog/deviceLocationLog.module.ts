import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/deviceLocationLog.schemas';
import {DeviceLocationLogController} from './deviceLocationLog.controller';
import {DeviceLocationLogService} from './deviceLocationLog.service';
import {DeviceLocationLogResolver} from './deviceLocationLog.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [DeviceLocationLogController],
  providers: [DeviceLocationLogService, DeviceLocationLogResolver],
  exports: [DeviceLocationLogService]
})
export class DeviceLocationLogModule {}
