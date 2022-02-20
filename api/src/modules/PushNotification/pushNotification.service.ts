import {
  // Inject,
  Request,
  Injectable,
  // forwardRef,
  HttpService
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

// core
import {AWSSQSService} from '../Aws/aws.sqs.service';
import {MongodbHelper, BadRequestException} from 'src/core';
import {BaseService} from 'src/core/layers';
import NodeRSA from 'node-rsa';
import {AxiosRequestConfig} from 'axios';

import {chunkArray} from '../../core/utils';

import {
  IPushNotificationService,
  IPushNotification,
  IPushNotificationModel
} from './interfaces';
import {ExpoNotificationBuilder} from './utils/ExpoNotification.builder';
import {ExpoNotificationService} from './services/expo.notification.service';
import {DeviceService} from '../Device/device.service';

import {
  PushNotificationCreateModel,
  PushNotificationDelateModel,
  PushNotificationSearchModel,
  PushNotificationsSearchModel,
  PushNotificationUpdateModel
} from './models';
// import {PushNotification} from './interfaces/PushNotification.interface';
import {IUser, IUserModel} from '../User/interfaces';

@Injectable()
export class PushNotificationService
  extends BaseService<IPushNotification>
  implements IPushNotificationService {
  constructor(
    @InjectModel('PushNotifications')
    private readonly pushNotificationRepository: IPushNotificationModel,
    private readonly expoNotificationService: ExpoNotificationService,
    @InjectModel('Users') private readonly userRepository: IUserModel,
    private readonly deviceService: DeviceService,
    private readonly sqsService: AWSSQSService,
    private readonly httpService: HttpService
  ) {
    super(pushNotificationRepository);
  }

  // /**
  //  *
  //  * @param createPushNotificationModel.sender required who send
  //  *    pushNotification
  //  * @param createPushNotificationModel.to required send who
  //  * @param createPushNotificationModel.message required message body
  //  * @param createPushNotificationModel.data optional data
  //  */
  // public async create(
  //   pushNotificationCreateModel: PushNotificationCreateModel
  // ): Promise<PushNotification> {
  //   const pushNotification: any = {...pushNotificationCreateModel};

  //   // get send notification results
  //   let sendResults: any = {};
  //   sendResults = await this.sendNotification(pushNotificationCreateModel, 10);
  //   pushNotification.status = sendResults;

  //   // update pushNotification.to when some send notifications has error
  //   pushNotification.to = sendResults.map(sendResult => ({
  //     user: sendResult.notification.userId,
  //     ticket: sendResult.id,
  //     status: sendResult.status,
  //     deviceId: sendResult.notification.deviceId
  //   }));

  //   // create notification
  //   const createNotification = await this.pushNotificationRepository.create(
  //     pushNotification
  //   );

  //   // check receipts
  //   if (process.env.QUEUE_ENABLE === 'true') {
  //     const url = `${process.env.HOST_API}${
  //       process.env.HOST_API_USE_PORT === 'true' ? ':' + process.env.PORT : ''
  //     }/pushNotifications/put-job`;
  //     this.putJob(
  //       {
  //         ...createNotification.toJSON(),
  //         hooks: pushNotificationCreateModel.hooks
  //       },
  //       url,
  //       10
  //     );
  //   }

  //   return createNotification;
  // }

  public async create(
    pushNotificationCreateModel: PushNotificationCreateModel
  ) {
    let config: AxiosRequestConfig;
    const CHUNK_SIZE = 1000;

    if (process.env.PUSH_NOTIFICATION_CRYPTO_KEY) {
      const key = new NodeRSA(process.env.PUSH_NOTIFICATION_CRYPTO_KEY);

      config = {
        headers: {
          Authorization: key.encrypt(
            process.env.PUSH_NOTIFICATION_SECRET,
            'base64'
          )
        }
      };
    }

    let toUsersModel: PushNotificationCreateModel;
    let toDevicesModel: PushNotificationCreateModel;
    let models: PushNotificationCreateModel[] = [];

    // split model that contains both device and user to 2 separate model
    if (
      pushNotificationCreateModel.toUsers?.length > 0 &&
      pushNotificationCreateModel.toDevices?.length > 0
    ) {
      toUsersModel = {...pushNotificationCreateModel, toDevices: []};
      toDevicesModel = {...pushNotificationCreateModel, toUsers: []};
    } else if (pushNotificationCreateModel.toUsers?.length > 0) {
      toUsersModel = pushNotificationCreateModel;
    } else {
      toDevicesModel = pushNotificationCreateModel;
    }

    if (toUsersModel?.toUsers.length > CHUNK_SIZE) {
      // chunk model
      const chunkedToUsers = chunkArray(toUsersModel.toUsers, CHUNK_SIZE);

      models = models.concat(
        chunkedToUsers.map<PushNotificationCreateModel>(toUsers => ({
          ...toUsersModel,
          toUsers
        }))
      );
    } else if (toUsersModel) {
      // no need to chunk
      models.push(toUsersModel);
    }

    if (toDevicesModel?.toDevices.length > CHUNK_SIZE) {
      // chunk model
      const chunkedToDevices = chunkArray(toDevicesModel.toDevices, CHUNK_SIZE);

      models = models.concat(
        chunkedToDevices.map<PushNotificationCreateModel>(toDevices => ({
          ...toDevicesModel,
          toDevices
        }))
      );
    } else if (toDevicesModel) {
      // no need to chunk
      models.push(toDevicesModel);
    }

    // send chunked notifications
    for (const m of models) {
      this.httpService
        .post(
          `${process.env.PUSH_NOTIFICATION_API_URL}/push-notifications`,
          m,
          config
        )
        .toPromise();
    }

    return null;
  }

  /**
   * send pushNotifications
   * @param sender user id
   * @param to array of recevie message user id
   * @param message notification message obj
   * @param reteryCount when error, re send notification number of times
   */
  public async sendNotification(
    pushNotificationCreateModel: PushNotificationCreateModel,
    retryCount = 0
  ): Promise<any> {
    let devices = [];
    // if var toUsers, toDevices both have value, then send
    const {toUsers, toDevices, message} = pushNotificationCreateModel;

    if (toUsers?.length) {
      let users = await this.userRepository
        .find({_id: {$in: toUsers}})
        .lean()
        .exec();
      users = users.filter(o => o.preferences.receiveNotification);
      devices = devices.concat(
        await this.deviceService._populate(
          await this.deviceService.find({
            users: users.map(o => o._id.toString())
          }),
          ['user']
        )
      );
    }
    if (toDevices?.length) {
      devices = devices.concat(
        await this.deviceService.find({_ids: toDevices})
      );
    }
    // Remove duplocate device
    // Filter user.perference.recevieNotification = false 's userDevice
    devices = devices.reduce((arr, device) => {
      if (
        arr.every(a => a._id !== device._id) &&
        (!device.user || device.user?.preferences?.receiveNotification)
      ) {
        // not added yet, so add now
        arr.push(device);
      }
      return arr;
    }, []);

    // device.user may beundefined
    const tokenAndUserIds = (devices || [])
      .map(device => ({
        token: device.pushNotificationToken,
        scope: device.scope,
        deviceId: device._id,
        userId: device.user?._id || device.user,
        language:
          device.locale ||
          device.user?.preferences?.language ||
          process.env.LANGUAGE_DEFAULT ||
          device.language
      }))
      .filter(tokenAndUserId => tokenAndUserId.token);
    // if no tokens have been found
    if (!tokenAndUserIds.length) {
      // just return empty object
      return [];
    }
    const pushNotificationBuilder = new ExpoNotificationBuilder();
    // before we send message we should process message.data
    const sendMessages = pushNotificationBuilder
      .setBody(message.body)
      .setTitle(message.title)
      .setData({
        title: message.title,
        body: message.body,
        ...message.data
      })
      .setTokenAndUserIds(tokenAndUserIds)
      .build();
    let sendResults: any = [];
    try {
      sendResults = await this.expoNotificationService.sendNotifications(
        sendMessages,
        retryCount
      );
    } catch (error) {
      throw new BadRequestException({code: 'err_send_notification'});
    }
    return sendResults;
  }

  /**
   * delete pushNotifications by userId
   * @param userId user id
   */
  public async delete(
    pushNotificationDelateModel: PushNotificationDelateModel
  ): Promise<void> {
    await this.pushNotificationRepository.deleteOne({
      _id: pushNotificationDelateModel._id
    });
  }

  /**
   * put job todo something when pushed notification
   * @param notification Notification obj
   */
  public async putJob(data: any, url: string, delay: number): Promise<void> {
    // add job to queue
    await this.sqsService.sendMessage(
      // process.env.QUEUE_NAME,
      data,
      {url, method: 'post'},
      delay
    );
  }

  /**
   * create or update a pushNotification
   * @param userId req.user._id
   * @param model PushNotificationUpdateModel model
   * @param req request
   */
  public async update(
    _id: string,
    pushNotificationUpdateModel: PushNotificationUpdateModel,
    @Request() req
  ): Promise<IPushNotification> {
    return this.pushNotificationRepository
      .findByIdAndUpdate(_id, pushNotificationUpdateModel as any, {new: true})
      .exec();
  }

  public async find(pushNotificationSearchModel: PushNotificationSearchModel) {
    return this.pushNotificationRepository
      .findById(pushNotificationSearchModel._id)
      .exec();
  }
  public async findAll(
    pushNotificationsSearchModel: PushNotificationsSearchModel
  ) {
    const query = this._castQuery(pushNotificationsSearchModel);
    return this.pushNotificationRepository.find(query);
  }

  public _castQuery(pushNotificationsSearchModel) {
    const {
      userIds,
      deviceIds,
      createdAt,
      sort,
      screen
    } = pushNotificationsSearchModel;
    const query: any = {
      $and: []
    };
    if (userIds) {
      query.$and.push({'to.user': {$in: userIds}});
    }
    if (deviceIds) {
      query.$and.push({'to.deviceId': {$in: deviceIds}});
    }
    if (screen) {
      query.$and.push({'message.data.screen': screen});
    }
    if (createdAt) {
      const startTime = createdAt.split(',')[0];
      const endTime = createdAt.split(',')[1];
      const timeQuery = MongodbHelper.formatDateQueryRange(startTime, endTime);
      if (timeQuery) {
        query.$and.push({createdAt: timeQuery});
      }
    }
    // sort by fileds
    if (sort) {
      let sortName = sort;
      let sortDir;
      if (sort !== undefined) {
        if (/^(-).*$/.test(sort)) {
          sortName = sort.replace(/^(-)/, '');
        }
        sortDir = /^-.*$/.test(sort) ? -1 : 1;
        query.$sort = {[sortName]: sortDir};
      }
    }
    if (query.$and.length === 0) {
      delete query.$and;
    }
    return query;
  }

  public async doJobAfterPushNotification(pushNotification: any) {
    if (!pushNotification.status) {
      return null;
    }
    const receiptIds = [];
    for (const ticket of pushNotification.status) {
      // NOTE: Not all tickets have IDs; for example,
      // tickets for notifications that could not be
      // enqueued will have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }
    let receipts: any = {};
    const needResendUser = [];
    const needResendDevice = [];
    const needUpdateRecevied = [];
    try {
      receipts = await this.expoNotificationService.getPushNotificationReceipts(
        receiptIds,
        10
      );
      pushNotification.to.forEach(u => {
        if (u.status !== 'ok' && receipts[u.ticket]) {
          u.status = receipts[u.ticket].status;
        }
        if (receipts[u.ticket]) {
          if (receipts[u.ticket].status === 'ok' && u.user) {
            needUpdateRecevied.push(u.user);
          }
          if (
            receipts[u.ticket].status === 'error' &&
            receipts[u.ticket].details.error === 'MessageRateExceeded'
          ) {
            u.user
              ? needResendUser.push(u.user)
              : needResendDevice.push(u.deviceId);
          }
        }
      });
    } catch (error) {
      throw new BadRequestException({code: 'err_send_notification'});
    }
    // put job for call hooks when has hooks
    if (
      pushNotification.hooks &&
      pushNotification.hooks.length &&
      needUpdateRecevied.length
    ) {
      await this.putJob({needUpdateRecevied}, pushNotification.hooks[0], 0);
    }

    // resend notification for some need resend user
    if (needResendUser.length || needResendDevice.length) {
      await this.resendNotification(
        needResendUser,
        needResendDevice,
        pushNotification,
        pushNotification.retryCount
      );
    }

    // update pushNotification.to
    // const updatedNotification =
    await this.pushNotificationRepository.findByIdAndUpdate(
      pushNotification._id,
      {to: pushNotification.to},
      {new: true}
    );
    return receipts;
  }

  public async resendNotification(
    resendUsers: Array<any>,
    resendDevices: Array<any>,
    pushNotification,
    retryCount = 1
  ) {
    const resendPushNotification = {
      ...pushNotification,
      toDevices: resendDevices,
      toUsers: resendUsers
    };
    const resendResults = await this.sendNotification(
      resendPushNotification,
      10
    );

    pushNotification.to = resendResults.map(resendResult => ({
      user: resendResult.notification.userId,
      ticket: resendResult.id,
      status: resendResult.status,
      deviceId: resendResult.notification.deviceId
    }));

    let delay = 10;
    if (retryCount >= 20) {
      delay = 1800;
    } else if (retryCount >= 15) {
      delay = 600;
    } else if (retryCount >= 10) {
      delay = 300;
    } else if (retryCount >= 8) {
      delay = 180;
    } else if (retryCount >= 5) {
      delay = 60;
    }

    const url = `${process.env.HOST_API}${
      process.env.HOST_API_USE_PORT === 'true' ? ':' + process.env.APP_PORT : ''
    }/pushNotifications/put-job`;
    this.putJob(
      {
        ...pushNotification.toJSON(),
        retryCount: retryCount + 1,
        hooks: pushNotification.hooks
      },
      url,
      delay
    );

    // const updatedNotification =
    await this.pushNotificationRepository.findByIdAndUpdate(
      pushNotification._id,
      {to: pushNotification.to},
      {new: true}
    );
  }

  public async testMobilePushNotification(
    testPushNotificationModel: any
  ): Promise<any> {
    const {expoToken, message} = testPushNotificationModel;
    const device = await this.deviceService.findOne({token: expoToken});
    let tokenAndUserId: any = {
      token: expoToken,
      language: process.env.LANGUAGE_DEFAULT
    };
    if (device) {
      tokenAndUserId = {
        ...tokenAndUserId,
        deviceId: device._id,
        userId: device.user,
        language:
          device.locale ||
          (device?.user as IUser)?.preferences?.language ||
          process.env.LANGUAGE_DEFAULT
      };
    }
    const pushNotificationBuilder = new ExpoNotificationBuilder();
    // before we send message we should process message.data
    const sendMessages = pushNotificationBuilder
      .setBody(message.body)
      .setTitle(message.title)
      .setData({
        title: message.title,
        body: message.body,
        ...message.data
      })
      .setTokenAndUserIds([tokenAndUserId])
      .build();
    let sendResults: any = {};
    try {
      sendResults = await this.expoNotificationService.sendNotifications(
        sendMessages,
        5
      );
    } catch (error) {
      throw new BadRequestException({code: 'err_send_notification'});
    }
    return sendResults;
  }
}
