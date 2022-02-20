import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/quotation.schemas';
import {QuotationController} from './quotation.controller';
import {QuotationService} from './quotation.service';
import {QuotationResolver} from './quotation.resolver';
import {OrderModule} from '../Order/order.module';
import {ACModule} from '../Ac/ac.module';
import {AddressModule} from '../Address/address.module';
import {NotificationModule} from '../Notification/notification.module';
import {UserModule} from '../User/user.module';
import {WorkspaceModule} from '../Workspace/workspace.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    OrderModule,
    ACModule,
    AddressModule,
    NotificationModule,
    UserModule,
    WorkspaceModule
  ],
  controllers: [QuotationController],
  providers: [QuotationService, QuotationResolver],
  exports: [QuotationService]
})
export class QuotationModule {}
