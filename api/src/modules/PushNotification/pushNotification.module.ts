'user strict';

import {Module, HttpModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {PushNotificationService} from './pushNotification.service';
import {ExpoNotificationService} from './services/expo.notification.service';

import {PushNotificationController} from './pushNotification.controller';
import {Schema, CollectionName} from './schemas/pushNotification.schema';
import {DeviceModule} from '../Device/device.module';
import {
  Schema as UserSchema,
  CollectionName as UserCollectionName
} from '../User/schemas/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName,
        schema: Schema
      }
    ]),
    MongooseModule.forFeature([{name: UserCollectionName, schema: UserSchema}]),
    DeviceModule,
    HttpModule.register({
      timeout: 5000,
      responseType: 'json'
    })
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService, ExpoNotificationService],
  exports: [PushNotificationService]
})
export class PushNotificationModule {}
