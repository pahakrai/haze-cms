import Lambda from 'aws-sdk/clients/lambda';
import {Injectable, Inject} from '@nestjs/common';

import {AWSModuleOptionModel} from './models';
import {AWS_MODULE_OPTIONS} from './constants';
import ObjectId from 'bson-objectid';
import {IamService} from '../Iam/iam.service';

@Injectable()
export class AWSLambdaService {
  private lambda: Lambda;

  constructor(
    private readonly iamService: IamService,
    @Inject(AWS_MODULE_OPTIONS)
    private readonly awsOptions: AWSModuleOptionModel
  ) {
    if (this.awsOptions.queueEnable) {
      this.init()
        .then(() => {
          console.info('lambda Client created successfully.');
        })
        .catch(() => {
          throw new Error('Lambda:: Fails to create client.');
        });
    }
  }

  private async init() {
    // get IAM for sqs
    const iam = await this.iamService.findOne(
      {
        type: 'AWS',
        subType: 'sqs'
      },
      {decryptCredential: true, fields: ['accessKeyId', 'secretAccessKey']}
    );

    // throw exception if not found
    if (!iam) {
      throw Error('Failed to get IAM information');
    }

    // init SQS client
    this.lambda = new Lambda({
      region: iam.params.region,
      accessKeyId: iam.credentials.accessKeyId,
      secretAccessKey: iam.credentials.secretAccessKey
    });
  }

  addCloudWatchEventPermission = (functionName: string, sourceArn: string) => {
    return new Promise((resolve, reject) => {
      this.lambda.addPermission(
        {
          Action: 'lambda:InvokeFunction',
          FunctionName: functionName,
          Principal: 'events.amazonaws.com',
          StatementId: new ObjectId().toHexString(),
          SourceArn: sourceArn
        },
        (err, response) => {
          if (err) {
            reject(err);
          }
          resolve(response);
        }
      );
    });
  };
}
