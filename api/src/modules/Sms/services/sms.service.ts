import {Injectable} from '@nestjs/common';

import {SMSSendModel} from '../models/sms.send.model';

@Injectable()
export abstract class SMSService {
  public async send(model: SMSSendModel) {}
}
