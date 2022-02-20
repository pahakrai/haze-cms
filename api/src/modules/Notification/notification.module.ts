'user strict';

import {Module, HttpModule, Global} from '@nestjs/common';

import {NotificationService} from './notification.service';
import {NotificationController} from './notification.controller';
import {PushNotificationModule} from '../PushNotification/pushNotification.module';
import {UserNotificationModule} from '../UserNotification';
import {WorkspaceModule} from '../Workspace/workspace.module';

@Global()
@Module({
  imports: [
    PushNotificationModule,
    UserNotificationModule,
    WorkspaceModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5
    })
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
