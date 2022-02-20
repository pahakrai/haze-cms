import {Global, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/tag.schemas';
import {TagController} from './tag.controller';
import {TagService} from './tag.service';
import {TagResolver} from './tag.resolver';
import {TagImageModule} from '../TagImage/tagImage.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    TagImageModule
  ],
  controllers: [TagController],
  providers: [TagService, TagResolver],
  exports: [TagService]
})
export class TagModule {}
