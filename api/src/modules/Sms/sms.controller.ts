import {
  Body,
  Post,
  Controller,
  UseFilters
  // UseInterceptors
} from '@nestjs/common';
// eslint-disable-next-line max-len
import {HttpExceptionFilter} from 'src/core/filters/http.exception.filter';

import {SMSSendModel} from './models/sms.send.model';
import {SMSService} from './services/sms.service';

@Controller('sms')
@UseFilters(HttpExceptionFilter)
export class SMSController {
  constructor(private readonly smsService: SMSService) {}

  @Post('send')
  public async sendSMS(@Body() body: SMSSendModel) {
    return this.smsService.send(body);
  }
}
