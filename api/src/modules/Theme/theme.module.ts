import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/theme.schemas';
import {ThemeController} from './theme.controller';
import {ThemeService} from './theme.service';
import {ThemeResolver} from './theme.resolver';
import {UserModule} from '../User';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    UserModule
  ],
  controllers: [ThemeController],
  providers: [ThemeService, ThemeResolver],
  exports: [ThemeService]
})
export class ThemeModule {}
