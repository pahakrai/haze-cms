import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/order.schemas';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {OrderResolver} from './order.resolver';
import {OrderChargeResolver} from './orderCharge.resolver';

import {DataMappingModule} from '../DataMapping/dataMapping.module';
import {ProductModule} from '../Product/product.module';
import {PaymentModule} from '../Payment/payment.module';
import {OrderProductModule} from './submodules/OrderProduct/orderProduct.module';

import {OrderWageModule} from './submodules/OrderWage/orderWage.module';
import {OrderTimeModule} from './submodules/OrderTime/orderTime.module';
import {OrderLogModule} from './submodules/OrderLog/orderLog.module';

import {ProductSkuModule} from '../Product/submodules/ProductSku/productSku.module';
import {NotificationModule} from '../Notification/notification.module';

import {AddressModule} from '../Address/address.module';

import {UserCreditModule} from '../UserCredit/userCredit.module';
import {DeviceModule} from '../Device/device.module';
import {ACModule} from '../Ac/ac.module';

import {UserModule} from '../User/user.module';

import {ServiceModule} from '../Service/service.module';
import {PricingModule} from '../Pricing/pricing.module';

// import {InvoiceModule} from '../Invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    ACModule,
    forwardRef(() => DeviceModule),
    AddressModule,
    ProductModule,
    ProductSkuModule,
    PricingModule,
    forwardRef(() => PaymentModule),
    NotificationModule,
    OrderProductModule,
    OrderWageModule,
    OrderTimeModule,
    OrderLogModule,
    OrderWageModule,
    UserCreditModule,
    UserModule,
    forwardRef(() => DataMappingModule),
    ServiceModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver, OrderChargeResolver],
  exports: [OrderService]
})
export class OrderModule {}
