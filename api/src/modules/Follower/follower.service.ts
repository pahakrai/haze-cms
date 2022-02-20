// npm
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ObjectId} from 'mongodb';

// core
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// models & interfaces
import {IFollower, IFollowerModel} from './interfaces';
import {
  FollowerSearchModel,
  FollowerCreateModel,
  FollowerUpdateModel
} from './models';
import {IUserModel} from '../User/interfaces/IUser';
import {PaginateOptionsQueryModel} from '../../core/database/paginate';

@Injectable()
export class FollowerService extends BaseCRUDService<
  IFollower,
  FollowerCreateModel,
  FollowerUpdateModel,
  FollowerSearchModel
> {
  constructor(
    @InjectModel('Followers')
    private readonly followerRepository: IFollowerModel,
    @InjectModel('Users') private readonly userRepository: IUserModel
  ) {
    super(followerRepository);
  }

  public async isFollowing(
    follower: string,
    followee: string
  ): Promise<boolean> {
    return (
      (await this.findOne({
        follower,
        followee,
        unfollowAt: null
      })) !== null
    );
  }

  /**
   * 关注一個人
   */
  public async follow(createModel: FollowerCreateModel): Promise<any | null> {
    const result = await this.repository.findOne(createModel);
    let follower = null;
    if (result) {
      follower = await this.repository.findOneAndUpdate(
        createModel,
        {unfollowAt: null},
        {upsert: true}
      );
    } else {
      follower = await this.create(createModel);
    }
    const relation = await this.getRelationships(createModel.follower, [
      follower.followee
    ]);
    return relation;
  }

  /**
   * 关注你的人，相当于微博中的“粉丝”。
   */
  public async getFollowers(
    userId: string,
    paginateOptions: PaginateOptionsQueryModel = {}
  ): Promise<any> {
    return this.followerRepository.paginate(
      {followee: userId, unfollowAt: null},
      paginateOptions
    );
  }

  public async getRelationships(
    userId: string,
    otherUsers: Array<string>
  ): Promise<Array<any>> {
    const oid_user = userId;
    const oid_otherUsers = otherUsers.map(u => new ObjectId(u));
    const results = await this.userRepository.aggregate([
      {
        // fetch all otherUsers we want to check user's relationship with
        $match: {
          _id: {$in: oid_otherUsers}
        }
      },
      {
        // fetch all condition where user is following this other user
        $lookup: {
          from: 'Followers',
          let: {userId: '$_id'},
          pipeline: [
            {
              $match: {
                follower: oid_user,
                unfollowAt: null,
                $expr: {
                  $eq: ['$$userId', '$followee']
                }
              }
            },
            {
              $project: {
                _id: 1
              }
            }
          ],
          as: 'imFollowing'
        }
      },
      {
        // fetch all condition where user is followed by this other user
        $lookup: {
          from: 'Followers',
          let: {userId: '$_id'},
          pipeline: [
            {
              $match: {
                followee: oid_user,
                unfollowAt: null,
                $expr: {
                  $eq: ['$$userId', '$follower']
                }
              }
            },
            {
              $project: {
                _id: 1
              }
            }
          ],
          as: 'followedMe'
        }
      },
      {
        // based on the size of these fields (0 or 1+), we determine if user
        // is followed by this other user and user is following this other user
        $project: {
          _id: 1,
          follower: 1,
          followee: 1,
          imFollowing: {
            $cond: [
              {
                $eq: [
                  {
                    $size: '$imFollowing'
                  },
                  0
                ]
              },
              false,
              true
            ]
          },
          followedMe: {
            $cond: [
              {
                $eq: [
                  {
                    $size: '$followedMe'
                  },
                  0
                ]
              },
              false,
              true
            ]
          }
        }
      }
    ]);
    // const following = await this.userRepository.populate(results, {path: '_id'});
    // return following;
    return results;
  }

  /**
   * 你关注的人，相当于微博中的“关注”
   */
  public async getFollowings(
    userId: string,
    paginateOptions: PaginateOptionsQueryModel = {}
  ): Promise<any> {
    return this.followerRepository.paginate(
      {
        follower: userId,
        unfollowAt: null
      },
      paginateOptions
    );
  }

  /**
   * get current user followers and following count
   */
  public async getFollowCount(userId: string): Promise<any> {
    const followings = await this.getFollowingsCount(userId);
    const followers = await this.getFollowsCount(userId);
    return {
      followings,
      followers,
      _id: userId,
      userId: userId
    };
  }

  /**
   * get current user followers  count
   */
  public async getFollowsCount(userId: string): Promise<any> {
    return this.repository
      .find({followee: userId, unfollowAt: null})
      .countDocuments();
  }

  /**
   * get current user following count
   */
  public async getFollowingsCount(userId: string): Promise<any> {
    return this.repository
      .find({follower: userId, unfollowAt: null})
      .countDocuments();
  }

  /**
   * 不再关注某一人。
   */
  public async unfollow(updateModel: FollowerUpdateModel): Promise<any | null> {
    const follower = await this.repository.findOneAndUpdate(
      {...updateModel, unfollowAt: null},
      {unfollowAt: new Date()},
      {upsert: true}
    );
    const relation = await this.getRelationships(updateModel.follower, [
      follower.followee
    ]);
    return relation;
  }
}
