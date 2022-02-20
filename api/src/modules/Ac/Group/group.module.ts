import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {GroupResolver} from './group.resolver';
import {GroupService} from './group.service';
import {PolicyModule} from '../Policy/policy.module';
import {GroupController} from './group.controller';
import {Schema, CollectionName} from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    PolicyModule
  ],
  providers: [GroupService, GroupResolver],
  controllers: [GroupController],
  exports: [GroupService, GroupResolver]
})
export class GroupModule {}
