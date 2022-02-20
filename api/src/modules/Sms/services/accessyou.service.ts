import qs from 'qs';
import {Injectable, Inject, HttpService} from '@nestjs/common';

import {SMSModuleOption} from '../interfaces';
import {SMS_MODULE_OPTION} from '../constants';
import {SMSSendModel} from '../models/sms.send.model';
import {SMSService} from './sms.service';

// import {IAM} from 'src/modules/Iam/interfaces';
import {IamService} from 'src/modules/Iam/iam.service';

class AccessyouConfig {
  private accountno: string;
  private user: string;
  private pwd: string;

  constructor(accountno: string, user: string, pwd: string) {
    this.accountno = accountno;
    this.user = user;
    this.pwd = pwd;
  }

  /**
   * build query string for send SMS request
   * @param phone target phone no.
   * @param message message body
   */
  public buildQueryString(phone: string, msg: string) {
    const {accountno, user, pwd} = this;

    // build query string + url encode msg
    return qs.stringify({phone, msg, accountno, user, pwd});
  }
}

@Injectable()
export class SMSAccessyouService extends SMSService {
  private config: AccessyouConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly iamService: IamService,
    @Inject(SMS_MODULE_OPTION)
    private readonly options: SMSModuleOption
  ) {
    super();
  }

  public async send(model: SMSSendModel): Promise<any> {
    if (!this.options.enable) {
      // SMS not enabled, throw exception
      throw Error('SMS not enabled');
    }

    // get IAM for accessyou
    const iam = await this.iamService.findOne(
      {
        type: 'SMS',
        subType: 'accessyou',
        workspace: model.workspace
      },
      {
        decryptCredential: true,
        fields: ['accountno', 'user', 'pwd']
      }
    );

    if (!iam) {
      console.warn('IAM not found');
      return;
    }

    // setup Accessyou config
    const accessyouConfig = new AccessyouConfig(
      iam.credentials.accountno,
      iam.credentials.user,
      iam.credentials.pwd
    );

    // send sms by accessyou api
    const queryString = accessyouConfig.buildQueryString(
      model.to.replace('+', ''),
      model.body
    );
    const response = await this.httpService
      .get(
        `https://vercode.accessyou-anyip.com/sms/sendsms-vercode.php?${queryString}`
      )
      .toPromise();

    return response;
  }
}
