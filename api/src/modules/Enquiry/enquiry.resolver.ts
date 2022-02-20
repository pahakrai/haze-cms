import {UseFilters} from '@nestjs/common';
import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {
  GraphQLExceptionFilter,
  GqlLocaleDecorator,
  Locale,
  GqlWorkspaceId
} from 'src/core';
import {EnquiryService} from './enquiry.service';
import {ContactUsModel} from './models';

@Resolver('Enquiry')
@UseFilters(GraphQLExceptionFilter)
export class EnquiryResolver {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Mutation()
  async createEnquiry(
    @Args('input') input: string,
    @Args('contactType') contactType: string,
    @GqlLocaleDecorator() locale: Locale
  ) {
    return this.enquiryService.createEnquiry(input, locale);
  }

  @Mutation()
  async contactUs(
    @Args('model') model: ContactUsModel,
    @GqlWorkspaceId() workspace,
    @GqlLocaleDecorator() locale
  ) {
    return this.enquiryService.contactUs(model, locale, workspace);
  }

  /**
   * Use at dr ikids homepage request free trial course
   */
  @Mutation()
  async requestTrialEventCampaign(
    @Args('input') input: string,
    @Args('contactType') contactType: string,
    @GqlLocaleDecorator() locale: Locale
  ) {
    return this.enquiryService.requestTrialEventCampaign(input, locale);
  }
}
