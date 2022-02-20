'use strict';
import {REQUEST} from '@nestjs/core';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable, Inject} from '@nestjs/common';

// core
import {BaseCRUDService, LocalizeStringSchema} from 'src/core';
import common from '@golpasal/common';

// models and interfaces
import {INotificationSchedule, INotificationScheduleModel} from './interfaces';
import {
  NotificationScheduleCreateModel,
  NotificationScheduleToModel,
  NotificationScheduleSearchModel
} from './models';

// services
import {BlobService} from '../File/Blob';
import {IUser, UserService} from '../User';
import {AWSSQSService} from '../Aws/aws.sqs.service';
import {DeviceService} from '../Device/device.service';
import {NotificationService} from '../Notification/notification.service';

const {UserType, PushNotificationScheduleToPeople} = common.type;
const {NotificationScheduleStatus, UserStatus} = common.status;

type ToUsersAndDevicesFn = (
  to: NotificationScheduleToModel
) => Promise<{users: IUser[]; devices: string[]}>;

@Injectable()
export class NotificationScheduleService extends BaseCRUDService<INotificationSchedule> {
  private toUsersAndDevicesFns: ToUsersAndDevicesFn[] = [];
  constructor(
    @InjectModel('NotificationSchedules')
    private readonly notificationScheduleRepository: INotificationScheduleModel,
    @Inject(REQUEST) request,
    private readonly blobService: BlobService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly deviceService: DeviceService,
    private readonly sqsService: AWSSQSService
  ) {
    super(notificationScheduleRepository, request);

    // Add custom fetches for the toUsers and toDevices based
    // on `to` fields
    this.addToUsersAndDevicesFn(async to => {
      const usersAndDevices: {users: IUser[]; devices: any[]} = {
        users: [],
        devices: []
      };
      // CUSTOM: based on group names, handle them accordingly
      for (const group of to.groups || []) {
        switch (group) {
          case PushNotificationScheduleToPeople.ALL:
            // add all users
            usersAndDevices.users = [
              ...usersAndDevices.users,
              ...(await this.userService.find({}))
            ];
            // add all devices
            usersAndDevices.devices = [
              ...usersAndDevices.devices,
              ...(await this.deviceService.find({})).map(d => {
                return d._id;
              })
            ];
            break;
          // case PushNotificationScheduleToPeople.MEMBER:
          //   usersAndDevices.users = [
          //     ...usersAndDevices.users,
          //     ...(await this.userService.find({
          //       statuses: [UserStatus.ACTIVE],
          //       isVerified: true,
          //       userTypes: [UserType.MEMBER]
          //     }))
          //   ];
          //   usersAndDevices.devices = [
          //     ...usersAndDevices.devices,
          //     ...(await this.deviceService.find({userExists: false})).map(
          //       d => d._id
          //     )
          //   ];
          //   break;
          case 'default':
            usersAndDevices.devices = [...usersAndDevices.devices];
            usersAndDevices.users = [...usersAndDevices.users];
            break;
        }
      }
      return usersAndDevices;
    });
  }

  public _castQuery(searchModel: NotificationScheduleSearchModel) {
    const {statuses, toGroups, q, _ids, createdAtFr, createdAtTo} = searchModel;

    const query: any = {$and: []};

    if (_ids?.length) {
      query.$and.push({_id: {$in: _ids}});
    }

    if (createdAtFr) {
      query.$and.push({
        createdAt: {$gte: createdAtFr}
      });
    }
    if (createdAtTo) {
      query.$and.push({
        createdAt: {$lte: createdAtTo}
      });
    }

    if (statuses?.length) {
      query.$and.push({status: {$in: statuses}});
    }

    if (toGroups?.length) {
      query.$and.push({
        'to.groups': {
          $in: toGroups
        }
      });
    }

    if (q) {
      query.$and.push({
        $or: [
          {
            'to.groups': new RegExp(q, 'i')
          },
          ...Object.keys(LocalizeStringSchema).reduce<any[]>((arr, locale) => {
            return arr.concat([
              {
                [`notification.title.${locale}`]: new RegExp(q, 'i')
              },
              {
                [`notification.body.${locale}`]: new RegExp(q, 'i')
              }
            ]);
          }, [])
        ]
      });
    }

    if (!query.$and.length) {
      delete query.$and;
    }

    return query;
  }

  /**
   *
   * @param fn adds custom function for fetching toUsers and toDevices
   */
  public addToUsersAndDevicesFn(fn: ToUsersAndDevicesFn) {
    this.toUsersAndDevicesFns.push(fn);
  }

