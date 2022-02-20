import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/pricingService.schemas';
import {PricingServiceService} from './pricingService.service';
import {PricingServiceResolver} from './pricingService.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  providers: [PricingServiceService, PricingServiceResolver],
  exports: [PricingServiceService]
})
export class PricingServiceModule {}
