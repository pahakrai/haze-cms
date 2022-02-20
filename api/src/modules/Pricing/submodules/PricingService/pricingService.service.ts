import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import // ForbiddenException,
// BadRequestException
'src/core';

import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  PricingServiceCreateModel,
  PricingServiceUpdateModel,
  PricingServiceSearchModel
} from './models';
import {PricingServiceModel, PricingService} from './interfaces';
import {IUser} from 'src/modules/User';

@Injectable({scope: Scope.REQUEST})
export class PricingServiceService extends BaseCRUDService<
  PricingService,
  PricingServiceCreateModel,
  PricingServiceUpdateModel,
  PricingServiceSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('PricingServices')
    private readonly PricingServiceRepository: PricingServiceModel
  ) {
    super(PricingServiceRepository, request);
  }

  public _castQuery(searchModel: PricingServiceSearchModel) {
    const query: any = {$and: []};
    const {services} = searchModel;
    const user = this.getCurrentUser<IUser>();
    let workspace: string;
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }

    query.$and.push({workspace: workspace ? workspace : null});

    if (services?.length > 0) {
      query.service = {$in: services};
    }

    return query;
  }
}
