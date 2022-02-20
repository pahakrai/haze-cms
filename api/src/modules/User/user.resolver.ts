import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {RequireLogin} from 'src/core';
import {GqlCurrentUser} from 'src/core/graphql';
import {GraphQLExceptionFilter} from 'src/core/filters';

import {UserService} from './user.service';
import {IUser} from './interfaces';
import {ACService} from '../Ac/ac.service';

@Resolver('User')
@UseFilters(GraphQLExceptionFilter)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly acService: ACService
  ) {}

  @ResolveField('avatars')
  async getAvatars(@Parent() user: IUser) {
    const {avatars} = await this.userService._populate(user, [
      '$avatars.fileMeta'
    ]);
    return avatars;
  }

  @ResolveField('currentWorkspace')
  async getCurrentWorkspace(@Parent() user: IUser) {
    const {currentWorkspace} = await this.userService._populate(user, [
      'currentWorkspace'
    ]);
    return currentWorkspace;
  }

  @ResolveField('actions')
  async getActions(@Parent() user: IUser) {
    if (user.actions) {
      return user.actions;
    }

    const userId = user._id.toHexString();
    const currentWorkspace = user.currentWorkspace.toHexString();

    const allows = await this.acService.getUserAllowedActions(
      currentWorkspace,
      userId
    );
    const denies = await this.acService.getUserDeniedActions(
      currentWorkspace,
      userId
    );

    return {
      allows,
      denies
    };
  }

  @ResolveField('preferences')
  async getPreferenceCategories(@Parent() user) {
    if (user?.preferences && user?.preferences?.themes?.length) {
      await this.userService._populate(user, ['$preferences.themes.theme']);
    }
    return {...user?.preferences};
  }

  @Query()
  async user(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Query()
  async users(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.userService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Query()
  @RequireLogin()
  async currentUser(@GqlCurrentUser() currentUser) {
    return currentUser;
  }

  @Query()
  @RequireLogin()
  async userByInput(@Args('input') input: string) {
    return this.userService.findOneByMultipleStringFields(input);
  }

  @Mutation('currentUser')
  @RequireLogin()
  async getCurrentUser(@GqlCurrentUser() currentUser) {
    return currentUser;
  }

  @Mutation()
  @RequireLogin()
  async createUser(@Args('userCreateModel') userCreateModel) {
    return this.userService.create(userCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateUser(
    @Args('id') id: string,
    @Args('userUpdateModel') userUpdateModel
  ) {
    return this.userService.update(id, userUpdateModel);
  }

  @Mutation()
  async isDuplicateEmail(
    @Args('email') email: string,
    @Args('userType') userType: string
  ) {
    return this.userService.isDuplicateEmail(email, {userTypes: [userType]});
  }

  // NOTE: replace this mutation with isDuplicateContact
  @Mutation()
  async isDuplicatePhone(
    @Args('phone') phone: string,
    @Args('userType') userType: string
  ) {
    return this.userService.isDuplicatePhone(phone, {userTypes: [userType]});
  }

  @Mutation()
  @RequireLogin()
  async toggleReceiveNotification(
    @Args('userId') userId,
    @Args('isEnabled') isEnabled
  ) {
    const user = await this.userService.toggleUserNotificationPreference(
      userId,
      isEnabled
    );
    return user;
  }
}
