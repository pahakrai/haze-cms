import {Injectable, Scope, Inject, HttpService} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  WorkspaceSubscriptionCreateModel,
  WorkspaceSubscriptionUpdateModel,
  WorkspaceSubscriptionSearchModel,
  WorkspaceSubscriptionSubscribeModel
} from './models';
import {WorkspaceSubscription, WorkspaceSubscriptionModel} from './interfaces';
import {IUser} from 'src/modules/User';

@Injectable({scope: Scope.REQUEST})
export class WorkspaceSubscriptionService extends BaseCRUDService<
  WorkspaceSubscription,
  WorkspaceSubscriptionCreateModel,
  WorkspaceSubscriptionUpdateModel,
  WorkspaceSubscriptionSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspaceSubscriptions')
    private readonly workspaceSubscriptionRepository: WorkspaceSubscriptionModel,
    private readonly httpService: HttpService
  ) {
    super(workspaceSubscriptionRepository, request);
  }

  public _castQuery(searchModel: WorkspaceSubscriptionSearchModel) {
    let workspace: string;
    const query: any = {};
    const user = this.getCurrentUser<IUser>();

    const {stripeSubscriptionId, subscriptionPlan} = searchModel;

    if (stripeSubscriptionId) {
      query.stripeSubscriptionId = stripeSubscriptionId;
    }
    if (subscriptionPlan) {
      query.subscriptionPlan = subscriptionPlan;
    }
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
    return query;
  }

  public async subscribeUs(model: WorkspaceSubscriptionSubscribeModel) {
    const user = this.getCurrentUser<IUser>();
    const {subscriptionPlan, stripePriceId, paymentMethodId} = model;

    try {
      // call stripe-payment-api to complete payment first
      const response = await this.httpService
        .post(`${process.env.PAYMENT_API_URL}/subscriptions/checkout`, {
          paymentMethodId,
          email: user.email,
          priceId: stripePriceId
        })
        .toPromise();

      // create WorkspaceSubscription
      return this.create({
        subscriptionPlan,
        status: response.data.status,
        stripeSubscriptionId: response.data.id,
        workspace: user.currentWorkspace.toHexString()
      });
    } catch (e) {
      console.error('SUBSCRIBE ERROR');
      throw e;
    }
  }

  // create subscription, when create workspace initially, it is trial

  // update subscription, from admin portal, select subscriptionPlan to update

  // cancel subscription, click from admin portal, to cancel, i.e. it is call update subscription
}
