import {Body, Post, Controller, UseFilters} from '@nestjs/common';
// eslint-disable-next-line max-len
import {HttpExceptionFilter} from 'src/core/filters/http.exception.filter';

import {SendMailModel} from './models/send.mail.model';
import {MailerService} from './mailer.service';
import {ProgrammaticAPI} from 'src/core';

@ProgrammaticAPI()
@Controller('mailer')
@UseFilters(HttpExceptionFilter)
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  public async sendEmail(@Body() body: SendMailModel) {
    return this.mailerService.sendMail(body);
  }
}
