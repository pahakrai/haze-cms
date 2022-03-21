import {Injectable, Scope, Inject, HttpService} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import moment from 'moment';
import {ObjectId} from 'mongodb';
import {PaginateResult, CursorPaginateOptions} from 'mongoose';

import {
  BaseCRUDService,
  BadRequestException,
  processUpload,
  extractPaginateOptions,
  NotFoundException,
  getEEOAuthHeader,
  FileInfo
} from 'src/core';
import common from '@golpasal/common';

// services
import {BlobService} from '../File/Blob';
import {UserService, IUser} from '../User';
import {AuthService} from '../Auth/auth.service';
import {AddressService} from '../Address/address.service';
import {WorkspaceService} from '../Workspace/workspace.service';
import {WorkspaceTypeService} from '../WorkspaceType/workspaceType.service';

// interfaces & models
import {
  MemberCreateModel,
  MemberUpdateModel,
  MemberSearchModel,
  MemberUserModel,
  MemberUserUpdateModel
} from './models';
import {
  AddressCreateModel,
  AddressSearchModel,
  AddressUpdateModel
} from '../Address/models';
import {MemberFilesModel} from './models';
import {MemberCountModel} from './models/member.count.model';
import {FileModel, AnalyticsDataModel} from 'src/core/models';
import {FileMeta} from '../File/FileMeta';
import {Member, MemberModel} from './interfaces';
import {Workspace, WorkspaceHooks} from '../Workspace/interfaces/index';
const {UserType, IntegrationAppType} = common.type;

const USER_PROJECT = '_user';

