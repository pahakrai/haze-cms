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
import {QuotationService} from './quotation.service';

@Resolver('Quotation')
@UseFilters(GraphQLExceptionFilter)
export class QuotationResolver {
  constructor(private readonly quotationService: QuotationService) {}

  @ResolveField('client')
  async getClient(@Parent() quotation) {
    if (!quotation.client) {
      return null;
    }
    const {client} = await this.quotationService._populate(quotation, [
      'client'
    ]);
    return client;
  }

  @ResolveField('billingContact')
  async getBillingContact(@Parent() quotation) {
    if (!quotation.billingContact) {
      return null;
    }
    const {billingContact} = await this.quotationService._populate(quotation, [
      'billingContact'
    ]);
    return billingContact;
  }

  @ResolveField('contactAddress')
  async getContactAddress(@Parent() quotation) {
    if (!quotation.contactAddress) {
      return null;
    }
    const {contactAddress} = await this.quotationService._populate(quotation, [
      'contactAddress'
    ]);
    return contactAddress;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() quotation) {
    if (!quotation.workspace) {
      return null;
    }
    const {workspace} = await this.quotationService._populate(quotation, [
      'workspace'
    ]);
    return workspace;
  }

  @ResolveField('services')
  async getServices(@Parent() quotation) {
    if (!quotation.services) {
      return null;
    }

    const {services} = await this.quotationService._populate(quotation, [
      '$services.service'
    ]);

    return services;
  }

  @ResolveField('charge')
  async getChargeServices(@Parent() quotation) {
    if (!quotation.charge) {
      return null;
    }

    const {charge} = await this.quotationService._populate(quotation, [
      '$charge.$services.service'
    ]);

    return charge;
  }

  @ResolveField('details')
  async getProduct(@Parent() quotation) {
    const {details} = await this.quotationService._populate(quotation, [
      '$details.product',
      '$details.productSKU'
    ]);

    return details;
  }

  @Query()
  async quotation(@Args('id') id: string) {
    return this.quotationService.findById(id, {lean: true});
  }

  @Query()
  async quotations(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.quotationService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createQuotation(
    @Args('quotationFormCreateModel') quotationFormCreateModel
  ) {
    return this.quotationService.createQuotation(quotationFormCreateModel);
  }

  @Mutation()
  @RequireLogin()
  async updateQuotation(
    @Args('id') id: string,
    @Args('quotationFormUpdateModel') quotationFormUpdateModel
  ) {
    return this.quotationService.updateQuotation(id, quotationFormUpdateModel, {
      lean: true
    });
  }
}
