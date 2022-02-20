import {Injectable, Scope} from '@nestjs/common';
import common from '@golpasal/common';
import {BadRequestException, processUpload, NotFoundException} from 'src/core';

// interfaces & models
import {MemberSearchModel} from '../Member/models';

import {UserProfileUpdateModel, UserProfileFiles} from './models';
import {IUserProfile} from './interfaces';
import {FileMeta} from '../File/FileMeta';
import {Member} from '../Member/interfaces';

import {BlobService} from '../File/Blob';
import {MemberService} from '../Member/member.service';
import {IUser, UserSearchModel, UserService} from '../User';
import {WorkspaceService} from '../Workspace/workspace.service';
import {WorkspaceTypeService} from '../WorkspaceType/workspaceType.service';
import {UserCreditService} from '../UserCredit/userCredit.service';

const {UserType, IntegrationAppType, AmountType} = common.type;

@Injectable({scope: Scope.REQUEST})
export class UserProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly memberService: MemberService,
    private readonly workspaceService: WorkspaceService,
    private readonly workspaceTypeService: WorkspaceTypeService,
    private readonly blobService: BlobService,
    private readonly userCreditService: UserCreditService
  ) {}
  /**
   * get user profile
   * @param userId
   */
  public async getUserProfile(
    userId: string,
    populates?: Array<string>
  ): Promise<IUserProfile> {
    let user: IUser = await this.userService.findOne({q: userId});
    if (!user) {
      throw new BadRequestException({
        code: 'err_user_not_found'
      });
    }

    let member: Member = await this.memberService.findOne({
      user: user?._id?.toHexString()
    });

    const userCreditCash = await this.userCreditService.getBalance(
      user?._id?.toHexString(),
      AmountType.CASH
    );

    const userCreditPoint = await this.userCreditService.getBalance(
      user?._id?.toHexString(),
      AmountType.POINT
    );

    const balance = {
      cash: userCreditCash,
      point: userCreditPoint
    };

    if (populates?.length > 0) {
      user = user && (await this.userService._populate(user, populates));
      member =
        member && (await this.memberService._populate(member, populates));
    }
    return {user, member, balance};
  }

  /**
   * update user and data by user type
   * @param userId userId of avatar to update
   * @param userProfile user and extra information by user type
   */
  public async updateUserProfile(
    userId: string,
    userProfile: UserProfileUpdateModel,
    workspace?: string
  ): Promise<any> {
    const {user: userUpdateModel, merchant, member, vehicle} = userProfile;

    // find the user with the correct workspace first
    let user: IUser = await this.userService.findOne({q: userId});

    if (!user) {
      throw new BadRequestException({
        code: 'err_user_not_found'
      });
    }

    if (userUpdateModel) {
      user = await this.userService.update(userId, userUpdateModel);
    }

    // NOTE: use workspace type to distinguish different type of users
    // to support specific user type updates
    let userTypesByWorkspace: Array<string> = [];
    const currentWorkspace = workspace || user?.currentWorkspace;
    if (currentWorkspace) {
      userTypesByWorkspace =
        await this.workspaceTypeService.getUserTypesByWorkspaceId(
          user?.currentWorkspace?.toHexString()
        );
    }
    const myWorkspace = await this.workspaceService.findById(currentWorkspace);

    let updatedMember: Member;
    if (
      member &&
      Object.keys(member)?.length > 0 &&
      user?.userTypes?.includes(UserType.MEMBER) &&
      userTypesByWorkspace?.includes(UserType.MEMBER)
    ) {
      await this.memberService.validateModel(member);
      updatedMember = await this.memberService.findByUserIdAndUpdate(
        user?._id?.toHexString(),
        member
      );
    }

    // update member Hook, if any
    const memberId = await this.memberService.findMemberIdByUserId(
      user._id.toHexString()
    );
    if (memberId) {
      // get hook
      const integration = myWorkspace.integrations.find(
        i => i.app === IntegrationAppType.EEOCN
      );
      const hook = integration?.hooks?.find(h => h.code === 'UPDATE_STUDENT');

      if (hook) {
        const userName = `${userProfile?.user?.firstName} ${userProfile?.user?.lastName}`;
        await this.memberService.updateStudentToEEO(
          hook,
          myWorkspace,
          user?._id?.toHexString(),
          memberId,
          user?.phoneRegionCode,
          user?.phone,
          userName || userProfile?.user?.username
        );
      }
    }

    return {
      user,
      member: updatedMember
    };
  }

  /**
   * update user and data by user type [only works by user type distinction]
   * @param userType usertype
   * @param query mixed search query
   */
  public async getUsersList(
    userType: string,
    query: UserSearchModel & MemberSearchModel
  ) {
    let result: any;
    const {populates, paginate} = query;
    if (userType === UserType.PROVIDER) {
      const updatedQuery = {...query, ...{userTypes: [UserType.PROVIDER]}};
      if (paginate) {
        result = await this.userService.findWithPaginate(updatedQuery);
        // do populates
        result.docs = await this.userService._populate(result.docs, populates);
      } else {
        result = await this.userService.find(updatedQuery);
        // do populates
        result = await this.userService._populate(result, populates);
      }
    }
    if (userType === UserType.MEMBER) {
      if (paginate) {
        result = await this.memberService.findWithPaginate(query);
        // do populates
        result.docs = await this.memberService._populate(
          result.docs,
          populates
        );
      } else {
        result = await this.memberService.find(query);
        // do populates
        result = await this.memberService._populate(result, populates);
      }
    }
    return result;
  }

  /**
   * update user and data by user type [only works by user type distinction]
   * @param userId currentUser
   * @param workspaceId workspaceId of current user
   * @param userDocuments userDocuments object with documentType and fileType
   */
  public async uploadUserDocs(
    userId: string,
    fileType: string,
    userDocumentsObj: UserProfileFiles
  ): Promise<any> {
    let merchant: any;
    let member: any;
    // use find one for workspace check by default
    const user: IUser = await this.userService.findOne({q: userId});
    if (!user) {
      throw new BadRequestException({
        code: 'err_user_not_found'
      });
    }
    const workspace = await this.workspaceService.findById(
      user?.currentWorkspace
    );
    if (!workspace) {
      throw new BadRequestException({
        code: 'err_workspace_not_found'
      });
    }
    const workspaceTypeFiles = await this.workspaceTypeService.getRequirements(
      user?.userTypes[0],
      'files',
      workspace?.type
    );

    if (
      user?.userTypes.includes(UserType.MEMBER) &&
      workspaceTypeFiles?.includes(fileType)
    ) {
      member = await this.memberService.updateMemberDocs(
        userId,
        fileType,
        userDocumentsObj
      );
    }

    return {user, merchant, member};
  }

  /**
   * update user avatar
   * @param userId userId of avatar to update
   * @param files local images on uploaded folder
   */
  public async updateUserAvatar(
    userId: string,
    files: {type: 'ReactNative' | 'FormData'; files: any[]}
  ): Promise<IUser> {
    // findone checks the workspace by default
    const userPre = await this.userService.findOne({q: userId});
    if (!userPre) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_user'}
      });
    }
    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${userPre.currentWorkspace}`;
    const fileMetas = await this.prepareFileMetas(
      files?.files,
      files?.type,
      folder
    );
    let newAvatars = fileMetas.map(fm => ({fileMeta: fm._id}));
    newAvatars = [...newAvatars].map((fm, idx) => ({
      fileMeta: fm.fileMeta,
      default: idx === 0
    }));
    const user = await this.userService.update(userId, {avatars: newAvatars});
    if (userPre?.avatars?.length > 0) {
      // NOTE: if required to delete
      Promise.all(
        userPre.avatars.map(av =>
          this.blobService.delete(av?.fileMeta, process.env.BLOB_ENGINE)
        )
      );
    }
    return user;
  }

  /**
   * upload images to s3
   * @param images
   */
  public async prepareFileMetas(
    images: any[],
    type: 'ReactNative' | 'FormData',
    folder: string
  ): Promise<any> {
    let uploadedFiles = images || [];
    // if react native file upload locally first
    if (type === 'ReactNative') {
      uploadedFiles = await Promise.all(
        images.map(img => processUpload(img)) // local upload
      );
    }
    if (uploadedFiles.length === 0) {
      return [];
    }

    const fileMetas: Array<FileMeta> = await this.blobService.uploadFiles(
      uploadedFiles,
      folder
    );
    return fileMetas;
  }

  /**
   * requirements by workspacetype and userType
   * currently only for admin and web as mobile does not require this information
   */
  async getRequirements(requirementType: string, userType: string) {
    const requiredFiles = await this.workspaceTypeService.getRequirements(
      userType,
      requirementType
    );
    return requiredFiles;
  }
}
