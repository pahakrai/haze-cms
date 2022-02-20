import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/region.schemas';
import {RegionController} from './region.controller';
import {RegionService} from './region.service';
import {RegionResolver} from './region.resolver';
import {BlobModule} from '../File/Blob/blob.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    BlobModule
  ],
  controllers: [RegionController],
  providers: [RegionService, RegionResolver],
  exports: [RegionService]
})
export class RegionModule {}
