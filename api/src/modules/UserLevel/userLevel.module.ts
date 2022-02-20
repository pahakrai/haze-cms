import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/userLevel.schemas';
import {UserLevelController} from './userLevel.controller';
import {UserLevelService} from './userLevel.service';
import {UserLevelResolver} from './userLevel.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [UserLevelController],
  providers: [UserLevelService, UserLevelResolver],
  exports: [UserLevelService]
})
export class UserLevelModule {}
