import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspaceApp.schemas';
import {WorkspaceAppController} from './workspaceApp.controller';
import {WorkspaceAppService} from './workspaceApp.service';
import {WorkspaceAppResolver} from './workspaceApp.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [WorkspaceAppController],
  providers: [WorkspaceAppService, WorkspaceAppResolver],
  exports: [WorkspaceAppService]
})
export class WorkspaceAppModule {}
