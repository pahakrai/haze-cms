import {UseFilters, UseInterceptors} from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  GqlCurrentUser,
  GqlWorkspaceId,
  RatingHelper,
  FileInfo,
  RequireLogin
} from 'src/core';
import {MemberService} from './member.service';
import {MemberUserModel, MemberUpdateModel} from './models';
import {Member} from './interfaces';
import {WorkspaceInterceptor} from 'src/core/interceptors';
import {IUser} from '../User';
import {TagRecommendationService} from '../TagRecommendation/tagRecommendation.service';
import {WorkspaceService} from '../Workspace/workspace.service';

@Resolver('Member')
@UseFilters(GraphQLExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class MemberResolver {
  constructor(
    private readonly memberService: MemberService,
    private readonly workspaceService: WorkspaceService,
    private readonly tagRecommendationService: TagRecommendationService
  ) {}

  @Query()
  @RequireLogin()
  async member(@Args('id') id: string) {
    return this.memberService.findById(id, {lean: true});
  }

  @Query()
  @RequireLogin()
  async myMember(@GqlCurrentUser() currentUser: IUser) {
    return this.memberService.findOne({user: currentUser?._id?.toHexString()});
  }

  @Query()
  async memberByUserId(@Args('userid') userid: string) {
    return this.memberService.memberByUserId(userid);
  }

  @Query()
  @RequireLogin()
  async members(@Args('query') query, @Args('paginate') paginate) {
    const members = await this.memberService.findWithCursorPaginate(
      query,
      paginate
    );

    return members;
  }

  @Query()
  @RequireLogin()
  async myAddresses(@GqlCurrentUser() currentUser) {
    return this.memberService.getAddressByUserId(
      currentUser?._id?.toHexString(),
      {}
    );
  }

  @Query()
  // @UseInterceptors(MapDisplayLocalizeInterceptor)
  async memberUploadRequirements() {
    return this.memberService.getRequirements('files', true);
  }

  @Query()
  // @UseInterceptors(MapDisplayLocalizeInterceptor)
  async memberMetaRequirements() {
    return this.memberService.getRequirements('meta');
  }

  @Query()
  @RequireLogin()
  async myDefaultAddress(@GqlCurrentUser() currentUser) {
    const userAddresses = await this.memberService.getAddressByUserId(
      currentUser?._id?.toHexString(),
      {}
    );
    return userAddresses?.length
      ? userAddresses?.find(add => add.isDefault === true)
      : null;
  }

  @Mutation()
  @RequireLogin()
  async setMyDefaultAddress(
    @Args('addressId') addressId,
    @GqlCurrentUser() currentUser
  ) {
    return this.memberService.setDefaultAddress(
      currentUser?._id?.toHexString(),
      addressId
    );
  }

  @Mutation()
  @RequireLogin()
  async addMyAddress(
    @Args('addressCreateModel') addressCreateModel,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.memberService.createAddressByUserId(
      currentUser?._id?.toHexString(),
      {
        ...addressCreateModel,
        workspace: currentUser?.currentWorkspace?.toHexString()
      }
    );
  }

  @Mutation()
  @RequireLogin()
  async deleteMyAddress(
    @Args('addressId') addressId,
    @GqlCurrentUser() currentUser
  ) {
    return this.memberService.deleteAddressByAddressId(
      currentUser?._id?.toHexString(),
      addressId
    );
  }

  @Mutation()
  @RequireLogin()
  async updateMyAddress(
    @Args('addressId') addressId,
    @Args('addressUpdateModel') addressUpdateModel,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.memberService.updateAddressByUserId(
      currentUser?._id?.toHexString(),
      addressId,
      {
        ...addressUpdateModel,
        workspace: currentUser?.currentWorkspace?.toHexString()
      }
    );
  }

  @Mutation()
  @RequireLogin()
  async updateMyMember(
    @Args('memberUpdateModel') memberUpdateModel: MemberUpdateModel,
    @GqlCurrentUser() currentUser: IUser
  ) {
    return this.memberService.update(
      currentUser?._id?.toHexString(),
      memberUpdateModel,
      {lean: true}
    );
  }

  @Mutation()
  async signUpMember(
    @Args('signupModel') memberCreateModel: MemberUserModel,
    @Args('registrationFiles') registrationFiles: any,
    @Args('filesInfo') filesInfo: Array<FileInfo>
  ) {
    const signUpDocs =
      registrationFiles?.length > 0
        ? await this.memberService.arrangeDocsByFileInfo(
            filesInfo,
            registrationFiles,
            'ReactNative'
          )
        : null;
    const {user, member, userToken} = await this.memberService.signUp(
      memberCreateModel,
      signUpDocs?.member,
      {
        sendPasscode:
          memberCreateModel.sendPasscode === true ||
          memberCreateModel.sendPasscode === false
            ? memberCreateModel.sendPasscode
            : true
      }
    );
    return {user, member, userToken};
  }

  @Mutation()
  @RequireLogin()
  async toggleShowAvgFeedback() {
    return this.memberService.toggleShowAvgFeedback();
  }

  @ResolveField('user')
  async getUser(@Parent() member: Member) {
    const {user} = await this.memberService._populate(member, ['user']);
    return user;
  }

  @ResolveField('files')
  async getMemberFiles(@Parent() member: Member) {
    const {files} = await this.memberService._populate(member, ['$files.file']);
    return files;
  }

  @ResolveField('level')
  async getMemberLevel(@Parent() member: Member) {
    const {level} = await this.memberService._populate(member, ['level']);
    return level;
  }

  @ResolveField('preferences')
  async getPreferenceCategories(@Parent() member: Member) {
    const {preferences} = await this.memberService._populate(member, [
      '$preferences.categories',
      '$preferences.locations'
    ]);
    let tagPrep = [];
    if (preferences && preferences?.tags?.length) {
      const tags = [...preferences?.tags];
      tagPrep = await this.tagRecommendationService.find({
        texts: tags as string[]
      });
    }
    return {...preferences, tags: tagPrep};
  }

  @ResolveField('avgFeedback')
  async getAvgFeedback(@Parent() member, @GqlWorkspaceId() workspaceId) {
    if (!member.avgFeedback) {
      return 0;
    }
    // get workspace
    const workspace = await this.workspaceService.findById(workspaceId);

    return RatingHelper.castRatingToDisplay(
      member?.avgFeedback,
      workspace?.setting?.ratingMaxValue || 10
    );
  }

  @Mutation()
  async loginMessagingMember(
    @Args('phone') phone,
    @Args('verifyCode') verifyCode,
    @Args('phoneRegionCode') phoneRegionCode
  ) {
    return this.memberService.loginMessagingMember({
      phone,
      verifyCode,
      phoneRegionCode
    });
  }
}
