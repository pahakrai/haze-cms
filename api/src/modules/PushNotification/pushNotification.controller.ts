import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Response,
  Query,
  Request,
  HttpStatus,
  Delete,
  Put,
  UseFilters
} from '@nestjs/common';

import {HttpExceptionFilter, RequireLogin} from 'src/core';
// models
import {
  PushNotificationCreateModel,
  PushNotificationDelateModel,
  PushNotificationSearchModel,
  PushNotificationsSearchModel
} from './models';
import {PushNotificationService} from './pushNotification.service';

@RequireLogin()
@UseFilters(HttpExceptionFilter)
@Controller('pushNotifications')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService
  ) {}

  @Post('put-job')
  public async doJobAfterPushNotification(@Body() pushNotification) {
    // 1. call expo getReceipts api
    // 2. based on response
    //    2.1. if change status required:
    //      - update db
    //      - call hooks
    //    2.2. if pending, create new
    //         job to call this api again
    const result = await this.pushNotificationService.doJobAfterPushNotification(
      pushNotification
    );
    return result;
  }

  @Post()
  public async create(
    @Request() req,
    @Body() createNotificationModel: PushNotificationCreateModel
  ) {
    const currentUser = req.user;
    if (!createNotificationModel.sender) {
      createNotificationModel.sender = currentUser._id;
    }
    const message = await this.pushNotificationService.create(
      createNotificationModel
    );
    return message;
  }

  @Delete()
  public async delete(
    @Request() req,
    @Query() deleteNotificationModel: PushNotificationDelateModel
  ) {
    const currentUser = req.user;
    if (!deleteNotificationModel.userId) {
      deleteNotificationModel.userId = currentUser._id;
    }
    const message = await this.pushNotificationService.delete(
      deleteNotificationModel
    );
    return message;
  }

  @Put('/:_id')
  public async update(
    @Request() req,
    @Response() res,
    @Body() body,
    @Param() param
  ) {
    const result = await this.pushNotificationService.update(
      param._id,
      body,
      req
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  public async find(
    @Request() req,
    @Query() findNotificationModel: PushNotificationSearchModel
  ) {
    const currentUser = req.user;
    if (!findNotificationModel.userId) {
      findNotificationModel.userId = currentUser._id;
    }
    const message = await this.pushNotificationService.find(
      findNotificationModel
    );
    return message;
  }

  @Get('/list')
  public async findAll(
    @Request() req,
    @Query() findNotificationsModel: PushNotificationsSearchModel
  ) {
    const currentUser = req.user;
    if (!findNotificationsModel._ids) {
      findNotificationsModel.userIds = [
        ...findNotificationsModel.userIds,
        currentUser._id.toString()
      ];
    }
    const messages = await this.pushNotificationService.findAll(
      findNotificationsModel
    );
    return messages;
  }

  @Post('/test-mobile-push-notification')
  public async testMobilePushNotification(
    @Body() createNotificationModel: any
  ) {
    return this.pushNotificationService.testMobilePushNotification(
      createNotificationModel
    );
  }
}
