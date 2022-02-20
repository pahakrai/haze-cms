import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/webMenu.schemas';
import {WebMenuController} from './webMenu.controller';
import {WebMenuService} from './webMenu.service';
import {WebMenuResolver} from './webMenu.resolver';
import {ACModule} from '../Ac/ac.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    ACModule
  ],
  controllers: [WebMenuController],
  providers: [WebMenuService, WebMenuResolver],
  exports: [WebMenuService]
})
export class WebMenuModule {}
