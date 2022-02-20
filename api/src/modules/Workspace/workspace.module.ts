import {Module, Global} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspace.schemas';
import {WorkspaceController} from './workspace.controller';
import {WorkspaceService} from './workspace.service';
import {WorkspaceResolver} from './workspace.resolver';
import {WorkspaceSettingResolver} from './workspaceSetting.resolver';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceResolver, WorkspaceSettingResolver],
  exports: [WorkspaceService]
})
export class WorkspaceModule {}
