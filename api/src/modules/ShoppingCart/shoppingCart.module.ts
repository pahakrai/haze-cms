import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/shoppingCart.schemas';
import {ShoppingCartController} from './shoppingCart.controller';
import {ShoppingCartService} from './shoppingCart.service';
import {ShoppingCartResolver} from './shoppingCart.resolver';
import {ProductModule} from '../Product/product.module';
import {ProductSkuModule} from '../Product/submodules/ProductSku/productSku.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    ProductSkuModule,
    ProductModule
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, ShoppingCartResolver],
  exports: [ShoppingCartService]
})
export class ShoppingCartModule {}
