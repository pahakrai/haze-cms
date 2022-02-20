import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspaceType.schemas';
import {WorkspaceTypeController} from './workspaceType.controller';
import {WorkspaceTypeService} from './workspaceType.service';
import {WorkspaceTypeResolver} from './workspaceType.resolver';
import {WorkspaceModule} from '../Workspace/workspace.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    WorkspaceModule
  ],
  controllers: [WorkspaceTypeController],
  providers: [WorkspaceTypeService, WorkspaceTypeResolver],
  exports: [WorkspaceTypeService]
})
export class WorkspaceTypeModule {}
