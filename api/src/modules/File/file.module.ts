import {Module, Global} from '@nestjs/common';
import {FileMetaModule} from './FileMeta';
import {BlobModule} from './Blob';

@Global()
@Module({
  imports: [FileMetaModule, BlobModule],
  exports: [FileMetaModule, BlobModule]
})
export class FileModule {}
