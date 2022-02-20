import {DynamicModule, HttpModule, Module} from '@nestjs/common';

import {SMSModuleOption} from './interfaces';
import {SMS_MODULE_OPTION} from './constants';
import {SMSTwilioService} from './services/twilio.service';
import {SMSController} from './sms.controller';
import {SMSService} from './services/sms.service';
import {SMSAccessyouService} from './services/accessyou.service';

const services = {
  twilio: SMSTwilioService,
  accessyou: SMSAccessyouService
};

@Module({})
export class SMSModule {
  /**
   * initailize a dynamic module
   * https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
   *
   * @param options configuration of this module
   */
  static forRoot(options: SMSModuleOption): DynamicModule {
    const controllers = [];

    if (options.enableController) {
      // add controller into SMSModule
      controllers.push(SMSController);
    }

    return {
      // global module
      global: true,
      controllers,
      imports: [HttpModule],
      module: SMSModule,
      providers: [
        // inject options to services
        {
          provide: SMS_MODULE_OPTION,
          useValue: options
        },
        {
          provide: SMSService,
          useClass: services[options.smsProvider]
        }
      ],
      exports: [SMSService]
    };
  }
}
