import {Module} from '@nestjs/common';

import {EnquiryController} from './enquiry.controller';
import {EnquiryService} from './enquiry.service';
import {EnquiryResolver} from './enquiry.resolver';
import {NotificationModule} from '../Notification/notification.module';
import {ACModule} from '../Ac/ac.module';
import {UserModule} from '../User';

@Module({
  imports: [NotificationModule, ACModule, UserModule],
  controllers: [EnquiryController],
  providers: [EnquiryService, EnquiryResolver],
  exports: [EnquiryService]
})
export class EnquiryModule {}
