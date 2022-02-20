import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/auth.schemas';
import {JwtStrategy} from './Passport/strategies';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';

import {
  Schema as UserSchema,
  CollectionName as UserCollectionName,
  UserModule
} from '../User';
import {WorkspaceModule} from '../Workspace/workspace.module';
import {AuthConfigModule} from './submodules/AuthConfig/authConfig.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    MongooseModule.forFeature([{name: UserCollectionName, schema: UserSchema}]),
    UserModule,
    WorkspaceModule,
    AuthConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
