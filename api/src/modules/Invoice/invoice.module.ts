import {Module} from '@nestjs/common';

import {InvoiceController} from './invoice.controller';
import {InvoiceService} from './invoice.service';
import {OrderModule} from '../Order/order.module';
import {PaymentModule} from '../Payment/payment.module';
// eslint-disable-next-line
import {WorkspaceModule} from '../Workspace/workspace.module';
import {PaymentMethodModule} from '../PaymentMethod/paymentMethod.module';
import {PageModule} from '../Page/Page/page.module';
import {ThemeModule} from '../Theme/theme.module';

@Module({
  imports: [
    PaymentModule,
    WorkspaceModule,
    PaymentMethodModule,
    PageModule,
    ThemeModule,
    OrderModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService]
})
export class InvoiceModule {}
