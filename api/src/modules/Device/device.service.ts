import {Injectable, Inject, NotFoundException, Scope} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import common from '@golpasal/common';
import {ObjectId} from 'mongodb';
import {BaseCRUDService} from 'src/core/layers';

import {DeviceLocationLogService} from '../DeviceLocationLog/deviceLocationLog.service';

import {IUser} from '../User';
import {Device, DeviceModel} from './interfaces/device.interface';
import {DeviceSearchModel, DeviceCreateModel} from './models';

const {DeviceStatus} = common.status;

@Injectable({scope: Scope.REQUEST})
export class DeviceService extends BaseCRUDService<
  Device,
  DeviceCreateModel,
  {},
  DeviceSearchModel
> {
  constructor(
    @InjectModel('Devices')
    private readonly deviceRepository: DeviceModel,
    @Inject(REQUEST) request,
    private readonly deviceLocationLogService: DeviceLocationLogService
  ) {
    super(deviceRepository, request);
  }

  public _castQuery(searchModel: DeviceSearchModel) {
    const {
      users,
      userExists,
      q,
      lastOnTimeFr,
      lastOnTimeTo,
      createdAtFr,
      createdAtTo,
      token,
      deviceTypes,
      deviceStatus,
      online,
      _ids,
      scopes
    } = searchModel;
    const query = {$and: []};

    const user = this.getCurrentUser<IUser>();

    // handle workspace
    let workspace: string;
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    if (workspace) {
      query.$and.push({workspace: workspace ? workspace : null});
    }

    if (scopes?.length) {
      query.$and.push({scope: {$in: scopes}});
    }

    if (userExists !== undefined) {
      query.$and.push(userExists ? {user: {$ne: null}} : {user: null});
    }

    if (_ids) {
      query.$and.push({_id: {$in: _ids}});
    }

    if (users) {
      query.$and.push({user: {$in: users}});
    }
    if (q) {
      query.$and.push({
        $or: [
          {
            deviceName: new RegExp(q, 'i')
          },
          {
            deviceType: new RegExp(q, 'i')
          },
          {
            pushNotificationToken: new RegExp(q, 'i')
          }
        ]
      });
    }

    if (lastOnTimeFr) {
      query.$and.push({
        lastOnTime: {$gte: lastOnTimeFr}
      });
    }
    if (lastOnTimeTo) {
      query.$and.push({
        lastOnTime: {$lte: lastOnTimeTo}
      });
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

    if (token) {
      query.$and.push({
        token: new RegExp(token, 'i')
      });
    }

    if (deviceTypes) {
      query.$and.push({deviceType: {$in: deviceTypes}});
    }
    if (deviceStatus) {
      query.$and.push({deviceStatus: {$in: deviceStatus}});
    }

    if (typeof online === 'boolean') {
      query.$and.push({online});
    }

    if (!query.$and.length) {
      delete query.$and;
    }
    return query;
  }

  async registerDevice(
    registerDeviceModel: DeviceCreateModel
  ): Promise<Device> {
    const locale = this.getLocale();
    registerDeviceModel.workspace = this.getHeaderWorkspace();

    const device = await this.deviceRepository
      .findOneAndUpdate(
        {
          _id: registerDeviceModel._id
        },
        {
          lastOnTime: new Date(),
          ...(locale
            ? {locale: locale.getLanguage() || locale.getDefaultLanguage()}
            : {}),
          ...registerDeviceModel
        } as any,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      )
      .exec();
    return device;
  }

  async updateDeviceLocation(
    deviceId: string,
    coordinates: number[],
    heading?: number
  ) {
    const updatedDevice = await this.deviceRepository
      .findByIdAndUpdate(
        deviceId,
        {
          location: {
            type: 'Point',
            coordinates,
            lastUpdate: new Date(),
            heading
          }
        },
        {
          new: true
        }
      )
      .exec();

    if (!updatedDevice) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_device'}
      });
    }

    await this.deviceLocationLogService.create({
      device: deviceId,
      coordinates
    });

    return updatedDevice;
  }

  async updateDeviceStatus(id: string | ObjectId, deviceStatus: number) {
    const updatedDevice = await this.update(id, {deviceStatus}, {lean: true});
    return updatedDevice;
  }

  async isBlackListDevice(id: string | ObjectId) {
    const device = await this.findById(id);
    // if didn't find device by id, will be black list device
    if (device) {
      const status = device.deviceStatus;
      return status === DeviceStatus.BLACK_LIST || false;
    } else {
      return true;
    }
  }

  /**
   * find device that near to the given coordinate
   *
   * @param coordinates [lng, lat] array that indicate coordinate
   */
  public async findNearbyDevice(
    coordinates: number[],
    radius = 5000
  ): Promise<Device[]> {
    const user = this.getCurrentUser<IUser>();
    return this.deviceRepository
      .aggregate([
        // use $geoNear to find nearby device
        {
          $geoNear: {
            maxDistance: radius,
            distanceField: 'distance',
            near: {type: 'Point', coordinates}
          }
        }
      ])
      .match({
        // only logined
        user: {$ne: null},
        workspace: user.currentWorkspace,
        deviceStatus: DeviceStatus.WHITE_LIST
      })
      .exec();
  }
}
