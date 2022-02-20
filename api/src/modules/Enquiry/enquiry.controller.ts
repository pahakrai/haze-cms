import {
  Body,
  Post,
  Headers,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {Locale} from 'src/core/locale';
import {LocaleDecorator} from 'src/core/decorators';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {EnquiryService} from './enquiry.service';

// models
import {ContactUsModel, EnquiryCreateModel} from './models';
import {WorkspaceInterceptor} from 'src/core/interceptors';

@Controller('enquiries')
@UseInterceptors(WorkspaceInterceptor)
@UseFilters(HttpExceptionFilter)
export class EnquiryController extends BaseController {
  constructor(private readonly enquiryService: EnquiryService) {
    super();
  }

  @Post()
  public async createEnquiry(
    @Body() body: EnquiryCreateModel,
    @LocaleDecorator() locale: Locale
  ) {
    return this.enquiryService.createEnquiry(body?.input, locale);
  }

  @Post('contact-us')
  public async contactUs(
    @Body() body: ContactUsModel,
    @LocaleDecorator() locale: Locale,
    @Headers('workspace') workspace: string
  ) {
    return this.enquiryService.contactUs(body, locale, workspace);
  }

  /**
   * Use at dr ikids homepage request free trial course
   */
  @Post('request_course')
  public async requestTrialEventCampaign(
    @Body() body: EnquiryCreateModel,
    @LocaleDecorator() locale: Locale
  ) {
    return this.enquiryService.requestTrialEventCampaign(body?.input, locale);
  }
}
