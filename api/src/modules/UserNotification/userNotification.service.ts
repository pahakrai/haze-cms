import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

// core
import {
  pubSub,
  BadRequestException,
  MongooseOption,
  LocalizeStringSchema
} from 'src/core';

import {BaseCRUDService} from 'src/core/layers';

// service
// modules
import {
  UserNotificationCreateModel,
  UserNotificationSearchModel,
  UserNotificationUpdateModel
} from './models';
// interface
import {IUserNotification, IUserNotificationModel} from './interfaces';
import {DeviceService} from '../Device/device.service';
import {AnyRecord} from 'dns';

@Injectable()
export class UserNotificationService extends BaseCRUDService<
  IUserNotification,
  UserNotificationCreateModel,
  UserNotificationUpdateModel,
  UserNotificationSearchModel
> {
  constructor(
    @InjectModel('UserNotifications')
    private readonly userNotificationRepository: IUserNotificationModel,
    private readonly deviceService: DeviceService
  ) {
    super(userNotificationRepository);
  }

  // TODO: can't delete this yet, because socket doesn't handle localizing
  // and resolving properties. Any fix for socket?
  dto = (
    model,
    opts: {
      localize: boolean;
      lang: string;
      userId?: string;
    } = {localize: false, lang: '', userId: ''}
  ): IUserNotification => {
    const newModel = {...(model.toObject ? model.toObject() : model)};
    // if localize, set _display version of
    // localized fields, and remove original field
    if (opts.localize && opts.lang) {
      newModel.message_display = model.message
        ? model.message[opts.lang]
        : null;
      delete newModel.message;
    }
    if (opts.localize && opts.lang) {
      newModel.title_display = model.title ? model.title[opts.lang] : null;
      delete newModel.title;
    }
    // set field read, and remove users because we
    // don't want users to receive whole user array
    if (opts.userId) {
      newModel.read = model.users.some(
        u => u.user._id.toString() === opts.userId.toString() && u.read
      );
      delete newModel.users;
    }

    return newModel;
  };

  _castQuery(search: UserNotificationSearchModel) {
    const queryAnd = [];
    const {q, users, _ids} = search;

    if (q) {
      queryAnd.push({
        $or: Object.keys(LocalizeStringSchema).map(loc => ({
          [`message.${loc}`]: new RegExp(q, 'i')
        }))
      });
    }

    if (users?.length) {
      queryAnd.push({users: {$elemMatch: {user: {$in: users}}}});
    }

    if (_ids?.length) {
      queryAnd.push({_id: {$in: _ids}});
    }
    return queryAnd.length ? {$and: queryAnd} : {};
  }

  /**
   * create a user notification
   * @param model user notification model
   * @param req request
   */
  public async create(
    userNotificationCreateModel: UserNotificationCreateModel,
    options?: MongooseOption
  ): Promise<any> {
    let users = userNotificationCreateModel.users || [];
    // if has toDevices, also check if those equate to users
    if (userNotificationCreateModel.devices?.length) {
      const devices = await this.deviceService.find({
        _ids: userNotificationCreateModel.devices
      });
      users = users.concat(
        devices.filter(d => d.user).map(d => ({user: d.user.toString()}))
      );
    }
    if (!users?.length) {
      throw new BadRequestException({code: 'err_no_users'});
    }
    // await this._validateCrud(model, req.locale.t);
    const userNotificationCreated = await super.create(
      {
        ...userNotificationCreateModel,
        // filter unique user ids before creating
        users: Object.values(
          users.reduce((obj, u) => {
            if (typeof u.user === 'string') {
              obj[u.user] = u;
            } else {
              obj[u.user._id.toHexString()] = {
                ...u,
                user: u.user._id.toHexString()
              };
            }
            return obj;
          }, [])
        )
      },
      options
    );

    pubSub.publish('userNotificationCreated', {
      userNotificationCreated
    });

    return userNotificationCreated;
  }

  /**
   * update notification to read
   * @param _id notification id
   * @param model notification model
   * @param req request
   */
  public async updateToRead(_id: string, userId: string): Promise<any> {
    const result = await this.updateRead(_id, userId, true);
    const unreadCount = await this.getUserNotificationCount(userId, false);
    pubSub.publish('userNotificationUnreadCount', {
      unreadCount,
      userId
    });
    return result;
  }

  /**
   * update notification to unread
   * @param _id notification id
   * @param model notification model
   * @param req request
   */
  public async updateToUnread(_id: string, userId: string): Promise<any> {
    const userNotification = await this.updateRead(_id, userId, false);
    const unreadCount = await this.getUserNotificationCount(userId, false);
    pubSub.publish('userNotificationUnreadCount', {
      unreadCount,
      userId
    });
    return userNotification;
  }

  /**
   * update read or unread
   * @param _id notification id
   * @param model notification model
   * @param req request
   */
  public async updateRead(
    userNotification: IUserNotification | string,
    userId: string,
    read: boolean
  ): Promise<any> {
    // get existing userNotification
    let _userNotification: any =
      typeof userNotification === 'string'
        ? await this.findById(userNotification)
        : userNotification;
    // if user notification does not exist, throw
    // error
    if (!_userNotification) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_user_notification'}
      });
    }

    if (_userNotification.toObject) {
      _userNotification = _userNotification.toObject();
    }

    // extract _id so it doesn't update _id
    const {_id: thisId, ...updatedModel} = _userNotification;
    // if notification doesn't have users array, add now
    if (!updatedModel.users) {
      updatedModel.users = [];
    }
    // find the index with this user
    const userIndex = updatedModel.users.findIndex(
      user => user.user.toHexString() === userId
    );
    // if index not found
    if (userIndex === -1) {
      // FIXME: should we add one? how come notification
      //       doesn't have this user?
      // add a new one
      updatedModel.users.push({user: userId, read});
    } else {
      // if user index found, update the read of that index
      updatedModel.users[userIndex].read = read;
    }
    // update the db and return newly updated user notification
    return this.update(thisId, updatedModel);
  }

  /**
   *
   * @param userId userid
   * @param read default is false: get user unread count
   */
  public async getUserNotificationCount(userId, read: boolean) {
    const conditions = {
      $and: []
    } as any;
    conditions.$and.push({users: {$elemMatch: {user: userId, read}}});

    return this.userNotificationRepository.countDocuments(conditions);
  }
}
