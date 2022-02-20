'user strict';

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {NotificationScheduleService} from './notificationSchedule.service';
import {NotificationScheduleController} from './notificationSchedule.controller';
import {Schema, CollectionName} from './schemas/notificationSchedule.schemas';
import {DeviceModule} from '../Device/device.module';
import {NotificationModule} from '../Notification/notification.module';
import {BlobModule} from '../File/Blob';
import {UserModule} from '../User';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName,
        schema: Schema
      }
    ]),
    NotificationModule,
    DeviceModule,
    BlobModule,
    UserModule
  ],
  controllers: [NotificationScheduleController],
  providers: [NotificationScheduleService],
  exports: [NotificationScheduleService]
})
export class NotificationScheduleModule {}
