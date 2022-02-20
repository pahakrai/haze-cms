import {Module, HttpModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/user.schemas';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {ACModule} from '../Ac/ac.module';
import {AuthConfigModule} from '../Auth/submodules/AuthConfig';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    ACModule,
    HttpModule,
    AuthConfigModule
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
