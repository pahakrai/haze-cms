import {Document, Model} from 'mongoose';

export interface IAM extends Document {
  _id: string;
  type: string;
  subType: string;
  description: string;
  credentials: any;
  params: any;
  isActive: boolean;
}

export type IAMModel = Model<IAM>;
