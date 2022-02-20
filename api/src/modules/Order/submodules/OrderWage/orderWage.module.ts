import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/orderWage.schemas';
import {OrderWageService} from './orderWage.service';
import {OrderWageResolver} from './orderWage.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  providers: [OrderWageService, OrderWageResolver],
  exports: [OrderWageService]
})
export class OrderWageModule {}
