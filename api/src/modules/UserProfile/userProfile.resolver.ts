import {UseFilters} from '@nestjs/common';
import {Resolver, Args, Query, Mutation} from '@nestjs/graphql';
import {GraphQLExceptionFilter, GqlCurrentUser, RequireLogin} from 'src/core';
import {UserProfileService} from './userProfile.service';
import {UserProfileUpdateModel} from './models';
import {IUser} from '../User';

@Resolver('UserProfile')
@UseFilters(GraphQLExceptionFilter)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Query()
  @RequireLogin()
  async myUserProfile(@GqlCurrentUser() currentUser: IUser) {
    return this.userProfileService.getUserProfile(
      currentUser?._id?.toHexString()
    );
  }

  @Mutation()
  @RequireLogin()
  async updateMyUserProfile(
    @Args('userProfileUpdateModel')
    userProfileUpdateModel: UserProfileUpdateModel,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.userProfileService.updateUserProfile(
      currentUser?._id?.toHexString(),
      userProfileUpdateModel
    );
  }

  @Mutation()
  @RequireLogin()
  async updateMyDocs(
    @Args('files') files: any[],
    @Args('fileType')
    fileType: string,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.userProfileService.uploadUserDocs(
      currentUser?._id?.toHexString(),
      fileType,
      {
        type: 'ReactNative',
        files
      }
    );
  }

  @Mutation('updateMyAvatar')
  @RequireLogin()
  async updateAvatar(
    @Args('images') files: any[],
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.userProfileService.updateUserAvatar(
      currentUser?._id.toHexString(),
      {type: 'ReactNative', files}
    );
  }
}
