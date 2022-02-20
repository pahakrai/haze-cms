import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/tagImage.schemas';
import {TagImageController} from './tagImage.controller';
import {TagImageService} from './tagImage.service';
import {TagImageResolver} from './tagImage.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [TagImageController],
  providers: [TagImageService, TagImageResolver],
  exports: [TagImageService]
})
export class TagImageModule {}
