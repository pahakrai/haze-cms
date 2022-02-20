'use strict';
// npm
import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Patch,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
// core
import {HttpExceptionFilter} from 'src/core/filters';
import {MapDisplayLocalizeInterceptor, RequireLogin} from 'src/core';

// services
import {FollowerService} from './follower.service';
import {FollowerCreateModel} from './models';

@UseFilters(HttpExceptionFilter)
@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  /**
   * follow a person
   */
  @Post()
  @RequireLogin()
  public async follow(@Body() createModel: FollowerCreateModel) {
    const follower = await this.followerService.follow(createModel);
    // update follower count
    // this.followerSocket.followerCountUpdate(null, currentUser._id);
    // this.followerSocket.followerCountUpdate(null, createModel.follower);
    // const followerUser = await this.userService.findById(createModel.follower);
    // const followeeUser = await this.userService.findById(createModel.followee);
    // const avatarFilemetaId =
    //   currentUser.avatars &&
    //   currentUser.avatars[0] &&
    //   currentUser.avatars[0].fileMetaId &&
    //   String(currentUser.avatars[0].fileMetaId);
    // this.notificationService.push({
    //   senders: [currentUser._id],
    //   toUsers: [{user: createModel.followee, read: false}],
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
    // create user tag relation ship
    // this.userTagRelationshipService.createOrUpdate(
    //   createModel.follower,
    //   followeeUser.username
    // );
    return follower;
  }

  /**
   * find follower by param userId
   * @param res response
   * @param params req.params
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get(':_id/followers')
  public async findFollowers(@Param() params, @Query() query) {
    const followers = await this.followerService.getFollowers(
      params._id,
      query
    );
    return followers;
  }

  /**
   * find following by param userId
   * @param res response
   * @param params req.params
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @Get(':_id/followings')
  public async findFollowings(@Param() params, @Query() query) {
    const followings = await this.followerService.getFollowings(
      params._id,
      query
    );
    return followings;
  }

  /**
   * find follow count by param userId
   * @param params req.params
   */
  @Get(':_id/count')
  public async findFollowCount(@Param() params) {
    const result = await this.followerService.getFollowCount(params._id);
    return result;
  }

  /**
   * get one user relationship with other users in params list
   * @param params req.params
   */
  @Get(':_id/relationships')
  public async getRelationships(@Param() params, @Query() query) {
    const result = await this.followerService.getRelationships(
      params._id,
      query.users.replace(' ', '').split(',')
    );
    return result;
  }

  /**
   * follow a person
   */
  @RequireLogin()
  @Post(':follower/follows/:followee')
  public async followByParam(
    @Param() params: {follower: string; followee: string}
  ) {
    const follower = await this.followerService.follow({
      followee: params.followee,
      follower: params.follower
    });
    // const followerUser = await this.userService.findById(params.follower);
    // const followeeUser = await this.userService.findById(params.followee);
    // const avatarFilemetaId =
    //   currentUser.avatars &&
    //   currentUser.avatars[0] &&
    //   currentUser.avatars[0].fileMetaId &&
    //   String(currentUser.avatars[0].fileMetaId);
    // this.notificationService.push({
    //   senders: [currentUser._id],
    //   toUsers: [{user: params.followee, read: false}],
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
    // this.followerSocket.followerCountUpdate(null, currentUser._id);
    // this.followerSocket.followerCountUpdate(null, params.followee);

    // create user tag relation ship
    // this.userTagRelationshipService.createOrUpdate(
    //   params.follower,
    //   followeeUser.username
    // );
    return follower;
  }

  /**
   * unfollow user
   * @param res response
   * @param params req.params
   */
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  @RequireLogin()
  @Patch(':follower/unfollows/:followee')
  public async unfollow(@Param() params: {follower: string; followee: string}) {
    const follower = await this.followerService.unfollow({
      followee: params.followee,
      follower: params.follower
    });
    // const followerUser = await this.userService.findById(params.follower);
    // const followeeUser = await this.userService.findById(
    //   params.followee,
    // );
    // const avatarFilemetaId =
    //   currentUser.avatars &&
    //   currentUser.avatars[0] &&
    //   currentUser.avatars[0].fileMetaId &&
    //   String(currentUser.avatars[0].fileMetaId);
    // this.notificationService.push({
    //   senders: [currentUser._id],
    //   toUsers: [{user: params.followee, read: false}],
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
    // this.followerSocket.followerCountUpdate(null, currentUser._id);
    // this.followerSocket.followerCountUpdate(null, params.followee);

    // delete user tag relation ship
    // this.userTagRelationshipService.delete(
    //   params.follower,
    //   followeeUser.username
    // );

    return follower;
  }
}
