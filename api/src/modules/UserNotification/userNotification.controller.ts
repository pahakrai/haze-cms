import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Response,
  Query,
  UseFilters,
  HttpStatus,
  Delete,
  Put
} from '@nestjs/common';
// core
import {CurrentUser, HttpExceptionFilter, RequireLogin} from 'src/core';
// modules
import {UserNotificationService} from './userNotification.service';

// import {UserNotificationSocket} from './userNotification.socket';
import {UserNotificationSearchModel} from './models/userNotification.search.model';

@RequireLogin()
@UseFilters(HttpExceptionFilter)
@Controller('user-notifications')
export class UserNotificationController {
  constructor(
    // private readonly userNotificationSocket: UserNotificationSocket
    private readonly userNotificationService: UserNotificationService
  ) {}

  /**
   * find by user id
   * @param req
   * @param res
   * @param query
   */
  @Get()
  public async findMyUserNotifications(
    @CurrentUser() currentUser,
    @Query() query: UserNotificationSearchModel
  ) {
    const {sort} = query;
    const result = await this.userNotificationService.find(
      {
        users: [currentUser._id.toHexString()]
      },
      {sort: sort || '-createdAt'}
    );

    return result;
  }

  @Get('/count')
  public async getUserNotificationCount(
    @Query() query,
    @CurrentUser() currentUser
  ) {
    const result = await this.userNotificationService.getUserNotificationCount(
      currentUser._id.toString(),
      query.read ? query.read === 'true' : false
    );
    return result;
  }

  /**
   * delete one by _id
   * @param req
   * @param res
   * @param param
   */
  @Delete('/:_id')
  public async deleteById(@Response() res, @Param() param) {
    const result = await this.userNotificationService.delete(param._id);
    return res.status(HttpStatus.OK).json(result);
  }

  /**
   * update by _id
   * @param req
   * @param res
   * @param param
   * @query set - status number
   */
  @Put('/:_id/read')
  public async updateStatus(@CurrentUser() currentUser, @Param() param) {
    const result = await this.userNotificationService.updateToRead(
      param._id,
      currentUser._id.toHexString()
    );
    // const users = [currentUser._id.toHexString()];
    // this.userNotificationSocket.updateNotification(null, {
    //   notification: this.userNotificationService.dto(result),
    //   users
    // });
    await this.userNotificationService.getUserNotificationCount(
      currentUser._id.toHexString(),
      false
    );
    // this.userNotificationSocket.unreadCount(null, {count, users});
    return result;
  }

  /**
   * create
   * @param req
   * @param res
   * @param body
   */
  @Post()
  public async create(@Response() res, @Body() body) {
    const result = await this.userNotificationService.create(body);
    return res.status(HttpStatus.OK).json(result);
  }
}
