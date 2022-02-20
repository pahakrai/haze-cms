import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspacePriceType.schemas';
import {WorkspacePriceTypeController} from './workspacePriceType.controller';
import {WorkspacePriceTypeService} from './workspacePriceType.service';
import {WorkspacePriceTypeResolver} from './workspacePriceType.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [WorkspacePriceTypeController],
  providers: [WorkspacePriceTypeService, WorkspacePriceTypeResolver],
  exports: [WorkspacePriceTypeService]
})
export class WorkspacePriceTypeModule {}
