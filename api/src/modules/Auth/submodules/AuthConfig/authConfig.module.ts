import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/authConfig.schemas';
import {AuthConfigController} from './authConfig.controller';
import {AuthConfigService} from './authConfig.service';
import {AuthConfigResolver} from './authConfig.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [AuthConfigController],
  providers: [AuthConfigService, AuthConfigResolver],
  exports: [AuthConfigService]
})
export class AuthConfigModule {}
