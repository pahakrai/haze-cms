import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/service.schemas';
import {ServiceController} from './service.controller';
import {ServiceService} from './service.service';
import {ServiceResolver} from './service.resolver';

import {PricingServiceModule} from '../Pricing/submodules/PricingService/pricingService.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    PricingServiceModule
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceResolver],
  exports: [ServiceService]
})
export class ServiceModule {}
