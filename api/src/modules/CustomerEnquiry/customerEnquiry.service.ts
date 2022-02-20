import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

import {
  NotFoundException,
  BadRequestException
} from '../../core/exceptions/index';

import {IUser} from 'src/modules/User/interfaces';
// interfaces & models
import {
  CustomerEnquiryCreateModel,
  CustomerEnquiryUpdateModel,
  CustomerEnquirySearchModel
} from './models';
import {CustomerEnquiry, CustomerEnquiryModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class CustomerEnquiryService extends BaseCRUDService<
  CustomerEnquiry,
  CustomerEnquiryCreateModel,
  CustomerEnquiryUpdateModel,
  CustomerEnquirySearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('CustomerEnquirys')
    private readonly customerEnquiryRepository: CustomerEnquiryModel
  ) {
    super(customerEnquiryRepository, request);
  }

  public _castQuery(searchModel: CustomerEnquirySearchModel) {
    let workspace: string;
    const queryAnd: any = [];
    const {isFollow, q} = searchModel;
    const user = this.getCurrentUser<IUser>();
    if (q) {
      queryAnd.push({
        $or: [
          {phone: new RegExp(q, 'i')},
          {email: new RegExp(q, 'i')},
          {phoneRegion: new RegExp(q, 'i')},
          {subject: new RegExp(q, 'i')}
        ]
      });
    }

    if (typeof isFollow === 'boolean') {
      queryAnd.push({isFollow});
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
    queryAnd.push({workspace: workspace ? workspace : null});

    return queryAnd.length > 0 ? {$and: queryAnd} : {};
  }

  /**
   * update isFollow whoFollow followTime by id
   * @param id CustomerEnquiry id
   */
  public async updateToFollow(id: string) {
    // find CustomerEnquiry by id
    const customerEnquiry = await this.findById(id, {lean: true});

    if (!customerEnquiry) {
      // customerEnquiry not found
      throw new NotFoundException({code: 'err_customerEnquiry_not_found'});
    }

    if (customerEnquiry.isFollow === true) {
      throw new BadRequestException({
        code: 'err_invalid_customerEnquiry_isFollow'
      });
    }
    const user = this.getCurrentUser<IUser>();
    // update isFollow whoFollow followTime by id
    const updateCustomerEnquiry = await this.update(
      id,
      {
        isFollow: true,
        whoFollow: user?._id.toHexString(),
        followTime: new Date()
      },
      {lean: true}
    );

    return updateCustomerEnquiry;
  }
}
