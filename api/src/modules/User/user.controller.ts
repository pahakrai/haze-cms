import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';

import {AC} from 'src/core/decorators';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {AllowAction, CurrentUser, RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {UserService} from './user.service';

// models
import {
  UserCreateModel,
  UserUpdateModel,
  UserSearchModel,
  UserPreferencesUpdateModel,
  UserActivationIssueCreateModel
} from './models';
import {UserAccessUpdateModel} from './models/user.access.update.model';

import {IUser} from './interfaces';

import {UserIsDuplicatePhoneModel} from './models/user.isDuplicatePhone.model';
import {UserIsDuplicateEmailModel} from './models/user.isDuplicateEmail.model';
import {UserIsDuplicateUsernameModel} from './models/user.isDuplicateUsername.model';
import {UserActivationIssueUpdateModel} from './models/user.activationIssue.update.model';

enum UserAccessUpdateType {
  ADD = 'add',
  DELETE = 'delete'
}

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: UserCreateModel) {
    return this.userService.create(body);
  }

  @Patch('me')
  @RequireLogin()
  public async updateCurrentUser(
    @CurrentUser() me: IUser,
    @Body() body: UserUpdateModel
  ) {
    return this.userService.update(me?._id?.toHexString(), body);
  }

  @Patch(':_id')
  @AllowAction('User:Update')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: UserUpdateModel
  ) {
    await this.userService.validateModel(body, param?._id);
    return this.userService.update(param?._id, body);
  }

  @Patch('me/preferences')
  @RequireLogin()
  public async updateCurrentUserPreferences(
    @CurrentUser() me: IUser,
    @Body() body: UserPreferencesUpdateModel
  ) {
    return this.userService.update(me?._id?.toHexString(), {preferences: body});
  }

  @RequireLogin()
  @Patch('change-workspace/:workspace')
  public async changeWorkspace(@Param('workspace') workspace: string) {
    return this.userService.changeWorkspace(workspace);
  }

  @Post('is-duplicate-email')
  public async isDuplicateEmail(@Body() body: UserIsDuplicateEmailModel) {
    const {userId, email, userType} = body;

    return this.userService.isDuplicateEmail(email, {
      excludeUsers: [userId],
      userTypes: [userType]
    });
  }

  @Post('is-duplicate-phone')
  public async isDuplicatePhone(@Body() body: UserIsDuplicatePhoneModel) {
    const {userId, phone, userType} = body;

    return this.userService.isDuplicatePhone(phone, {
      excludeUsers: [userId],
      userTypes: [userType]
    });
  }

  @Post('is-duplicate-username')
  public async isDuplicateUsername(@Body() body: UserIsDuplicateUsernameModel) {
    const {userId, username, userType} = body;

    return this.userService.isDuplicateUsername(username, {
      excludeUsers: [userId],
      userTypes: [userType]
    });
  }

  @Post('update-user-access/:updateType')
  @RequireLogin()
  public async updateUserAccess(
    @Body() body: UserAccessUpdateModel,
    @Param()
    param: {
      updateType: UserAccessUpdateType;
    }
  ) {
    const {userId, groups, notificationTypes} = body;
    // TODO: figure out proper place to prepare cofiguration
    // endpoint or to the service level addUserToAcGroups/removeUserFromAcGroups
    // can force notify as well
    const notificationConfig = {
      ...(notificationTypes?.length ? {notificationTypes} : {}),
      ...(notificationTypes?.length ? {notify: true} : {})
    };
    if (param.updateType === UserAccessUpdateType.ADD) {
      return this.userService.addUserToAcGroups(
        userId,
        groups,
        notificationConfig
      );
    }
    if (param.updateType === UserAccessUpdateType.DELETE) {
      return this.userService.removeUserFromAcGroups(
        userId,
        groups,
        notificationConfig
      );
    }
    return null;
  }

  @Get('me')
  @RequireLogin()
  public async getCurrentUser(@CurrentUser() currentUser: IUser, @AC() ac) {
    let actions = null;
    if (currentUser && currentUser._id) {
      actions = {
        allows: await ac.getUserAllowedActions(
          currentUser.currentWorkspace.toHexString(),
          currentUser._id.toString()
        ),
        denies: await ac.getUserDeniedActions(
          currentUser.currentWorkspace.toHexString(),
          currentUser._id.toString()
        )
      };
    }
    return {...currentUser, actions};
  }

  @Get('me/preferences')
  @RequireLogin()
  public async getCurrentUserPreferences(@CurrentUser() me: IUser) {
    return me.preferences;
  }

  @Post(':_id/add-activation-issues')
  @RequireLogin()
  public async addActivationIssues(
    @Param('_id') _id: string,
    @Body() body: UserActivationIssueCreateModel[]
  ) {
    return this.userService.addUserActivationIssues(_id, body);
  }

  @Patch(':_id/update-activation-issues')
  @RequireLogin()
  public async updateActivationIssues(
    @Param('_id') _id: string,
    @Body() body: UserActivationIssueUpdateModel[]
  ) {
    return this.userService.updateUserActivationIssues(_id, body);
  }

  @Patch(':_id/status/:status')
  @RequireLogin()
  public async setUserStatus(
    @Param('_id') _id: string,
    @Param('status') status: number,
    @Body() body
  ) {
    return this.userService.setUserStatus(_id, status, body);
  }

  @Get()
  @AllowAction('User:Management:View')
  public async find(@Query() query: UserSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.userService.findWithPaginate(query);
      // do populates
      result.docs = await this.userService._populate(result.docs, populates);
    } else {
      result = await this.userService.find(query, {lean: true});
      // do populates
      result = await this.userService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    // get user by id
    const user = await this.userService.findById(param._id);
    // populate and return user
    return this.userService._populate(user, query ? query.populates : []);
  }

  @Delete(':_id')
  @AllowAction('User:Delete')
  public async delete(@Param() param: ParamIdModel) {
    // delete a user by id
    return this.userService.delete(param._id);
  }
}
