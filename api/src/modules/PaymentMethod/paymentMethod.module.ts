import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/paymentMethod.schemas';
import {PaymentMethodController} from './paymentMethod.controller';
import {PaymentMethodService} from './paymentMethod.service';
import {PaymentMethodResolver} from './paymentMethod.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodResolver],
  exports: [PaymentMethodService]
})
export class PaymentMethodModule {}
