import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {
  BaseCRUDService,
  PaginateOptionsQueryModel,
  NotFoundException,
  BadRequestException
} from 'src/core';
import {ObjectId} from 'mongodb';

// interfaces & models
import {
  WorkspacePaymentMethodCreateModel,
  WorkspacePaymentMethodUpdateModel,
  WorkspacePaymentMethodSearchModel
} from './models';
import {
  WorkspacePaymentMethod,
  WorkspacePaymentMethodModel
} from './interfaces';
import {IUser} from '../../../User';
import {PaymentMethodService} from '../../../PaymentMethod/paymentMethod.service';

@Injectable({scope: Scope.REQUEST})
export class WorkspacePaymentMethodService extends BaseCRUDService<
  WorkspacePaymentMethod,
  WorkspacePaymentMethodCreateModel,
  WorkspacePaymentMethodUpdateModel,
  WorkspacePaymentMethodSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspacePaymentMethods')
    private readonly workspacePaymentMethodRepository: WorkspacePaymentMethodModel,
    private readonly paymentMethodService: PaymentMethodService
  ) {
    super(workspacePaymentMethodRepository, request);
  }

  public _castQuery(searchModel: WorkspacePaymentMethodSearchModel) {
    let workspace: string;
    const query: any = {};
    const {platform, paymentMethod, isActive} = searchModel;
    const user = this.getCurrentUser<IUser>();

    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    // always pass workspace as query
    query.workspace = workspace || null;

    if (platform) {
      query.platforms = platform;
    }
    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }
    if (typeof isActive === 'boolean') {
      query.isActive = isActive;
    }

    return query;
  }

  public async create(
    model: WorkspacePaymentMethodCreateModel
  ): Promise<WorkspacePaymentMethod> {
    const user = this.getCurrentUser<IUser>();
    const {paymentMethodModel, ...rest} = model;

    // in paymentMethod
    let paymentMethodId: string;
    if (paymentMethodModel) {
      const paymentMethod = await this.paymentMethodService.create({
        ...paymentMethodModel,
        isActive: model.isActive
      });
      paymentMethodId = paymentMethod?._id?.toHexString();
    } else {
      paymentMethodId = model.paymentMethod;
    }

    const workspacepaymentMethod = await super.create({
      ...rest,
      paymentMethod: paymentMethodId,
      workspace: user.currentWorkspace.toHexString()
    });

    return workspacepaymentMethod;
  }

  public async update(
    workspacepaymentMethodId: string | ObjectId,
    updateModel: WorkspacePaymentMethodUpdateModel
  ): Promise<WorkspacePaymentMethod> {
    const workspacepaymentMethod = await this.findById(
      workspacepaymentMethodId as string,
      {lean: true}
    );
    if (!workspacepaymentMethod) {
      throw new BadRequestException({
        code: 'err_workspacepaymentMethod_not_found'
      });
    }

    const {paymentMethodModel} = updateModel;
    if (paymentMethodModel) {
      const paymentMethodId = (workspacepaymentMethod?.paymentMethod as ObjectId).toHexString();
      await this.paymentMethodService.update(paymentMethodId, {
        ...paymentMethodModel,
        isActive: updateModel.isActive
      });
    }
    const updatedModel: any = {
      ...updateModel
    };

    return super.update(workspacepaymentMethodId, updatedModel);
  }

  async getMyPaymentMethod(
    workspacePaymentMethodSearchModel: WorkspacePaymentMethodSearchModel,
    paginateOptions: PaginateOptionsQueryModel = {}
  ): Promise<any> {
    const query = this._castQuery(workspacePaymentMethodSearchModel);
    let results = null;
    if (workspacePaymentMethodSearchModel.paginate) {
      results = await this.workspacePaymentMethodRepository.paginate(
        query,
        paginateOptions
      );
    } else {
      results = await this.workspacePaymentMethodRepository.find(query);
    }
    return results;
  }

  /**
   * @param id workspacePaymentMethod id
   * @param isActive optional param from query
   */
  public async toggleIsActive(id: string, isActive?: boolean) {
    const workspacePaymentMethod = await this.workspacePaymentMethodRepository.findById(
      id
    );
    if (!workspacePaymentMethod)
      throw new NotFoundException({
        code: 'err_paymentMethod_not_found'
      });

    await this.workspacePaymentMethodRepository.findByIdAndUpdate(
      id,
      {isActive: isActive},
      {lean: true}
    );
    const paymentMethodId = workspacePaymentMethod.paymentMethod as ObjectId;
    await this.paymentMethodService.update(paymentMethodId, {
      isActive: isActive
    });
    return this.workspacePaymentMethodRepository
      .findById(id)
      .populate('paymentMethod')
      .exec();
  }

  public async deleteWorkspacePaymentMethod(id: string) {
    const workspacePaymentMethod = await this.workspacePaymentMethodRepository
      .findById(id)
      .exec();
    if (!workspacePaymentMethod)
      throw new BadRequestException({
        code: 'err_paymentMethod_not_found'
      });
    if (workspacePaymentMethod.isActive === true)
      throw new BadRequestException({
        code: 'err_delete_not'
      });

    return super.delete(id);
  }

  /**
   * calculate service charge of payment method
   *
   * @param amount original order totalAmount
   * @param paymentMethod payment method id
   */
  public async getPaymentServiceCharge(amount: number, paymentMethod: string) {
    const workspacePaymentMethod = await this.findOne({
      paymentMethod,
      isActive: true
    });

    if (!workspacePaymentMethod) {
      throw new BadRequestException({code: 'err_paymentMethod_not_found'});
    }

    /**
     * Example: stripe (https://stripe.com/en-hk/pricing)
     * chargeValue is 3.4%
     * adminCharge is 2.35
     *
     * let amount = 100
     * service charge = 100 * 0.034 + 2.35 = 5.75
     */
    return (
      amount *
        (workspacePaymentMethod.chargeValue > 0
          ? workspacePaymentMethod.chargeValue / 100
          : 1) +
      workspacePaymentMethod.adminCharge
    );
  }
}
