import twilio from 'twilio';
import {Injectable, Inject} from '@nestjs/common';

import {SMSModuleOption} from '../interfaces';
import {SMS_MODULE_OPTION} from '../constants';
import {SMSSendModel} from '../models/sms.send.model';
import {SMSService} from './sms.service';
import {IamService} from 'src/modules/Iam/iam.service';

@Injectable()
export class SMSTwilioService extends SMSService {
  constructor(
    private readonly iamService: IamService,
    @Inject(SMS_MODULE_OPTION)
    private readonly options: SMSModuleOption
  ) {
    super();
  }

  /**
   * send Twilio Authy verify
   * @param model model
   */
  public async authyVerify(model: {
    workspace: string;
    phone: string;
    channel: string;
    language: string;
  }) {
    if (!this.options.enable) {
      // SMS not enabled, throw exception
      throw Error('SMS not enabled');
    }

    // get IAM for twilio
    const iam = await this.iamService.findOne(
      {
        type: 'SMS',
        subType: 'twilio',
        workspace: model.workspace
      },
      {
        decryptCredential: true,
        fields: ['accountSid', 'authToken', 'verifyServiceId']
      }
    );

    if (!iam) {
      console.warn('IAM not found');
      return;
    }

    // create twilio instance
    const client = twilio(
      iam.credentials.accountSid,
      iam.credentials.authToken
    );

    // create authy message request
    await client.verify
      .services(iam.credentials.verifyServiceId)
      .verifications.create({
        to: `${model.phone}`,
        channel: model.channel,
        locale: model.language
      });
  }

  /**
   * verify user input for Authy
   * @param model model
   */
  public async authyVerifyCheck(model: {
    code: string;
    phone: string;
    channel: string;
    workspace: string;
  }) {
    if (!this.options.enable) {
      // SMS not enabled, throw exception
      throw Error('SMS not enabled');
    }

    // get IAM for twilio
    const iam = await this.iamService.findOne(
      {
        type: 'SMS',
        subType: 'twilio',
        workspace: model.workspace
      },
      {
        decryptCredential: true,
        fields: ['accountSid', 'authToken', 'verifyServiceId']
      }
    );

    if (!iam) {
      console.warn('IAM not found');
      return;
    }

    // create twilio instance
    const client = twilio(
      iam.credentials.accountSid,
      iam.credentials.authToken
    );

    // verify with twilio api
    const response = await client.verify
      .services(iam.credentials.verifyServiceId)
      .verificationChecks.create({
        to: model.phone,
        code: model.code
      });

    return response.status === 'approved';
  }

  public async send(model: SMSSendModel): Promise<any> {
    if (!this.options.enable) {
      // SMS not enabled, throw exception
      throw Error('SMS not enabled');
    }

    // get IAM for twilio
    const iam = await this.iamService.findOne(
      {
        type: 'SMS',
        subType: 'twilio',
        workspace: model.workspace
      },
      {decryptCredential: true, fields: ['accountSid', 'authToken']}
    );

    if (!iam) {
      console.warn('IAM not found');
      return;
    }

    // create twilio client
    const twilioClient = twilio(
      iam.credentials.accountSid,
      iam.credentials.authToken
    );

    // send sms through twilio
    return twilioClient.messages.create({
      from: iam.credentials.phoneNo,
      ...model
    });
  }
}
