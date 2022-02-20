import {
  Resolver,
  Parent,
  Args,
  Query,
  Mutation,
  Context,
  Subscription,
  ResolveField
} from '@nestjs/graphql';
import {Types} from 'mongoose';
import {PubSub, withFilter} from 'graphql-subscriptions';

const pubSub = new PubSub();

// services
import {FollowerService} from './follower.service';
import {UserService} from '../User/user.service';
import {BypassSecretGuard, RequireLogin} from 'src/core';

const {ObjectId} = Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

// guards
@Resolver('Follower')
export class FollowerResolver {
  constructor(
    private readonly followerService: FollowerService,
    private readonly userService: UserService
  ) {}

  @Query()
  async userFollowRelationship(
    @Args('userId') userId: string,
    @Args('otherUsers') otherUsers: Array<string>
  ) {
    return this.followerService.getRelationships(userId, otherUsers);
  }

  @Query()
  async isFollowing(
    @Args('followee') followee: string,
    @Args('follower') follower: any
  ) {
    return this.followerService.isFollowing(follower, followee);
  }

  @Query()
  async userFollowers(
    @Args('userId') userId: string,
    @Args('paginate') paginate: any
  ) {
    return this.followerService.findWithCursorPaginate(
      {followee: userId, unfollowAt: null},
      paginate
    );
  }

  @Query()
  async userFollowings(
    @Args('userId') userId: string,
    @Args('paginate') paginate: any
  ) {
    return this.followerService.findWithCursorPaginate(
      {follower: userId, unfollowAt: null},
      paginate
    );
  }

  @Query()
  async userFollowersCount(@Args('userId') userId: string) {
    const result = await this.followerService.getFollowers(userId);
    return result.length;
  }

  @Query()
  async userFollowingsCount(@Args('userId') userId: string) {
    const result = await this.followerService.getFollowings(userId);
    return result.length;
  }

  @Mutation()
  @RequireLogin()
  async follow(
    @Args('follower') follower: string,
    @Args('followee') followee: string,
    @Context() ctx
  ) {
    const {user: currentUser} = ctx.req;
    const relationShip = await this.followerService.follow({
      follower,
      followee
    });
    // send notification
    // const followerUser = await this.userService.findById(follower, false);
    // const followeeUser = await this.userService.findById(followee);
    // const avatarFilemetaId =
    //   currentUser.avatars &&
    //   currentUser.avatars[0] &&
    //   currentUser.avatars[0].fileMetaId &&
    //   String(currentUser.avatars[0].fileMetaId);
    // this.notificationService.push({
    //   senders: [currentUser._id],
    //   toUsers: [{user: followee, read: false}],
    //   title: locale.tAll('msg_follower_body', [followerUser.username]),
    //   images: [
    //     {
    //       fileMeta: avatarFilemetaId
    //     }
    //   ],
    //   body: null,
    //   data: {
    //     screen: 'UserProfile',
    //     parameters: {
    //       _id: currentUser._id.toString()
    //     }
    //   },
    //   hooks: []
    // });

    // update follower count
    pubSub.publish('followerCountUpdate', {
      user: currentUser._id,
      followerCount: await this.followerService.getFollowCount(
        currentUser._id.toString()
      )
    });
    pubSub.publish('followerCountUpdate', {
      user: followee,
      followerCount: await this.followerService.getFollowCount(
        followee.toString()
      )
    });

    const followerData = await this.followerService.find({
      follower,
      followee,
      unfollowAt: null
    });

    if (followerData.length) {
      pubSub.publish('userFollowed', {userFollowed: followerData[0]});
    }

    // create user tag relation ship
    // this.userTagRelationshipService.createOrUpdate(
    //   follower,
    //   followeeUser.username
    // );

    return relationShip;
  }

  @Mutation()
  @RequireLogin()
  async unfollow(
    @Args('follower') follower: string,
    @Args('followee') followee: string,
    @Context() ctx
  ) {
    const {user: currentUser} = ctx.req;
    const followerData = await this.followerService.find({
      follower,
      followee,
      unfollowAt: null
    });
    const relationShip = await this.followerService.unfollow({
      follower,
      followee
    });
    // send notification
    // const followerUser = await this.userService.findById(follower);
    // const followeeUser = await this.userService.findById(followee);
    // const avatarFilemetaId =
    //   currentUser.avatars &&
    //   currentUser.avatars[0] &&
    //   currentUser.avatars[0].fileMetaId &&
    //   String(currentUser.avatars[0].fileMetaId);
    // this.notificationService.push({
    //   senders: [currentUser._id],
    //   toUsers: [{user: followee, read: false}],
    //   title: locale.tAll('msg_unfollower_body', [followerUser.username]),
    //   images: [
    //     {
    //       fileMeta: avatarFilemetaId
    //     }
    //   ],
    //   body: null,
    //   data: {
    //     screen: 'UserProfile',
    //     parameters: {
    //       _id: currentUser._id.toString()
    //     }
    //   },
    //   hooks: []
    // });
    // update follower count
    pubSub.publish('followerCountUpdate', {
      user: currentUser._id,
      followerCount: await this.followerService.getFollowCount(
        currentUser._id.toString()
      )
    });
    pubSub.publish('followerCountUpdate', {
      user: followee,
      followerCount: await this.followerService.getFollowCount(
        followee.toString()
      )
    });

    if (followerData.length) {
      pubSub.publish('userUnfollowed', {userUnfollowed: followerData[0]});
    }

    // delete user tag relation ship
    // this.userTagRelationshipService.delete(follower, followeeUser.username);

    return relationShip;
  }

  @ResolveField('followee')
  async followee(@Parent() follower) {
    return this.userService.findById(follower.followee);
  }

  @ResolveField('follower')
  async follower(@Parent() follower) {
    return this.userService.findById(follower.follower);
  }

  // subscriptions
  @BypassSecretGuard()
  @Subscription('followerCountUpdate')
  followerCountUpdate() {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator('followerCountUpdate'),
        (rootValue?: any, args?: any, context?: any) => {
          if (!rootValue) return false;
          return rootValue.user === context.user;
        }
      )
    };
  }

  @BypassSecretGuard()
  @Subscription('userFollowed', {
    filter: (rootValue?: any, args?: any) => {
      if (!rootValue) return false;
      const {userId} = args;
      return (
        rootValue.userFollowed.followee.toString() === userId ||
        rootValue.userFollowed.follower.toString() === userId
      );
    }
  })
  userFollowed() {
    return pubSub.asyncIterator('userFollowed');
  }

  @BypassSecretGuard()
  @Subscription('userUnfollowed', {
    filter: (rootValue?: any, args?: any) => {
      if (!rootValue) return false;
      return (
        rootValue.userUnfollowed.follower.toString() === args.userId ||
        rootValue.userUnfollowed.followee.toString() === args.userId
      );
    }
  })
  userUnfollowed() {
    return pubSub.asyncIterator('userUnfollowed');
  }
}
