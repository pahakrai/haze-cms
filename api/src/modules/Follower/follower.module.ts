'use strict';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FollowerService} from './follower.service';
import {AuthModule} from '../Auth/auth.module';
import {FollowerController} from './follower.controller';
import {Schema, CollectionName} from './schemas/follower.schema';
import {
  Schema as UserSchema,
  CollectionName as UserCollectionName
} from '../User/schemas/user.schemas';
import {NotificationModule} from '../Notification/notification.module';
import {FollowerResolver} from './follower.resolver';
import {UserModule} from '../User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    MongooseModule.forFeature([{name: UserCollectionName, schema: UserSchema}]),
    NotificationModule,
    UserModule,
    AuthModule
  ],
  controllers: [FollowerController],
  providers: [FollowerService, FollowerResolver],
  exports: [FollowerService]
})
export class FollowerModule {}
