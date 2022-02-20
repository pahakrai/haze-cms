import {
  Get,
  Body,
  Param,
  Controller,
  UseFilters,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Put,
  Query
} from '@nestjs/common';
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  DeserializeBodyInterceptor,
  CurrentUser,
  RequireLogin,
  AllowAction,
  UserTypes
} from 'src/core';
import common from '@golpasal/common';

import {FilesInterceptor} from 'src/core/utils';
import {WorkspaceInterceptor} from 'src/core/interceptors';

// services
import {UserProfileService} from './userProfile.service';

// models
import {UserSearchModel, IUser} from '../User';
import {UserProfileUpdateModel} from './models';

const {UserType} = common.type;

@RequireLogin()
@Controller('user-profiles')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class UserProfileController extends BaseController {
  constructor(private readonly userProfileService: UserProfileService) {
    super();
  }

  @Get('list/:userType')
  @AllowAction('User:Provider:View')
  public async list(
    @Param() param: {userType: string},
    @Query() query: UserSearchModel
  ) {
    return this.userProfileService.getUsersList(param?.userType, query);
  }

  @Get('user-requirements/:requirementType/user-type/:userType')
  public async getRequirements(
    @Param() param: ParamIdModel & {requirementType: string; userType: string}
  ) {
    return this.userProfileService.getRequirements(
      param?.requirementType,
      param?.userType
    );
  }

  @Get(':_id')
  public async getUserProfileByUserID(
    @Param() param: ParamIdModel,
    @Query() query: UserSearchModel
  ) {
    const userId = param?._id;
    return this.userProfileService.getUserProfile(userId, query?.populates);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: UserProfileUpdateModel
    // @Query() query: UserSearchModel
  ) {
    return this.userProfileService.updateUserProfile(param?._id, body);
  }

  @Patch('/upload/:fileType')
  @UseInterceptors(FilesInterceptor, DeserializeBodyInterceptor)
  public async uploadMyDocs(
    @Param() param: {fileType: string; userType: string},
    @CurrentUser() currentUser: IUser,
    @UploadedFiles() files: any
  ) {
    return this.userProfileService.uploadUserDocs(
      currentUser?._id?.toHexString(),
      param?.fileType,
      {
        type: 'FormData',
        files
      }
    );
  }

  @Patch('/upload/:userId/file-type/:fileType')
  @UseInterceptors(FilesInterceptor, DeserializeBodyInterceptor)
  public async uploadDocs(
    @Param() param: {userId: string; fileType: string; userType: string},
    @UploadedFiles() files: Array<any>
  ) {
    return this.userProfileService.uploadUserDocs(
      param?.userId,
      param?.fileType,
      {
        type: 'FormData',
        files
      }
    );
  }

  @Put(':_id/avatar')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  @UseInterceptors(FilesInterceptor)
  public async userAvatarUpdate(
    @Param() param: ParamIdModel,
    @UploadedFiles() files
  ) {
    return this.userProfileService.updateUserAvatar(param?._id, {
      type: 'FormData',
      files
    });
  }
}
