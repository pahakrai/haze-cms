import {DynamicModule, Module} from '@nestjs/common';

import {AWSModuleOptionModel} from './models';
import {AWS_MODULE_OPTIONS} from './constants';

import {AWSS3Service} from './aws.s3.service';
import {AWSSQSService} from './aws.sqs.service';
import {AWSCloudWatchService} from './aws.cloudwatch.service';
import {AWSLambdaService} from './aws.lambda.service';

@Module({})
export class AWSModule {
  /**
   * initailize a dynamic module
   * https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
   *
   * @param cryptoKey key that used for decrypt credentials
   */
  static forRoot(options: AWSModuleOptionModel): DynamicModule {
    return {
      // global module
      global: true,
      module: AWSModule,
      providers: [
        // inject options to services
        {
          provide: AWS_MODULE_OPTIONS,
          useValue: options
        },
        AWSS3Service,
        AWSSQSService,
        AWSCloudWatchService,
        AWSLambdaService
      ],
      exports: [
        AWSS3Service,
        AWSSQSService,
        AWSCloudWatchService,
        AWSLambdaService
      ]
    };
  }
}
