/* eslint-disable max-len */
import {Injectable, BadRequestException} from '@nestjs/common';
import {ObjectId} from 'mongodb';
import common from '@golpasal/common';

// services
import {AuthService} from '../Auth/auth.service';
import {AuthConfigService} from '../Auth/submodules/AuthConfig/authConfig.service';
import {AutoNumberTemplateService} from '../AutoNumberTemplate/autoNumberTemplate.service';
import {GroupService} from '../Ac/Group/group.service';
import {IamService} from '../Iam/iam.service';
import {ParamService} from '../Param/param.service';
import {PageService} from '../Page/Page/page.service';
import {PhoneRegionService} from '../PhoneRegion/phoneRegion.service';
import {WorkspaceService} from '../Workspace/workspace.service';
import {WorkspacePaymentMethodService} from '../Workspace/submodules/WorkspacePaymentMethod/workspacePaymentMethod.service';
import {WorkspacePhoneRegionService} from '../Workspace/submodules/WorkspacePhoneRegion/workspacePhoneRegion.service';
import {WorkspaceSubscriptionService} from '../Workspace/submodules/WorkspaceSubscription/workspaceSubscription.service';
import {SubscriptionPlanService} from '../SubscriptionPlan/subscriptionPlan.service';
// models
import {ProviderUserModel, ProviderWorkspaceConfirmModel} from './models/';

const {WorkspaceType} = common.type;
const {WorkspaceStatus} = common.status;
const {UserType} = common.type;

@Injectable()
export class ProviderService {
  constructor(
    private readonly authService: AuthService,
    private readonly authConfigService: AuthConfigService,
    private readonly autoNumberTemplateService: AutoNumberTemplateService,
    private readonly groupService: GroupService,
    private readonly iamService: IamService,
    private readonly paramService: ParamService,
    private readonly pageService: PageService,
    private readonly phoneRegionService: PhoneRegionService,
    private readonly workspaceService: WorkspaceService,
    private readonly workspacePaymentMethodService: WorkspacePaymentMethodService,
    private readonly workspacePhoneRegionService: WorkspacePhoneRegionService,
    private readonly workspaceSubscriptionService: WorkspaceSubscriptionService,
    private readonly subscriptionPlanService: SubscriptionPlanService
  ) {}

  /**
   * register the provider before register the workspace
   * @description  註冊workspace之前，需要先註冊 user type= prodiver
   * @param model  user model
   */
  public async signUp(model: ProviderUserModel) {
    const newWorkspace = new ObjectId();
    // create new  workspace
    const workspace = await this.workspaceService.createWorkspace({
      _id: newWorkspace.toHexString(),
      code: newWorkspace.toHexString(),
      name: newWorkspace.toHexString(),
      type: WorkspaceType.COMPANY_WEBSITE,
      status: WorkspaceStatus.UNACTIVATED,
      webHost: `golpasal.golpasal.com/${newWorkspace.toHexString()}`,
      defaultCurrency: 'HKD'
    });

    // get workspace default param
    const params = await this.paramService.getParameter(
      'data_template_AC_Group_workspace_owner'
    );
    const defaultSetting = [];
    // get default public signup config
    const signupConfig = params.find(p => p.code === 'SignupConfig').values;

    if (signupConfig.length > 0) {
      defaultSetting.push(
        this.authConfigService.create({
          _id: new ObjectId(),
          workspace: newWorkspace.toHexString(),
          ...signupConfig[0]
        })
      );
    }
    // get default iam value
    const iamValues = params.find(p => p.code === 'IAM').values;
    const iamModels = [];
    for (let i = 0; i < iamValues.length; i++) {
      iamModels.push({
        workspace: workspace._id.toHexString(),
        ...iamValues[i]
      });
    }
    defaultSetting.push(this.iamService.insertMany(iamModels));

    const phoneRegion = await this.phoneRegionService.findByCode('852');
    defaultSetting.push(
      this.workspacePhoneRegionService.create({
        workspace: newWorkspace.toHexString(),
        phoneRegion: phoneRegion._id.toHexString()
      })
    );
    const [newAuthConfig] = await Promise.all(defaultSetting);

    // generate user password
    const password = Math.random().toString(36).slice(-8);
    // create new user  type is provider
    const {user} = await this.authService.signUp(
      {
        ...model,
        password: password,
        currentWorkspace: newWorkspace.toHexString(),
        workspaces: [newWorkspace.toHexString()],
        userTypes: [UserType.PROVIDER]
      },
      {
        usernameAutoGenerate: true,
        sendPasscode: true
      }
    );
    // need to delete new SignupConfig
    // 預防惡意註冊造成數據冗餘
    await this.authConfigService.delete(newAuthConfig._id);
    return {user, workspace};
  }