  /**
   *
   * @param NotificationScheduleCreateModel.data required Notification data
   * @param NotificationScheduleCreateModel.to required send who
   * @param NotificationScheduleCreateModel.message required message body
   * @param NotificationScheduleCreateModel.notificationTime optional actionTime
   */
  public async create(
    notificationScheduleCreateModel: NotificationScheduleCreateModel,
    uploadFiles?: Array<any>
  ): Promise<INotificationSchedule> {
    // get current user and workspace
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    // setup any upload files, translating them to schema fileMetas
    if (uploadFiles?.length) {
      // seting image folder
      const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
      notificationScheduleCreateModel.notification.images = [
        ...notificationScheduleCreateModel.notification.images,
        ...(await this.blobService.mapUploadFiles(uploadFiles, folder))
      ];
    }
    // define initial status as pending
    notificationScheduleCreateModel.status = NotificationScheduleStatus.PENDING;
    // add notification to db
    // FIXME: need session, but also waiting for BaseService to support
    //        request
    const notificationSchedule =
      await this.notificationScheduleRepository.create(
        notificationScheduleCreateModel as any
      );

    if (process.env.QUEUE_ENABLE === 'true') {
      const url = `${process.env.HOST_API}${
        process.env.HOST_API_USE_PORT === 'true' ? ':' + process.env.PORT : ''
      }/notification-schedules/put-job`;
      await this.sqsService.sendMessage(
        notificationSchedule.toJSON(),
        {url, method: 'post'},
        10
      );
    } else {
      await this.sendSchedule(notificationSchedule);
    }

    // return notification schedule object
    return notificationSchedule;
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
   * send schedule, either immediately or scheduled
   * @param notificationSchedule notification schedule object
   */
  public async sendSchedule(notificationSchedule: INotificationSchedule) {
    // if no reoccurance defined, just send it right away
    if (
      !notificationSchedule.reoccurance?.everyType ||
      notificationSchedule.reoccurance.everyType === 'never'
    ) {
      await this.sendNotification(notificationSchedule);
      await this.notificationScheduleRepository.findByIdAndUpdate(
        notificationSchedule._id,
        {
          $set: {status: NotificationScheduleStatus.COMPLETE}
        }
      );
    } else {
      // else if reoccurance defined, create a calendarEvent
      // to handle this
      // TODO need calendar to support this as well
    }
  }

  /**
   * send the notification immediately
   * @param notificationSchedule notification schedule object
   */
  public async sendNotification(notificationSchedule: INotificationSchedule) {
    // get all users and devices from schedule's
    // to queries
    const {users, devices} = await this.getUsersAndDevices(
      notificationSchedule.to
    );
    if (users.length > 0) {
      // push notification based on fetched users and devices
      // notificationService requires user object
      await this.notificationService.push({
        ...notificationSchedule.notification,
        toUsers: users.map(u => ({user: u})),
        toDevices: devices
      });
    }
  }

  /**
   * get users and devices by notification schedule `to` field
   * @param notificationSchedule notification schedule object
   */
  public async getUsersAndDevices(
    to: NotificationScheduleToModel
  ): Promise<{users: any[]; devices: string[]}> {
    // FIXME: currently each `to` field is handled individually
    //        ie. scopes will get all devices with that scope, regardless
    //        of other `to` filters

    // initialize return object
    let usersAndDevices = {users: [], devices: []};

    // if to has users, directly inject them into users
    if (to.users?.length) {
      usersAndDevices.users = usersAndDevices.users.concat(to.users);
    }

    // if filters defined, we'll fetch users by the filters query
    if (to.filters && Object.keys(to.filters).length) {
      usersAndDevices.users = usersAndDevices.users.concat(
        await this.userService.find(to.filters)
      );
    }

    // if scopes defined, get all devices with defined scopes
    if (to.scopes?.length) {
      usersAndDevices.devices = usersAndDevices.devices.concat(
        (await this.deviceService.find({scopes: to.scopes})).map(d => d._id)
      );
    }

    // go through each custom to handler to build on-top of this list
    usersAndDevices = await this.toUsersAndDevicesFns.reduce(
      async (userObj, fn) => {
        const _userObj = await userObj;
        const incoming = await fn(to);
        return {
          users: [..._userObj.users, ...incoming.users],
          devices: [..._userObj.devices, ...incoming.devices]
        };
      },
      Promise.resolve(usersAndDevices)
    );

    return {
      // NOTE: FOR REFERENCE ONLY AS new Set only works for string
      // but users here would be user object
      // users: [...new Set(usersAndDevices.users)],
      users: [
        ...new Map(
          usersAndDevices.users.map(user => [user._id.toHexString(), user])
        ).values()
      ],
      devices: [...new Set(usersAndDevices.devices)]
    };
  }

  public async delete(_id: string) {
    const deletedItem = await super.delete(_id);
    // TODO: remove calendar as well to clear its queue
    return deletedItem;
  }
}
