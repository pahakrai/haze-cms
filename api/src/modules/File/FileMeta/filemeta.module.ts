'use strict';

import {Module, Global} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {FilemetaService} from './filemeta.service';
import {FilemetaController} from './filemeta.controller';
import {Schema, CollectionName} from './schemas/filemeta.schema';
import {FileMetaResolver} from './filemeta.resolver';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [FilemetaController],
  providers: [FilemetaService, FileMetaResolver],
  exports: [FilemetaService, FileMetaResolver]
})
export class FileMetaModule {}
