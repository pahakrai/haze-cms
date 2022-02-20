import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {CustomerEnquiryService} from './customerEnquiry.service';

@Resolver('CustomerEnquiry')
@UseFilters(GraphQLExceptionFilter)
export class CustomerEnquiryResolver {
  constructor(
    private readonly customerEnquiryService: CustomerEnquiryService
  ) {}

  @ResolveField('workspace')
  async getWorkspace(@Parent() customerEnquiry) {
    if (!customerEnquiry.workspace) {
      return null;
    }
    const {
      workspace
    } = await this.customerEnquiryService._populate(customerEnquiry, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('whoFollow')
  async getWhoFollow(@Parent() customerEnquiry) {
    if (!customerEnquiry.whoFollow) {
      return null;
    }
    const {
      whoFollow
    } = await this.customerEnquiryService._populate(customerEnquiry, [
      'whoFollow'
    ]);
    return whoFollow;
  }

  @Query()
  async customerEnquiry(@Args('id') id: string) {
    return this.customerEnquiryService.findById(id, {lean: true});
  }

  @Query()
  async customerEnquiries(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.customerEnquiryService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  async createCustomerEnquiry(
    @Args('customerEnquiryCreateModel') customerEnquiryCreateModel
  ) {
    return this.customerEnquiryService.create(customerEnquiryCreateModel, {
      lean: true
    });
  }

  @Mutation()
  @RequireLogin()
  async updateCustomerEnquiry(
    @Args('id') id: string,
    @Args('customerEnquiryUpdateModel') customerEnquiryUpdateModel
  ) {
    return this.customerEnquiryService.update(id, customerEnquiryUpdateModel, {
      lean: true
    });
  }

  @Mutation()
  @RequireLogin()
  async updateToFollow(@Args('id') id: string) {
    return this.customerEnquiryService.updateToFollow(id);
  }
}
