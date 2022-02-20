'use strict';

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PageService} from './page.service';
import {PageResolver} from './page.resolver';
import {PageController} from './page.controller';
import {Schema, CollectionName} from './schemas/page.schema';
import {WorkspaceModule} from 'src/modules/Workspace/workspace.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    WorkspaceModule
  ],
  controllers: [PageController],
  providers: [PageService, PageResolver],
  exports: [PageService]
})
export class PageModule {}
