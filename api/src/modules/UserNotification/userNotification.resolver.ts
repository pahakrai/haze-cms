import {
  Resolver,
  ResolveField,
  Parent,
  Args,
  Query,
  Context,
  Mutation,
  Subscription
} from '@nestjs/graphql';
import {Inject, forwardRef, UseFilters} from '@nestjs/common';
// services
import {UserNotificationService} from './userNotification.service';
// util
import {
  GraphQLExceptionFilter,
  CurrentUser,
  LocaleDecorator,
  BypassSecretGuard,
  pubSub,
  RequireLogin
} from 'src/core';

import {FilemetaService} from '../File/FileMeta';
// import {IUser} from '../User';

// guards
@Resolver('UserNotification')
@UseFilters(GraphQLExceptionFilter)
export class UserNotificationResolver {
  constructor(
    @Inject(forwardRef(() => UserNotificationService))
    private readonly userNotificationService: UserNotificationService,
    @Inject(forwardRef(() => FilemetaService))
    private readonly fileMetaService: FilemetaService
  ) {}

  @Query()
  @RequireLogin()
  async userNotification(@Args('id') id: string, @CurrentUser() user) {
    const userNotification = await this.userNotificationService.findOne({
      users: [user._id],
      _ids: [id]
    });
    return userNotification;
  }

  @Query()
  @RequireLogin()
  async userNotifications(
    @Args('paginate') paginate: any,
    @CurrentUser() currentUser
  ) {
    return this.userNotificationService.findWithCursorPaginate(
      {
        users: [currentUser._id.toHexString()]
      },
      {...paginate, sort: {createdAt: -1}}
    );
  }

  @Query()
  @RequireLogin()
  async userNotificationCount(
    @Args('read') read: boolean,
    @CurrentUser() currentUser
  ) {
    return this.userNotificationService.getUserNotificationCount(
      currentUser._id,
      read
    );
  }

  @Mutation()
  @RequireLogin()
  async userNotificationRead(
    @Args('id') userNotificationId,
    @CurrentUser() currentUser
  ) {
    return this.userNotificationService.updateToRead(
      userNotificationId,
      currentUser._id.toHexString()
    );
  }

  @Mutation()
  @RequireLogin()
  async userNotificationUnread(
    @Args('id') userNotificationId,
    @CurrentUser() currentUser
  ) {
    return this.userNotificationService.updateToUnread(
      userNotificationId,
      currentUser._id.toHexString()
    );
  }

  @ResolveField('title')
  getTitle(@Parent() userNotification, @Context() ctx) {
    const {
      locale: {currentLanguage}
    } = ctx.req;
    return userNotification.title
      ? userNotification.title[currentLanguage]
      : '';
  }

  @ResolveField('message')
  getMessage(@Parent() userNotification, @LocaleDecorator() locale) {
    return userNotification.message
      ? userNotification.message[locale.getLanguage()]
      : '';
  }

  @ResolveField('read')
  getRead(@Parent() userNotification, @CurrentUser() currentUser) {
    return (
      currentUser &&
      currentUser._id &&
      userNotification.users.some(
        u => u.user._id.toString() === currentUser._id.toHexString() && u.read
      )
    );
  }

  @ResolveField('images')
  async getImages(@Parent() userNotification) {
    const images = [];
    for (const img of userNotification.images) {
      images.push({
        ...(img.toObject ? img.toObject() : img),
        fileMeta: await this.fileMetaService.findById(img.fileMeta)
      });
    }
    return images;
  }

  @ResolveField('senders')
  async getSenders(@Parent() userNotification) {
    const {
      senders
    } = await this.userNotificationService._populate(userNotification, [
      'senders'
    ]);

    return senders;
  }

  @ResolveField('users')
  async getUsers(@Parent() userNotification) {
    const {
      users
    } = await this.userNotificationService._populate(userNotification, [
      '$users.user'
    ]);
    return users;
  }

  @BypassSecretGuard()
  @Subscription('userNotificationCreated', {
    filter: (rootValue?: any, args?: any, context?: any, info?: any) => {
      if (!rootValue) return false;
      const {userNotificationCreated} = rootValue;
      const {user} = context;
      return userNotificationCreated.users.some(
        u => u.user.toString() === user
      );
    }
  })
  userNotificationCreated() {
    return pubSub.asyncIterator('userNotificationCreated');
  }

  @BypassSecretGuard()
  @Subscription('userNotificationUnreadCount', {
    filter: (rootValue?: any, args?: any, context?: any, info?: any) => {
      if (!rootValue) return false;
      const {userId} = rootValue;
      const {user} = context;
      return userId.toString() === user.toString();
    },
    resolve: value => value.unreadCount
  })
  userNotificationUnreadCount() {
    return pubSub.asyncIterator('userNotificationUnreadCount');
  }
}
