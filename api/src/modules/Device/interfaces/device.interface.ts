import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {IUser} from 'src/modules/User';

export interface Device extends Document {
  readonly _id: string;
  readonly user: IUser['_id'] | IUser;
  readonly workspace: ObjectId;
  readonly pushNotificationToken: string;
  readonly deviceType: string;
  readonly deviceName: string;
  readonly lastOnTime: Date;
  readonly online: boolean;
  readonly locale: string;
  readonly scope: string;
  readonly location: {
    type: string;
    coordinates: Array<number>;
    lastUpdate: Date;
    heading?: number;
  };
  readonly deviceStatus: number;
}
export type DeviceModel = PaginateModel<Device>;
