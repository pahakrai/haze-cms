'use strict';

import {Global, Module} from '@nestjs/common';

import {FileMetaModule} from '../FileMeta/filemeta.module';

import {BlobController} from './blob.controller';
import {BlobService} from './blob.service';
import {BlobResolver} from './blob.resolver';
import {FileSystemService} from './fileSystem.service';

@Global()
@Module({
  imports: [FileMetaModule],
  controllers: [BlobController],
  providers: [BlobService, BlobResolver, FileSystemService],
  exports: [BlobService]
})
export class BlobModule {}
