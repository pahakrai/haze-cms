import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/phoneRegion.schemas';
import {PhoneRegionController} from './phoneRegion.controller';
import {PhoneRegionService} from './phoneRegion.service';
import {PhoneRegionResolver} from './phoneRegion.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [PhoneRegionController],
  providers: [PhoneRegionService, PhoneRegionResolver],
  exports: [PhoneRegionService]
})
export class PhoneRegionModule {}
