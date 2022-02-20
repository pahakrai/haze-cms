import {Document, PaginateModel} from 'mongoose';
import {Device} from '../../Device/interfaces/device.interface';

export interface DeviceLocationLog extends Document {
  readonly device: Device['_id'] | Device;
  readonly type: string;
  readonly coordinates: number[];
}

export type DeviceLocationLogModel = PaginateModel<DeviceLocationLog>;
