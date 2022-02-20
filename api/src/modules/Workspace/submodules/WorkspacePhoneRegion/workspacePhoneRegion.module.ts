import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspacePhoneRegion.schemas';
import {WorkspacePhoneRegionController} from './workspacePhoneRegion.controller';
import {WorkspacePhoneRegionService} from './workspacePhoneRegion.service';
import {WorkspacePhoneRegionResolver} from './workspacePhoneRegion.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [WorkspacePhoneRegionController],
  providers: [WorkspacePhoneRegionService, WorkspacePhoneRegionResolver],
  exports: [WorkspacePhoneRegionService]
})
export class WorkspacePhoneRegionModule {}
