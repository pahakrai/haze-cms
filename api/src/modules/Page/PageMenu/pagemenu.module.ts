'use strict';

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {PageMenuService} from './pagemenu.service';
import {PageMenuController} from './pagemenu.controller';
import {Schema, CollectionName} from './schemas/pagemenu.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [PageMenuController],
  providers: [PageMenuService],
  exports: [PageMenuService]
})
export class PageMenuModule {}
