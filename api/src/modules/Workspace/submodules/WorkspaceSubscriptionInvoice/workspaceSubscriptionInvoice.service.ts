import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService, MongooseOption} from 'src/core';

// interfaces & models
import {
  WorkspaceSubscriptionInvoiceCreateModel,
  WorkspaceSubscriptionInvoiceUpdateModel,
  WorkspaceSubscriptionInvoiceSearchModel
} from './models';
import {
  WorkspaceSubscriptionInvoice,
  WorkspaceSubscriptionInvoiceModel
} from './interfaces';
import {WorkspaceSubscriptionService} from '../WorkspaceSubscription/workspaceSubscription.service';
import {IUser} from 'src/modules/User';

@Injectable({scope: Scope.REQUEST})
export class WorkspaceSubscriptionInvoiceService extends BaseCRUDService<
  WorkspaceSubscriptionInvoice,
  WorkspaceSubscriptionInvoiceCreateModel,
  WorkspaceSubscriptionInvoiceUpdateModel,
  WorkspaceSubscriptionInvoiceSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WorkspaceSubscriptionInvoices')
    private readonly workspaceSubscriptionInvoiceRepository: WorkspaceSubscriptionInvoiceModel,
    private readonly workspaceSubscriptionService: WorkspaceSubscriptionService
  ) {
    super(workspaceSubscriptionInvoiceRepository, request);
  }

  public _castQuery(searchModel: WorkspaceSubscriptionInvoiceSearchModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();

    const query: any = {};
    const {q, subscription, dateFr, dateTo} = searchModel;

    if (q) {
      query.invoice = new RegExp(q, 'i');
    }

    if (subscription) {
      query.subscription = subscription;
    }

    if (dateFr && dateTo) {
      query.date = {$gte: dateFr, $lte: dateTo};
    } else if (dateFr) {
      query.date = {$gte: dateFr};
    } else if (dateTo) {
      query.date = {$lte: dateTo};
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

  // Override
  public async create(
    doc: WorkspaceSubscriptionInvoiceCreateModel,
    options: MongooseOption
  ) {
    // get WorkspaceSubscription and insert _id
    const workspaceSubscription = await this.workspaceSubscriptionService.findOne(
      {stripeSubscriptionId: doc.subscription}
    );
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();
    return super.create(
      // add WorkspaceSubscription _id
      {
        ...doc,
        subscription: workspaceSubscription?._id?.toHexString(),
        workspace: workspace
      },
      options
    );
  }
}
