import {Injectable, Scope, Inject, HttpService} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {ObjectId} from 'mongodb';
import {
  MongooseOption,
  BadRequestException,
  getEEOAuthHeader,
  Locale
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import common from '@golpasal/common';

import {
  PATTERN_SANITIZE_LOGIN_INPUT,
  PATTERN_SANITIZE_USERNAME,
  PATTERN_SANITIZE_EMAIL_DOMAIN
} from 'src/core/utils/patterns';
// interfaces & models
import {IUserModel, IUser, IUserVerified} from './interfaces';
import {Workspace, WorkspaceHooks} from '../Workspace/interfaces';
import {UserCreateModel, UserUpdateModel, UserSearchModel} from './models';
import {UserActivationIssueUpdateModel} from './models/user.activationIssue.update.model';

import {ACService} from '../Ac/ac.service';
import {WorkspaceService} from '../Workspace/workspace.service';
import {AuthConfigService} from '../Auth/submodules/AuthConfig';
import {NotificationService} from '../Notification/notification.service';

const {
  UserType,
  IntegrationAppType,
  NotificationMediaType,
  AuthContactMethodType,
  PushNotificationMerchantScreenType
} = common.type;
const {UserStatus} = common.status;

enum UserAccessUpdateType {
  ADD = 'add',
  DELETE = 'delete'
}

@Injectable({scope: Scope.REQUEST})
export class UserService extends BaseCRUDService<
  IUser,
  UserCreateModel,
  UserUpdateModel,
  UserSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Users') protected readonly userRepository: IUserModel,
    private readonly acService: ACService,
    private readonly httpService: HttpService,
    private readonly workspaceService: WorkspaceService,
    private readonly authConfigService: AuthConfigService,
    private readonly notificationService: NotificationService
  ) {
    super(userRepository, request);
  }

  public _castQuery(searchModel: UserSearchModel) {
    const queryAnd = [];
    const {
      _ids,
      not_ids,
      q,
      verifyInput,
      workspace,
      userTypes,
      email,
      username,
      phone,
      name,
      statuses,
      isVerified,
      phones,
      createdAtFr,
      createdAtTo
    } = searchModel;

    // get current workspace or extract workspace from header
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      workspace;

    if (isVerified !== undefined) {
      queryAnd.push({isVerified});
    }

    if (Array.isArray(statuses) && statuses?.length > 0) {
      queryAnd.push({status: {$in: statuses}});
    }

    // NOTE: _ids included should be able to check even the empty
    // array for proper result
    if (Array.isArray(_ids)) {
      queryAnd.push({_id: {$in: _ids}});
    }

    if (Array.isArray(not_ids) && not_ids?.length > 0) {
      queryAnd.push({_id: {$nin: not_ids}});
    }

    if (workspaceId) {
      if (
        userTypes?.length &&
        // as userType User & Member should have only one workspace
        (userTypes?.includes(UserType.USER) ||
          userTypes?.includes(UserType.MEMBER))
      ) {
        queryAnd.push({currentWorkspace: new ObjectId(workspaceId)});
      }
      queryAnd.push({workspaces: {$in: [new ObjectId(workspaceId)]}});
    } else {
      // if not provided then workspaces should be empty or null
      // NOTE: null checks if exist or not and [] checks if exist it is empty
      // queryAnd.push({workspaces: {$in: [null]}});
    }

    if (q) {
      const qReg = new RegExp(q, 'i');
      queryAnd.push({
        $or: [
          ...(ObjectId.isValid(q) ? [{_id: new ObjectId(q)}] : []),
          {username: qReg},
          {email: qReg},
          {phone: qReg},
          {name: qReg},
          {lastName: qReg},
          {firstName: qReg},
          {description: qReg}
        ]
      });
    }

    if (username) {
      const sanitizedInput = username
        .replace(PATTERN_SANITIZE_LOGIN_INPUT, '')
        .replace('.', '\\.');
      queryAnd.push({username: new RegExp(`^${sanitizedInput}$`, 'i')});
    }
    if (name) {
      queryAnd.push({name: name});
    }

    if (phone) {
      const sanitizedInput = phone.replace(PATTERN_SANITIZE_LOGIN_INPUT, '');
      queryAnd.push({phone: new RegExp(`^${sanitizedInput}$`, 'i')});
    }

    if (email) {
      const sanitizedInput = email
        .replace(PATTERN_SANITIZE_LOGIN_INPUT, '')
        .replace('.', '\\.');
      queryAnd.push({email: new RegExp(`^${sanitizedInput}$`, 'i')});
    }

    if (verifyInput) {
      const sanitizedInput = verifyInput
        .replace(PATTERN_SANITIZE_LOGIN_INPUT, '')
        .replace('.', '\\.');
      queryAnd.push({
        $or: [
          ...(ObjectId.isValid(sanitizedInput)
            ? [{_id: new ObjectId(sanitizedInput)}]
            : []),
          {email: new RegExp(`^${sanitizedInput}$`, 'i')},
          {phone: new RegExp(`^${sanitizedInput}$`, 'i')},
          {username: new RegExp(`^${sanitizedInput}$`, 'i')}
        ]
      });
    }

    if (userTypes?.length) {
      queryAnd.push({userTypes: {$in: userTypes}});
    }

    if (Array.isArray(phones)) {
      queryAnd.push({phone: {$in: phones}});
    }

    if (createdAtFr && createdAtTo) {
      queryAnd.push({
        createdAt: {
          $gte: createdAtFr,
          $lte: createdAtTo
        }
      });
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  protected _generateRandomCode(length: number) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
  }

  public async addUserActivationIssue(
    userId: string,
    activationIssue: any
  ): Promise<IUser> {
    const currentUser: IUser = this.getCurrentUser();
    const workspaceId: string =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    return this.userRepository.findOneAndUpdate(
      {_id: userId, currentWorkspace: workspaceId},
      {
        $push: {
          activationIssues: activationIssue
        }
      },
      {new: true}
    );
  }

  public async addUserActivationIssues(
    userId: string,
    activationIssues: any
  ): Promise<IUser> {
    const currentUser: IUser = this.getCurrentUser();
    const workspaceId: string =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    const user = await this.userRepository.findOneAndUpdate(
      {_id: userId, workspaces: {$in: [workspaceId]}},
      {
        $push: {
          activationIssues: activationIssues
        }
      },
      {
        new: true
      }
    );
    // if the workspace userActiviationIssueAdd = true, will push notifications to driver
    const workspace = await this.workspaceService.findById(workspaceId);
    if (workspace?.preferences?.pushNotification?.userActiviationIssueAdd) {
      const locale = this.getLocale();
      await this.notificationService.push({
        toUsers: [{user: user}],
        toDevices: [],
        title: locale.tAll('user_activation_issues'),
        body: locale.tAll('msg_click_to_view_details'),
        data: {
          screen: PushNotificationMerchantScreenType.USER_PROFILE,
          parameters: {userId}
        }
      });
    }
    return user;
  }

  /**
   * change user's current workspace
   * @param workspace target workspace, should be in user.workspaces[]
   */
  public async changeWorkspace(workspace: string) {
    // get current user
    const user = this.getCurrentUser<IUser>();

    // check targe workspace is in user.workspaces[]
    if (!user.workspaces.find(w => w.toString() === workspace)) {
      throw new BadRequestException({});
    }

    // update currentWorkspace
    return this.update(user?._id?.toHexString(), {currentWorkspace: workspace});
  }

  public async create(
    newUser: UserCreateModel,
    options?: MongooseOption,
    createOptions?: {
      usernameAutoGenerate?: boolean;
      usernameFillerLength?: number;
      usernameForceFiller?: boolean;
      usernameIncremental?: boolean;
      usernameExcludeNames?: string[];
    }
  ): Promise<IUser> {
    // build generateUsername options from create's options
    const buildGenerateUsernameOptions: {
      forceFiller?: boolean;
      incremental?: boolean;
      excludeNames?: string[];
    } = {};
    if (createOptions?.usernameForceFiller !== undefined) {
      buildGenerateUsernameOptions.forceFiller =
        createOptions?.usernameForceFiller;
    }
    if (createOptions?.usernameIncremental !== undefined) {
      buildGenerateUsernameOptions.incremental =
        createOptions?.usernameIncremental;
    }
    if (createOptions?.usernameExcludeNames?.length) {
      buildGenerateUsernameOptions.excludeNames =
        createOptions?.usernameExcludeNames;
    }

    // sanitize phone
    const phone = newUser?.phone?.replace(PATTERN_SANITIZE_LOGIN_INPUT, '');

    // NOTE: username is always lowercase and with no special characters
    // email is always lowercase
    // sanitize email
    const email = newUser?.email
      ?.replace(PATTERN_SANITIZE_LOGIN_INPUT, '')
      ?.toLowerCase();

    let username = (
      newUser?.username ||
      email?.replace(PATTERN_SANITIZE_EMAIL_DOMAIN, '') ||
      phone ||
      newUser?.name
    )
      ?.replace(PATTERN_SANITIZE_USERNAME, '')
      ?.toLowerCase();

    // autogenerate username
    if (createOptions?.usernameAutoGenerate) {
      username = await this.generateUsername(
        username,
        createOptions?.usernameFillerLength,
        buildGenerateUsernameOptions
      );
    }

    // NOTE: use username or email to generate available username
    const userCreateModel = {...newUser, phone, email, username};

    // validate user create model
    await this.validateModel(userCreateModel);

    // ensure when creating user,
    // lowercase email and username
    return super.create(userCreateModel, options);
  }

  public async update(
    userId: string,
    userUpdateModel: UserUpdateModel
  ): Promise<IUser> {
    await this.validateModel(userUpdateModel, userId);
    return super.update(userId, userUpdateModel);
  }

  /**
   * find users by _ids
   * @param _ids string []
   */
  public async findByIds(_ids: string[]) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else {
      workspace = this.getHeaderWorkspace();
    }

    const users = await this.userRepository.find({
      _id: {$in: _ids},
      workspaces: workspace
    });
    return users;
  }

  /**
   * find a user by _id
   */
  public async findById(_id: string): Promise<IUser> {
    // get current workspace or extract workspace from header
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    // override findById to use findOne that supports workspace interception
    return this.userRepository.findOne({_id, currentWorkspace: workspaceId});
  }

  /**
   * NOTE: for unique key validations before mongodb check
   * @param userModel
   * @param excludeId for update purpose
   */
  public async validateModel(
    userModel: UserUpdateModel | UserCreateModel,
    excludeUserId?: string
  ) {
    const {phone, email, username} = userModel;
    const excludeUsers = excludeUserId ? [excludeUserId] : [];
    if (
      phone &&
      (await this.isDuplicatePhone(phone, {
        excludeUsers,
        userTypes: userModel.userTypes
      }))
    ) {
      throw new BadRequestException({
        code: 'err_duplicated',
        payload: {key: 'key_phone'},
        field: 'phone'
      });
    }
    if (
      email &&
      (await this.isDuplicateEmail(email, {
        excludeUsers,
        userTypes: userModel.userTypes
      }))
    ) {
      throw new BadRequestException({
        code: 'err_duplicated',
        payload: {key: 'key_email'},
        field: 'email'
      });
    }
    if (
      username &&
      (await this.isDuplicateUsername(username, {
        excludeUsers,
        userTypes: userModel.userTypes
      }))
    ) {
      throw new BadRequestException({
        code: 'err_duplicated',
        payload: {key: 'key_username'},
        field: 'username'
      });
    }
  }

  public async findOneByMultipleStringFields(
    verifyInput: string
  ): Promise<IUser> {
    return this.findOne({
      verifyInput
    });
  }

  public async findUserActivationIssues(userId: string) {
    const user = await this.findById(userId);
    return user ? user.activationIssues : [];
  }

  public async findUserPreferences(userId: string) {
    const user = await this.findById(userId);
    return user.preferences;
  }

  public async isDuplicateEmail(
    email: string,
    options?: {
      userTypes?: string[];
      excludeUsers?: string[];
    }
  ): Promise<boolean> {
    const opts = {
      ...options
    };
    if (!email) return false;
    return (
      (await this.findOne({
        email: email?.toLowerCase(),
        isVerified: true,
        ...(opts.userTypes?.length ? {userTypes: opts.userTypes} : {}),
        ...(opts.excludeUsers?.length ? {not_ids: opts.excludeUsers} : {})
        // statuses: [UserStatus.ACTIVE, UserStatus.LOCKED],
      })) !== null
    );
  }

  public async isDuplicatePhone(
    phone: string,
    options?: {
      userTypes?: string[];
      excludeUsers?: string[];
    }
  ): Promise<boolean> {
    const opts = {
      ...options
    };
    if (!phone) return false;
    return (
      (await this.findOne({
        phone,
        // isVerified is determined by the contact and verified field
        isVerified: true,
        ...(opts.userTypes?.length ? {userTypes: opts.userTypes} : {}),
        ...(opts.excludeUsers?.length ? {not_ids: opts.excludeUsers} : {})
        // statuses: [UserStatus.ACTIVE, UserStatus.LOCKED],
      })) !== null
    );
  }

  public async isDuplicateUsername(
    username: string,
    options?: {
      userTypes?: string[];
      excludeUsers?: string[];
    }
  ): Promise<boolean> {
    const opts = {
      ...options
    };
    if (!username) return false;
    return (
      (await this.findOne({
        username: username?.toLowerCase(),
        isVerified: true,
        ...(opts.userTypes?.length ? {userTypes: opts.userTypes} : {}),
        ...(opts.excludeUsers?.length ? {not_ids: opts.excludeUsers} : {})
        // statuses: [UserStatus.ACTIVE, UserStatus.LOCKED],
      })) !== null
    );
  }

  // NOTE: should always return string value in lowercase
  public async generateUsername(
    baseName = '',
    fillerLength = 5,
    options?: {
      excludeNames?: string[];
      forceFiller?: boolean;
      incremental?: boolean;
    }
  ): Promise<string> {
    // define options
    const opts = {
      forceFiller: false,
      excludeNames: [],
      incremental: true,
      ...options
    };
    // clean basename to clear all characters and only keep alphanumeric value
    baseName = baseName.replace(PATTERN_SANITIZE_USERNAME, '').toLowerCase();
    // declare name candidate variable
    let nameCandidate: string;
    // if force filler false, check if baseName exists first
    if (!opts.forceFiller && baseName !== '') {
      // not force filler, so check if baseName
      // is duplicated first
      const isDuplicate = await this.isDuplicateUsername(baseName);
      // if not duplicated, just return the original baseName
      if (!isDuplicate) {
        return baseName;
      }
    }
    // if require incremental filler numbering
    if (opts.incremental) {
      // get the username with this starting and sort by it DESC
      const lastUser = await this.userRepository
        .findOne({
          username: new RegExp(`^${baseName}\\d{${fillerLength}}$`, 'i')
        })
        .sort({username: -1})
        .select('username');
      // if last user found
      if (lastUser) {
        // take its numbering
        const number =
          parseInt(
            lastUser.username.replace(new RegExp(baseName, 'i'), ''),
            10
          ) + 1;
        nameCandidate =
          baseName + number.toString().padStart(fillerLength, '0');
      } else {
        // if last user not found, you're the first one, so just return first
        // increment
        nameCandidate = baseName + '1'.padStart(fillerLength, '0');
      }
      // clean the name value again before return
      return nameCandidate.replace(PATTERN_SANITIZE_USERNAME, '').toLowerCase();
    }
    // keep generating name candidate until
    // excludeNames does not contain this name
    do {
      nameCandidate = baseName + this._generateRandomCode(fillerLength);
    } while (opts.excludeNames.some(n => n === nameCandidate));
    // check db if name exists
    const isDuplicate = await this.isDuplicateUsername(nameCandidate);
    // if name exists, call generate username again,
    // with extra added exclude names and force filler true
    return isDuplicate
      ? // it is duplicated, let's try again
        this.generateUsername(baseName, fillerLength, {
          // add this name to excludeNames since it is duplicated
          excludeNames: opts.excludeNames.concat([nameCandidate]),
          // this will always be true because if initially false,
          // it has already checked original baseName above
          forceFiller: true,
          // pass incremental options onward (although should always
          // be false if it reaches this point)
          incremental: opts.incremental
        })
      : // found our name! return it back
        // clean the name value again before return
        nameCandidate.replace(PATTERN_SANITIZE_USERNAME, '').toLowerCase();
  }

  public async generateUsernames(
    baseName: string,
    fillerLength = 5,
    options?: {
      count?: number;
      excludeNames?: string[];
      forceFiller?: boolean;
      incremental?: boolean;
    }
  ): Promise<string[]> {
    // define options
    const opts = {
      count: 5,
      excludeNames: [],
      ...options
    };
    // define usernames array
    const usernames = [];
    // go through each count, generate username and
    // add to usernames array
    for (let i = 0; i < opts.count; i++) {
      usernames.push(
        await this.generateUsername(baseName, fillerLength, {
          ...opts,
          excludeNames: opts.excludeNames.concat(usernames)
        })
      );
    }
    // return final list
    return usernames;
  }

  public async setUserStatus(
    userId: string,
    status: number,
    body
  ): Promise<IUser> {
    const user = this.getCurrentUser<IUser>();
    const updatedUser = await this.update(userId, {status});
    // TODO:: need to handle some notifications on active?
    const myWorkspace = await this.workspaceService.findById(
      user.currentWorkspace
    );

    // get hook
    const integration = myWorkspace.integrations.find(
      i => i.app === IntegrationAppType.EEOCN
    );
    let hook: WorkspaceHooks;
    if (status === UserStatus.ACTIVE) {
      hook = integration?.hooks?.find(h => h.code === 'RESTART_TEACHER');
    } else if (status === UserStatus.LOCKED) {
      hook = integration?.hooks?.find(h => h.code === 'STOP_TEACHER');
    }

    if (hook) {
      await this.hookToEEO(hook, myWorkspace, userId);
    }

    if (status === UserStatus.ACTIVE) {
      // TODO: this should be moved to auth service after auth and user dependency
      // correction
      const contactMethod = await this.authConfigService.getContactMethod(
        // FIXME: default to first one?
        updatedUser.userTypes[0],
        updatedUser.currentWorkspace.toHexString(),
        'userStatusActive'
      );
      switch (contactMethod.get('transportType')) {
        case AuthContactMethodType.SMS:
          (updatedUser?.verified as IUserVerified)?.phone &&
            (await this.notificationService.push({
              toUsers: [{user: updatedUser}],
              notificationMediaType: NotificationMediaType.SMS,
              body: contactMethod.get('smsMessage'),
              data: {
                screen: '',
                parameters: {
                  ...contactMethod.get('transportParameters')
                }
              }
            }));
          break;
        case AuthContactMethodType.EMAIL:
          (updatedUser?.verified as IUserVerified)?.email &&
            (await this.notificationService.push({
              toUsers: [{user: updatedUser}],
              notificationMediaType: NotificationMediaType.EMAIL,
              title: contactMethod.get('emailTitle'),
              data: {
                screen: contactMethod.get('emailTemplate'),
                parameters: {
                  ...contactMethod.get('transportParameters'),
                  t_title: contactMethod.get('emailTitle'),
                  t_message: contactMethod.get('emailMessage')['default']
                }
              }
            }));
          break;
      }
    }
    // if pushNotification  userStatusUpdate == true, will push notification to user when status updated
    if (myWorkspace?.preferences?.pushNotification?.userStatusUpdate) {
      const locale = this.getLocale();
      // send to driver to notify them they are activated
      await this.notificationService.push({
        toUsers: [{user: updatedUser}],
        toDevices: [],
        title:
          status === UserStatus.ACTIVE
            ? locale.tAll('msg_account_activated')
            : locale.tAll('msg_account_deactivate'),
        body: body?.reason
          ? {
              en: body?.reason,
              'zh-cn': body?.reason,
              'zh-hk': body?.reason
            }
          : {},
        data: {
          screen: PushNotificationMerchantScreenType.USER_PROFILE,
          parameters: {userId: updatedUser._id.toHexString()}
        },
        notificationMediaType: NotificationMediaType.MOBILE
      });
    }

    return updatedUser;
  }

  public async updateUserActivationIssue(
    userId: string,
    activationIssue: UserActivationIssueUpdateModel
  ): Promise<IUser> {
    const user = await this.findById(userId);
    return this.update(userId, {
      activationIssues: user.activationIssues.map(ai => ({
        ...ai,
        _id: ai._id.toHexString(),
        ...(ai._id.toHexString() === activationIssue._id ? activationIssue : {})
      }))
    });
  }

  public async updateUserActivationIssues(
    userId: string,
    activationIssues: UserActivationIssueUpdateModel[]
  ): Promise<IUser> {
    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();
    const user = await this.userRepository.findOne({
      _id: userId,
      workspaces: {$in: [workspaceId]}
    });
    const newActivationIssuesList = user.toJSON().activationIssues.map(ai => {
      const foundIndex = activationIssues.findIndex(
        a => a._id === (ai._id as ObjectId).toHexString()
      );
      return foundIndex > -1 ? {...ai, ...activationIssues[foundIndex]} : ai;
    });
    return this.update(userId, {
      activationIssues: newActivationIssuesList
    });
  }

  public async updateAllUserActivationIssueStatus(
    userId: string,
    status: number
  ) {
    const user = await this.findById(userId);
    return this.update(userId, {
      activationIssues: user.activationIssues.map(ai => ({
        ...ai,
        _id: ai._id.toHexString(),
        status
      }))
    });
  }

  public async updateUserActivationIssueStatus(
    userId: string,
    activationIssueId: string,
    status: number
  ) {
    return this.updateUserActivationIssue(userId, {
      _id: activationIssueId,
      status
    });
  }

  /**
   * update User activation issues status from some statue to targetStatus
   * @param userId         user id
   * @param currentStatus  current status
   * @param targetStatus   target status
   * @param isNotify       need to notify admin  (boolean)
   */
  public async updateUserActivationIssueStatusFromCurrentStatus(
    userId: string,
    currentStatus: number,
    targetStatus: number,
    isNotify = false
  ) {
    const user = await this.findById(userId);

    const updatedUser = await this.update(userId, {
      activationIssues: user.toJSON().activationIssues.map(ai => ({
        ...ai,
        _id: (ai._id as ObjectId).toHexString(),
        status: ai.status === currentStatus ? targetStatus : ai.status
      }))
    });
    if (isNotify) {
      const locale = this.getLocale();
      const first = user?.firstName ?? '';
      const last = user?.lastName ?? '';
      const name =
        first && last ? `${first} ${last}` : first || last || user?.username;
      this.sendAdminEmail(
        'email/reviewActivationIssue.ejs',
        locale.tAll('email_reviewActivationIssue_title'),
        {
          t_message: locale.tAll('email_reviewActivationIssue_message', [
            `${name} - ${user?.phone}`
          ]),
          client: user
        }
      );
    }
    return updatedUser;
  }

  public async findLoginUsers() {
    //TODO: login users match query
  }

  public async toggleUserNotificationPreference(
    userId: string,
    isEnabled: boolean
  ) {
    const user = await this.findById(userId);
    return this.update(userId, {
      preferences: {...user.preferences, receiveNotification: isEnabled}
    });
  }

  /**
   * hook to eeo
   * @param hook          workspace hook
   * @param workspace     workspace
   * @param userId        user id
   */
  public async hookToEEO(
    hook: WorkspaceHooks,
    workspace: Workspace,
    userId: string
  ) {
    const hookHeaders =
      hook.headers?.reduce<any>(
        (obj, {key, value}) => ({...obj, [key]: value}),
        {}
      ) || {};
    const response = await this.httpService
      .put(
        `${hook.url}${userId}`,
        {},
        {
          headers: {
            ...getEEOAuthHeader(workspace.secret),
            ...hookHeaders,
            workspace: workspace._id.toHexString()
          }
        }
      )
      .toPromise();
    return response;
  }

  /**
   * add user to AC group
   * @param userId user Id
   * @param acGroups group Ids
   * @param config notification configuration obj
   */
  public async addUserToAcGroups(
    userId: string,
    acGroups: string[],
    config?: {notificationTypes?: string[]; notify?: boolean}
  ) {
    this.acService.addUserToAcGroups(userId, acGroups);
    if (config?.notify) {
      // configure the notification settings here
      const notifyBy = config?.notificationTypes || [
        NotificationMediaType.EMAIL
      ];
      await this.prepUserACChangeNotification(
        notifyBy,
        [userId],
        UserAccessUpdateType.ADD
      );
    }
  }

  public async removeUserFromAcGroups(
    userId: string,
    acGroups: string[],
    config?: {notificationType?: string[]; notify?: boolean}
  ) {
    this.acService.removeUserFromAcGroups(userId, acGroups);
    if (config?.notify) {
      // configure the notification settings here
      const notifyBy = config?.notificationType || [
        NotificationMediaType.EMAIL
      ];
      await this.prepUserACChangeNotification(
        notifyBy,
        [userId],
        UserAccessUpdateType.DELETE
      );
    }
  }

  public async prepUserACChangeNotification(
    notificationTypes: string[],
    userIds: string[],
    updateType: UserAccessUpdateType
  ) {
    const locale = new Locale();
    const users = await this.findByIds(userIds);
    const toUsers = users?.map(u => ({
      user: u
    }));
    if (
      notificationTypes?.includes(NotificationMediaType.MOBILE) &&
      toUsers.length
    ) {
      // send an immediate notification to mobile and SMS
      await this.notificationService.push({
        senders: [],
        toUsers,
        notificationMediaType: NotificationMediaType.MOBILE,
        title: locale.tAll('display_access_change_title'),
        // NOTE: body is only required for push notification mobile
        body:
          updateType === UserAccessUpdateType.ADD
            ? locale.tAll('msg_user_access_added')
            : locale.tAll('msg_user_access_removed'),
        // fill in later if required to redirect to certain mobile screen
        data: {
          screen: '',
          parameters: {
            // no params
          }
        }
      });
    }
    if (
      notificationTypes?.includes(NotificationMediaType.EMAIL) &&
      toUsers.length
    ) {
      await this.notificationService.push({
        notificationMediaType: NotificationMediaType.EMAIL,
        toUsers,
        title: locale.tAll('display_access_change_title'),
        data: {
          screen: 'email/accessUpdate.ejs',
          parameters: {
            t_email_content:
              updateType === UserAccessUpdateType.ADD
                ? locale.tAll('msg_user_access_added')
                : locale.tAll('msg_user_access_removed'),
            t_greeting: {
              id: 'email_greeting',
              values: ['$user.name']
            }
          }
        }
      });
    }
  }

  public async sendAdminEmail(
    templatePath: string,
    title: {[key: string]: string},
    parameters: {[key: string]: any}
  ) {
    // get all admin emails
    const userIds = await this.acService.getUserIdsByActions([
      'Registration:ReceiveNotification'
    ]);
    const users: any =
      userIds?.length > 0 ? await this.find({_ids: userIds}, {lean: true}) : [];
    // should pass the headerWorspace for notification email workspace
    // for the correct workspace info on email as admin can have
    // access to multiple workspace and currentWorkspace might not be
    // the same as the workspace in the header of ongoing request
    const headerWorkspace = this.getHeaderWorkspace();
    // send to emails
    users?.length > 0 &&
      (await this.notificationService.push({
        toUsers: users?.map(u => ({
          user: {
            ...u,
            currentWorkspace: new ObjectId(
              headerWorkspace || u.currentWorkspace
            )
          }
        })),
        notificationMediaType: NotificationMediaType.EMAIL,
        title,
        data: {
          screen: templatePath,
          parameters
        }
      }));
  }

  public async getGroupsByActions(actions: string[]) {
    const groups = await this.acService.getGroupsByActions(actions);
    return groups;
  }
}
