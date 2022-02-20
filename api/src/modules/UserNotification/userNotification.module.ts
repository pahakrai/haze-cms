'user strict';

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UserNotificationService} from './userNotification.service';
import {UserNotificationController} from './userNotification.controller';
import {Schema, CollectionName} from './schemas/userNotification.schemas';
import {UserNotificationResolver} from './userNotification.resolver';

import {DeviceModule} from '../Device/device.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    DeviceModule
  ],
  controllers: [UserNotificationController],
  providers: [UserNotificationService, UserNotificationResolver],
  exports: [UserNotificationService, UserNotificationResolver]
})
export class UserNotificationModule {}