@Injectable({scope: Scope.REQUEST})
export class MemberService extends BaseCRUDService<
  Member,
  MemberCreateModel,
  MemberUpdateModel,
  MemberSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Members') private readonly memberRepository: MemberModel,
    private readonly authService: AuthService,
    private readonly blobService: BlobService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly workspaceService: WorkspaceService,
    private readonly workspaceTypeService: WorkspaceTypeService,
    private readonly addressService: AddressService
  ) {
    super(memberRepository, request);
    this.countTotalMember = this.countTotalMember.bind(this);
  }

  public _castQuery(searchModel: MemberSearchModel) {
    const queryAnd = [];
    const {
      user,
      createdAtFr,
      createdAtTo,
      tags,
      categories,
      locations,
      employmentTypes,
      isHandleBy
    } = searchModel;

    const utcOffset = this.getUTCOffset();

    if (user) {
      queryAnd.push({user: new ObjectId(user)});
    }

    if (Array.isArray(tags) && tags.length > 0) {
      queryAnd.push({
        'preferences.tags': {$in: tags}
      });
    }

    if (Array.isArray(employmentTypes) && employmentTypes.length > 0) {
      queryAnd.push({
        'preferences.employmentTypes': {$in: employmentTypes}
      });
    }

    if (Array.isArray(locations) && locations.length > 0) {
      queryAnd.push({
        'preferences.locations': {$in: locations.map(l => new ObjectId(l))}
      });
    }

    if (Array.isArray(categories) && categories.length > 0) {
      queryAnd.push({
        'preferences.categories': {$in: categories.map(c => new ObjectId(c))}
      });
    }

    if (createdAtFr) {
      queryAnd.push({
        createdAt: {
          $gte: moment(createdAtFr).utcOffset(utcOffset).startOf('day').toDate()
        }
      });
    }

    if (createdAtTo) {
      queryAnd.push({
        createdAt: {
          $lte: moment(createdAtTo).utcOffset(utcOffset).endOf('day').toDate()
        }
      });
    }
    if (isHandleBy !== undefined) {
      queryAnd.push({
        ['meta.handledBy']: {
          $exists: isHandleBy
        }
      });
    }

    return queryAnd.length > 0 ? {$and: queryAnd} : {};
  }

  public async findOne(query: MemberSearchModel) {
    const member = await super.findOne(query);
    if (member) {
      const result = await this._populate(member, ['user']);
      // get current workspace or extract workspace from header
      const currentUser = this.getCurrentUser();
      const workspaceId = currentUser?.currentWorkspace
        ? currentUser?.currentWorkspace?.toHexString()
        : this.getHeaderWorkspace();
      // NOTE: as the member and user is one to one, fetch the data and populate
      // data.user to match the workspace
      const condition =
        (result.user as IUser).currentWorkspace.toHexString() === workspaceId;
      return condition ? member : undefined;
    } else {
      return undefined;
    }
  }

  public _lookupQuery(searchModel: MemberSearchModel) {
    let queryAnd = [];
    const {q} = searchModel;

    // get current workspace or extract workspace from header
    const currentUser = this.getCurrentUser();
    const workspaceId = currentUser?.currentWorkspace
      ? currentUser?.currentWorkspace?.toHexString()
      : this.getHeaderWorkspace();

    if (q) {
      const regQ = new RegExp(q, 'i');
      queryAnd.push({
        $or: [
          ...(ObjectId.isValid(q) ? [{_id: new ObjectId(q)}] : []),
          // user query search
          {[`${USER_PROJECT}.username`]: regQ},
          {[`${USER_PROJECT}.email`]: regQ},
          {[`${USER_PROJECT}.lastName`]: regQ},
          {[`${USER_PROJECT}.firstName`]: regQ},
          {[`${USER_PROJECT}.phone`]: regQ},
          {[`${USER_PROJECT}.name`]: regQ},
          {[`${USER_PROJECT}.description`]: regQ}
        ]
      });
    }

    if (workspaceId) {
      queryAnd.push({
        [`${USER_PROJECT}.workspaces`]: new ObjectId(workspaceId)
      });
    }

    // merge with _castQuery
    const _query = this._castQuery(searchModel);
    if (_query?.$and?.length) {
      queryAnd = [..._query.$and, ...queryAnd];
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  // Override
  public async find(searchModel: MemberSearchModel): Promise<Array<Member>> {
    const conditions = this._lookupQuery(searchModel);
    const aggregate = this.memberRepository
      .aggregate()
      .lookup({
        from: 'Users',
        localField: 'user',
        foreignField: '_id',
        as: USER_PROJECT
      })
      .unwind(`$${USER_PROJECT}`)
      .match(conditions)
      .project({[USER_PROJECT]: false});

    if (searchModel?.sort) {
      aggregate.sort(searchModel?.sort);
    }

    return aggregate.exec();
  }

  public async findWithCursorPaginate(
    searchModel: MemberSearchModel,
    options: CursorPaginateOptions
  ) {
    const conditions = this._lookupQuery(searchModel);

    return this.memberRepository.cursorPaginate(
      [
        {
          $loopup: {
            from: 'Users',
            localField: 'user',
            foreignField: '_id',
            as: USER_PROJECT
          }
        },
        {
          $unwind: `$${USER_PROJECT}`
        },
        {
          $match: conditions
        },
        {
          $project: {[USER_PROJECT]: false}
        }
      ],
      options
    );
  }

  public async findWithPaginate(
    searchModel: MemberSearchModel
  ): Promise<PaginateResult<Member>> {
    const conditions = this._lookupQuery(searchModel);
    const paginateOptions = extractPaginateOptions(searchModel);
    // post lookup conditions considering lookups
    const where = [
      {
        $lookup: {
          from: 'Users',
          localField: 'user',
          foreignField: '_id',
          as: USER_PROJECT
        }
      },
      {$unwind: `$${USER_PROJECT}`},

      {$match: conditions}, // post lookup conditions here
      {$project: {[USER_PROJECT]: false}}
    ];
    return this.memberRepository.paginate(where, paginateOptions);
  }

  /**
   * signup member to require token specially for mobile
   * @param model MemberUserModel obj
   * @param files MemberFiles obj with type and files
   */
  public async signUp(
    model: MemberUserModel,
    files?: MemberFilesModel,
    opts?: {sendPasscode: boolean}
  ) {
    // for admin create user
    const currentUser = this.getCurrentUser();
    // get current workspace from header
    const currentWorkspace =
      currentUser?.currentWorkspace || this.getHeaderWorkspace();
    // might be signup or just user create currently use signup
    const {user, auth} = await this.authService.signUp(
      {
        ...model.user,
        currentWorkspace: currentWorkspace || model?.user?.currentWorkspace,
        workspaces: currentWorkspace ? [currentWorkspace] : [],
        userTypes: [UserType.MEMBER]
      },
      {
        usernameAutoGenerate: true,
        sendPasscode: opts?.sendPasscode
      }
    );
    const userId = user && user._id.toString();

    // generate user token
    const userToken = await this.authService.generateUserToken(
      user,
      model?.user?.password,
      user?.userTypes,
      {
        auth
      }
    );

    // create model with user id and vehicle
    const createModel: MemberCreateModel = {
      user: userId,
      ...model?.member
    };

    // create new member
    const newMember = await this.createMember(createModel, files);

    // for auth purposes return user with token as well
    return {user, member: newMember, userToken};
  }

  /**
   * create user can work directly from admin
   * @param createModel MemberCreateModel obj
   * @param files MemberFiles obj with type and files
   */
  public async createMember(
    createModel: MemberCreateModel,
    files?: MemberFilesModel
  ): Promise<Member> {
    // NOTE: prepare order of files by dynamic file types
    const memberFileMetas: Array<FileModel> = await this.filesUpload(files);
    const prepCreateModel: MemberCreateModel = {
      ...createModel,
      ...(memberFileMetas?.length && {
        files: memberFileMetas
      })
    };
    return this.create(prepCreateModel);
  }

  /**
   * create eeo student for member
   * @param userid  user id
   * @param memberid member id
   * @param phoneNo  student account
   * @param name     student name
   * @param password teacher password (will use md5 encryption in map api)
   */
  public async createStudentToEEO(
    hook: WorkspaceHooks,
    workspace: Workspace,
    userid: string,
    memberid: string,
    phoneRegionCode: string,
    phoneNo: string,
    name: string,
    password: string
  ) {
    const hookHeaders =
      hook.headers?.reduce<any>(
        (obj, {key, value}) => ({...obj, [key]: value}),
        {}
      ) || {};
    // call hook api
    const result = await this.httpService
      .post(
        hook.url,
        {
          userId: userid,
          memberId: memberid,
          phoneRegionCode: phoneRegionCode,
          studentAccount: phoneNo,
          studentName: name,
          password: password
        },
        {
          headers: {
            ...getEEOAuthHeader(workspace.secret),
            ...hookHeaders,
            workspace: workspace._id.toHexString()
          }
        }
      )
      .toPromise();
    return result;
  }

  /**
   * update by userId
   * @param userId
   * @param memberUpdateModel
   */
  public async findByUserIdAndUpdate(
    userId: string,
    memberUpdateModel: MemberUpdateModel,
    memberFiles?: MemberFilesModel
  ): Promise<Member> {
    let member = await this.findOne({user: userId});
    if (member) {
      member = await this.updateMember(
        member?._id?.toHexString(),
        memberUpdateModel,
        memberFiles
      );
    }
    return member;
  }

  /**
   * update user and member
   * @param member id string
   * @param model MemberUserUpdateModel obj
   * @param files MerchantFiles obj with type and files
   */
  public async updateUserMember(
    memberId: string,
    model: MemberUserUpdateModel,
    files?: MemberFilesModel
  ) {
    const merchant: Member = await this.findById(memberId);
    // update the merchant user
    const updatedUser: IUser = await this.userService.update(
      (merchant?.user as ObjectId).toHexString(),
      {
        ...model.user
      }
    );

    // create model for merchnat update
    const updateMerchantModel: MemberUpdateModel = {...model?.member};

    // update merchant
    const updatedMerchant: Member = await this.updateMember(
      memberId,
      updateMerchantModel,
      files
    );

    const currentUser = this.getCurrentUser();
    // get current workspace from header
    const currentWorkspace =
      currentUser?.currentWorkspace || this.getHeaderWorkspace();
    const myWorkspace = await this.workspaceService.findById(currentWorkspace);

    // get hook
    const integration = myWorkspace.integrations.find(
      i => i.app === IntegrationAppType.EEOCN
    );
    const hook = integration?.hooks?.find(h => h.code === 'UPDATE_STUDENT');

    if (hook) {
      await this.updateStudentToEEO(
        hook,
        myWorkspace,
        merchant?.user.toString(),
        memberId,
        model?.user?.phoneRegionCode,
        model?.user?.phone,
        model?.user?.username
      );
    }

    return {user: updatedUser, merchant: updatedMerchant};
  }

  /**
   * update member
   * @param id Member id
   * @param updateModel MemberUpdateModel obj
   * @param files MemberFiles obj with type and files
   */
  public async updateMember(
    memberId: string,
    updateModel: MemberUpdateModel,
    files?: MemberFilesModel
  ): Promise<Member> {
    const member: Member = await this.findById(memberId);
    if (!member) {
      throw new BadRequestException({code: 'err_member_not_found'});
    }

    // NOTE: prepare order of files by dynamic file types emtyp array for default
    const memberFileMetas: Array<FileModel> = await this.filesUpload(files);

    // type conversion for old member files
    const prevFiles: Array<FileModel> = member?.files?.map(f => ({
      fileType: f.fileType,
      file: (f.file as ObjectId).toHexString(),
      isVerified: f.isVerified
    }));
    const prepUpdateModel: MemberUpdateModel = {
      ...updateModel,
      ...(memberFileMetas?.length
        ? {
            files: [...memberFileMetas, ...(updateModel?.files || prevFiles)]
          }
        : {
            // keeps old record or record of doc id from the updatemodel
            files: updateModel?.files || prevFiles
          })
    };

    // TODO: delete old docs
    // delete old docs

    return this.update(memberId, prepUpdateModel);
  }

  /**
   * update eeo student for member
   * @param userid        user id
   * @param memberid      member id
   * @param phoneRegionCode  user phoneRegionCode
   * @param phoneNo       user phoneNo
   * @param name          student name
   */
  public async updateStudentToEEO(
    hook: WorkspaceHooks,
    workspace: Workspace,
    userid: string,
    memberid: string,
    phoneRegionCode: string,
    phoneNo: string,
    name: string
  ) {
    const hookHeaders =
      hook.headers?.reduce<any>(
        (obj, {key, value}) => ({...obj, [key]: value}),
        {}
      ) || {};
    const respone = await this.httpService
      .put(
        `${hook.url}${memberid}`,
        {
          userId: userid,
          memberId: memberid,
          studentName: name,
          phoneRegionCode: phoneRegionCode,
          studentAccount: phoneNo
        },
        {
          headers: {
            ...getEEOAuthHeader(workspace.secret),
            ...hookHeaders,
            workspace: workspace._id.toHexString()
          }
        }
      )
      .toPromise();

    return respone;
  }

  /**
   * update image documents to member
   * @param userId userId of member
   * @param fileType member fileType
   * @param filesObj file info object
   */
  public async updateMemberDocs(
    userId: string,
    fileType: string,
    filesObj: {type: 'ReactNative' | 'FormData'; files: Array<any>}
  ): Promise<any> {
    const member = await this.findOne({user: userId});
    const fileMetas = await this.prepareFileMetas(
      filesObj?.files,
      filesObj?.type
    );
    const memberFiles = fileMetas?.map(fm => ({
      fileType,
      file: fm?._id?.toHexString(),
      isVerified: false
    }));

    return this.update(member?._id?.toHexString(), {
      files: [...memberFiles, ...member?.files]
    });
  }

  /**
   * arrange documents and the files by file types and given meta info by
   * sequential array of images
   * @param filesInfo
   * @param files
   * @param fileType is enum of ReactNative | FormData
   */
  public async arrangeDocsByFileInfo(
    filesInfo: Array<FileInfo>,
    files: Array<any>,
    fileType: 'ReactNative' | 'FormData' // currently only for ReactNative
  ) {
    // NOTE: structured files with info before create or update
    const fileStructured = (filesInfo || []).reduce<{
      member?: any; // NOTE: any as the file type records are from workspaceType
      user?: any;
    }>(
      (accObj, file: FileInfo, fileIndex: number) => {
        // ie. accObj -> member -> registrationDocs
        if (!accObj[file.userType][file.fileType]) {
          accObj[file.userType][file.fileType] = [];
        }
        accObj[file.userType][file.fileType].push(files[fileIndex]);
        return accObj;
      },
      {
        member: {type: fileType},
        user: {type: fileType}
      }
    );
    return fileStructured;
  }

  /**
   * ready the files data for the collection
   * @param files
   * @param userType
   * @param workspace workspace id
   * @param workspaceType userType and workspaceType for workspaceType file types
   */
  public async filesUpload(
    files: any, // object of any with type { type: string, [fileType]: Array<files>}
    userType?: string,
    workspace?: string
  ) {
    let memberFileMetas: Array<FileModel> = [];
    if (files) {
      // NOTE: get workspace id
      const currentUser = this.getCurrentUser();
      const workspaceId =
        currentUser?.currentWorkspace?.toHexString() ||
        this.getHeaderWorkspace() ||
        workspace;
      if (workspaceId) {
        const workspaceTypeFiles =
          await this.workspaceTypeService.getRequirements(
            UserType.MEMBER || userType, // always member on this service
            'files'
          );
        const fileTypes = workspaceTypeFiles?.files?.map(f => f.fileType);
        await Promise.all(
          fileTypes?.map(async ft => {
            if (files[ft]) {
              const regDocsFileMetas = await this.prepareFileMetas(
                files[ft],
                files?.type // React native or formdata
              );
              memberFileMetas = memberFileMetas?.concat(
                regDocsFileMetas?.map(fm => ({
                  fileType: ft,
                  file: fm._id?.toHexString(),
                  isVerified: false
                }))
              );
            }
          })
        );
      }
    }
    return memberFileMetas;
  }

  /**
   * upload images to s3
   * @param files
   * @param type 'ReactNative' | 'FormData'
   */
  public async prepareFileMetas(
    files: any[],
    type: 'ReactNative' | 'FormData'
  ): Promise<any> {
    let uploadedFiles = files || [];
    // if react native file upload locally first
    if (type === 'ReactNative') {
      uploadedFiles = await Promise.all(
        files.map(f => processUpload(f)) // local upload
      );
    }
    if (uploadedFiles.length === 0) {
      return [];
    }
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    const fileMetas: Array<FileMeta> = await this.blobService.uploadFiles(
      uploadedFiles,
      `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`
    );
    return fileMetas;
  }

  public async getMemberStats(type: string, query?: MemberSearchModel) {
    const data: AnalyticsDataModel = {};
    switch (type) {
      case 'MEMBER_COUNT':
        data.total = await this.getMemberCount(query);
        break;
      case 'MEMBER_COUNT_USER_STATUS':
        data.total = await this.getMemberCountByUserStatus(query);
        break;
      default:
        throw new NotFoundException({
          code: 'data__not_exists'
        });
    }
    return data;
  }

  public async getMemberCountByUserStatus(
    query: MemberSearchModel = {}
  ): Promise<number> {
    const {userStatuses}: MemberSearchModel = query;
    const condition = {
      'memberUser.status': {$in: userStatuses || []}
    };
    return this.getMemberCount(condition);
  }

  public async getMemberCount(query = {}): Promise<number> {
    const user = this.getCurrentUser<IUser>();
    const workspace = user?.currentWorkspace
      ? user.currentWorkspace.toHexString()
      : this.getHeaderWorkspace();
    const members = await this.repository
      .aggregate()
      .lookup({
        from: 'Users',
        localField: 'user',
        foreignField: '_id',
        as: 'memberUser'
      })
      // filter only cans for the current workspace
      .match({
        ...query,
        'memberUser.workspaces': {$in: [new ObjectId(workspace)]}
      });

    return members?.length;
  }

  _castCount(countModel: MemberCountModel) {
    let workspace: string;
    const query: any = {$and: []};
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (countModel.workspace) {
      workspace = countModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    if (workspace) {
      query.$and.push({workspace: workspace ? workspace : null});
    }
    if (!query.$and.length) delete query.$and;
    return query;
  }

  /**
   * statistics member adapter
   * @param statusArry
   */
  async statisticsMember(type: string, conditions: MemberCountModel) {
    const action = {
      COUNT_TOTAL_MEMBERS: this.countTotalMember
    };
    if (action[type]) {
      return action[type](conditions);
    } else {
      throw new BadRequestException({code: 'not_type_you_call'});
    }
  }

  /**
   * count member by currentWorkspace
   * @param countModel
   */
  async countTotalMember(countModel: MemberCountModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (countModel.workspace) {
      workspace = countModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    const lookup = {
      from: 'Users',
      localField: 'user',
      foreignField: '_id',
      as: 'memberUser'
    };
    const match = {
      $and: [
        {'memberUser.workspaces': {$in: [new ObjectId(workspace)]}},
        {'memberUser.isVerified': true}
      ]
    };
    const res = await this.memberRepository
      .aggregate()
      .lookup(lookup)
      .match(match)
      .count('total_member');
    return res[0]?.total_member ?? 0;
  }

  public async findMemberIdByUserId(userId: string): Promise<string> {
    const member = await this.findOne({user: userId});
    return member?._id?.toHexString() || null;
  }

  /**
   * NOTE: from here onwards these are address methods
   * create address of user by userId
   * @param addressModel
   * @param addressCreateModel
   */
  async createAddressByUserId(
    userId: string,
    addressModel: AddressCreateModel
  ) {
    const memberId = await this.findMemberIdByUserId(userId);
    const addresses = await this.addressService.find({
      refType: 'Members',
      ref: memberId
    });
    if (addressModel?.isDefault && addresses?.length > 0) {
      await this.addressService.updateMany(
        {
          refType: 'Members',
          ref: await this.findMemberIdByUserId(userId),
          isDefault: true
        },
        {isDefault: false}
      );
    }
    return this.addressService.create({
      ...addressModel,
      isDefault:
        addresses?.length === 0 ? true : addressModel?.isDefault || false,
      refType: 'Members',
      ref: memberId
    });
  }

  /**
   * get all address of user by userId
   * @param userId
   * @param addressSearchModel
   */
  async getAddressByUserId(userId: string, addressModel: AddressSearchModel) {
    return this.addressService.find({
      ...(addressModel || {}),
      refType: 'Members',
      ref: await this.findMemberIdByUserId(userId)
    });
  }

  /**
   * set default address of user
   * @param userId
   * @param addressId
   * @param addressSearchModel
   */
  async setDefaultAddress(
    userId: string,
    addressId: string,
    query?: AddressSearchModel
  ) {
    const updatedQuery = query || {};
    return this.updateAddressByUserId(
      userId,
      addressId,
      {isDefault: true},
      updatedQuery
    );
  }

  /**
   * set default address of user
   * @param userId
   * @param addressId
   * @param addressUpdateModel
   */
  async updateAddressByUserId(
    userId: string,
    addressId: string,
    updateModel: AddressUpdateModel,
    query?: AddressSearchModel
  ) {
    const updatedQuery = query || {};
    const memberId = await this.findMemberIdByUserId(userId);
    const address = await this.addressService.findOne({
      ...updatedQuery,
      ref: memberId,
      refType: 'Members',
      _id: addressId
    });
    if (!address) {
      // throw error here
      return;
    }
    if (updateModel?.isDefault) {
      await this.addressService.updateMany(
        {
          refType: 'Members',
          ref: memberId,
          isDefault: true
        },
        {isDefault: false}
      );
    }
    return this.addressService.update(addressId, {...(updateModel || {})});
  }

  /**
   * set default address of user
   * @param userId
   * @param addressId
   * @param addressSearchModel
   */
  async deleteAddressByAddressId(
    userId: string,
    addressId: string,
    query?: AddressSearchModel
  ) {
    const updatedQuery: any = query || {};
    const memberId = await this.findMemberIdByUserId(userId);
    const address = await this.addressService.findOne({
      ...updatedQuery,
      ref: memberId,
      refType: 'Members',
      _id: addressId
    });
    if (!address) {
      // throw error here
      return;
    }
    const result = await this.addressService.delete(addressId);
    if (address?.isDefault) {
      await this.addressService.findOneAndUpdate(
        {
          ...updatedQuery,
          refType: 'Members',
          ref: memberId
        },
        {isDefault: true}
      );
    }
    return result;
  }

  /**
   * requirements by workspacetype and userType
   */
  async getRequirements(requirementType?: string, changeLocale?: boolean) {
    const chgLocale = changeLocale || false; // default false
    const requiredFiles = await this.workspaceTypeService.getRequirements(
      UserType.MEMBER,
      requirementType
    );
    if (chgLocale) {
      const locale = this.getLocale();
      this._mapToDisplay(requiredFiles, locale.getLanguage() || 'en');
    }
    return requiredFiles;
  }

  async validateModel(memberModel: MemberCreateModel | MemberUpdateModel) {
    // NOTE: can add the programmatic validation requirements here
    const valid = true;
    // validates the data requirements (eg: files, meta) by the workspace and workspace type
    await this.workspaceTypeRequirementValidation(memberModel);
    return valid;
  }

  async workspaceTypeRequirementValidation(
    memberModel: MemberCreateModel | MemberUpdateModel
  ) {
    let valid = true;
    let err_code: string;
    const requirements = await this.workspaceTypeService.getRequirements(
      UserType.MEMBER
    );
    // NOTE: can be added for file requirements as well
    if (
      requirements?.meta?.length > 0 &&
      memberModel?.meta &&
      Object.keys(memberModel?.meta)?.length > 0
    ) {
      const metaRequirements = requirements?.meta?.map(req => req?.data);
      valid = Object.keys(memberModel?.meta).every(key =>
        metaRequirements.includes(key)
      );
      err_code = 'err_meta_requirement_invalid';
    }
    if (!valid) {
      // throw error here with err_key
      throw new BadRequestException({code: err_code});
    }
    return valid;
  }

  /**
   * get member by user id
   * @param userId  user id
   */
  async memberByUserId(userId: string) {
    const result = await this.memberRepository.findOne({user: userId});
    return result;
  }

  public async toggleShowAvgFeedback() {
    const user = this.getCurrentUser<IUser>();
    const member = await this.memberRepository
      .findOne({user: user._id})
      .lean()
      .exec();

    if (!member) {
      throw new BadRequestException({code: 'err_member_not_found'});
    }

    // toggle showAvgFeedback
    return this.update(
      member._id,
      {
        'preferences.showAvgFeedback': !member.preferences.showAvgFeedback
      },
      {lean: true}
    );
  }

  /**
   * member signup/login through twilio verification
   *
   * @param model phone and verify code
   */
  public async loginMessagingMember(model: {
    phone: string;
    verifyCode: string;
    phoneRegionCode: string;
  }) {
    // handle login/signup in auth service
    const loginResult = await this.authService.loginMessaging({
      ...model,
      userType: UserType.MEMBER
    });

    // find member by user id
    const member = await this.findMemberIdByUserId(
      loginResult.user._id.toHexString()
    );

    if (!member) {
      // member not exist(signup flow), create new member for the user
      await this.create({user: loginResult.user._id.toHexString()});
    }

    // return user token
    return loginResult;
  }
}