  /**
   * confirm and update workspace info
   * @param passcodeToken
   * @param opts
   * @param confirmModel
   */
  public async workspaceConfirm(
    passcodeToken: string,
    opts,
    confirmModel: ProviderWorkspaceConfirmModel
  ) {
    // validate passcode token
    const validateResult =
      await this.authService.validatePasscodeTokenAndReturnUser(
        passcodeToken,
        opts
      );
    // if validate is faild, return error message
    if (!validateResult.validate) {
      throw new BadRequestException({
        code: 'err_faild',
        payload: {key: 'err_validate_faild'}
      });
    }
    const user = validateResult.user;
    const workspace = await this.workspaceService.getWorkspaceByCurrentUser(
      user
    );
    if (!workspace) {
      throw new BadRequestException({
        code: 'err_required',
        payload: {key: 'err_workspace_not_found'}
      });
    }
    if (workspace.status === WorkspaceStatus.ACTIVE) {
      throw new BadRequestException({
        code: 'workspace status activated',
        payload: {key: 'err_workspace_status_activated'}
      });
    }
    // update user password
    await this.authService.updatePassword(user, confirmModel.password);

    const methods = [];
    methods.push(
      // update workspace
      this.workspaceService.updateWorkspace(workspace._id.toHexString(), {
        code: confirmModel?.code,
        name: confirmModel?.name,
        type: confirmModel?.type || workspace.type,
        status: WorkspaceStatus.ACTIVE
      })
    );
    // get workspace default param
    const params = await this.paramService.getParameter(
      'data_template_AC_Group_workspace_owner'
    );
    // get default policies value
    const policies = params.find(p => p.code === 'Policies').values;
    methods.push(
      this.groupService.create({
        users: [user._id],
        name: 'Workspace Owner',
        workspace: workspace._id,
        policies: policies
      })
    );

    // get default subscriptionPlan value
    const planValue = params.find(p => p.code === 'SubscriptionPlans').value;
    const subplan = await this.subscriptionPlanService.findOne({
      code: planValue
    });
    methods.push(
      // create workspace subscription
      this.workspaceSubscriptionService.create({
        workspace: workspace._id.toHexString(),
        subscriptionPlan: subplan?._id.toHexString()
      })
    );

    // create authconfig by new workspace
    const authConfig = params.find(p => p.code === 'AuthConfig').values;
    authConfig.map(ac => {
      const newAc = JSON.stringify(ac)
        .toString()
        .replace(/{workspace}/g, confirmModel?.name || workspace.name);

      methods.push(
        this.authConfigService.create({
          ...JSON.parse(newAc),
          workspace: workspace._id.toHexString()
        })
      );
    });

    // setting page section default value
    const pageSections = params.find(p => p.code === 'PageSection').values;
    const pageModels = [];
    pageSections.map(ps =>
      pageModels.push({
        ...ps,
        workspace: workspace._id.toHexString()
      })
    );
    methods.push(this.pageService.insertMany(pageModels));

    // setting  autoNuber templates
    const autoNumberTemplates = params.find(
      p => p.code === 'AutoNumberTemplates'
    ).values;
    const autoNumberTemplateModels = [];
    autoNumberTemplates.map(ant =>
      autoNumberTemplateModels.push({
        ...ant,
        workspace: workspace._id.toHexString()
      })
    );
    methods.push(
      this.autoNumberTemplateService.insertMany(autoNumberTemplateModels)
    );

    // setting workspace payment method
    const workspacePaymentMethods = params.find(
      p => p.code === 'WorkspacePaymentMethod'
    ).values;
    const workspacePaymentMethodModels = [];
    workspacePaymentMethods.map(wpm =>
      workspacePaymentMethodModels.push({
        ...wpm,
        workspace: workspace._id.toHexString()
      })
    );
    methods.push(
      this.workspacePaymentMethodService.insertMany(
        workspacePaymentMethodModels
      )
    );

    // setting regions
    // const regions = params.find(p => p.code === 'Regions').values;
    // const regionModels = [];
    // regions.map(r =>
    //   regionModels.push({
    //     ...r,
    //     workspace: workspace._id.toHexString()
    //   })
    // );
    // methods.push(this.regionService.insertMany(regionModels));

    const [newWorkspace, group, workspaceSubscription] = await Promise.all(
      methods
    );
    return {
      workspace: newWorkspace,
      group: group,
      workspaceSubscription: workspaceSubscription
    };
  }
}
