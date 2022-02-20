import {Document, PaginateModel} from 'mongoose';

export interface IFollower extends Document {
  _id: string;
  followee: string;
  follower: string;
  unfollowAt: any;
}
export type IFollowerModel = PaginateModel<IFollower>;
