import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/customerEnquiry.schemas';
import {CustomerEnquiryController} from './customerEnquiry.controller';
import {CustomerEnquiryService} from './customerEnquiry.service';
import {CustomerEnquiryResolver} from './customerEnquiry.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [CustomerEnquiryController],
  providers: [CustomerEnquiryService, CustomerEnquiryResolver],
  exports: [CustomerEnquiryService]
})
export class CustomerEnquiryModule {}
