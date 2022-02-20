import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/address.schemas';
import {AddressController} from './address.controller';
import {AddressService} from './address.service';
import {AddressResolver} from './address.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressResolver],
  exports: [AddressService]
})
export class AddressModule {}
