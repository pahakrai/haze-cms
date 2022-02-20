import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/currency.schemas';
import {CurrencyController} from './currency.controller';
import {CurrencyService} from './currency.service';
import {CurrencyResolver} from './currency.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyResolver],
  exports: [CurrencyService]
})
export class CurrencyModule {}
