import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/language.schemas';
import {LanguageController} from './language.controller';
import {LanguageService} from './language.service';
import {LanguageResolver} from './language.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [LanguageController],
  providers: [LanguageService, LanguageResolver],
  exports: [LanguageService]
})
export class LanguageModule {}
