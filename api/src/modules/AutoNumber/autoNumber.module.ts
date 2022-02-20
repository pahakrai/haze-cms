import {Global, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/autoNumber.schemas';
import {AutoNumberService} from './autoNumber.service';
import {AutoNumberTemplateModule} from '../AutoNumberTemplate/autoNumberTemplate.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    AutoNumberTemplateModule
  ],
  providers: [AutoNumberService],
  exports: [AutoNumberService]
})
export class AutoNumberModule {}
