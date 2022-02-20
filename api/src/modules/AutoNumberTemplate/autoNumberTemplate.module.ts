import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/autoNumberTemplate.schemas';
import {AutoNumberTemplateService} from './autoNumberTemplate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  providers: [AutoNumberTemplateService],
  exports: [AutoNumberTemplateService]
})
export class AutoNumberTemplateModule {}
