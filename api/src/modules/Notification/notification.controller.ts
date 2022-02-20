import {Body, Controller, Post, UseFilters} from '@nestjs/common';

import {HttpExceptionFilter, RequireLogin} from 'src/core';
// models
import {NotificationCreateModel} from './models/notification.create.model';
import {NotificationService} from './notification.service';
import {NotificationCreateOptionsModel} from './models/notification.createOptions.model';

@RequireLogin()
@UseFilters(HttpExceptionFilter)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  public async create(
    @Body()
    createNotificationModel: {
      notification: NotificationCreateModel;
      options: NotificationCreateOptionsModel;
    }
  ) {
    const message = await this.notificationService.push(
      createNotificationModel.notification,
      createNotificationModel.options
    );
    return message;
  }
}
