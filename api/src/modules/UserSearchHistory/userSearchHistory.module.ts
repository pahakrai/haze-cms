import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/userSearchHistory.schemas';
import {UserSearchHistoryController} from './userSearchHistory.controller';
import {UserSearchHistoryService} from './userSearchHistory.service';
import {UserSearchHistoryResolver} from './userSearchHistory.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [UserSearchHistoryController],
  providers: [UserSearchHistoryService, UserSearchHistoryResolver],
  exports: [UserSearchHistoryService]
})
export class UserSearchHistoryModule {}
