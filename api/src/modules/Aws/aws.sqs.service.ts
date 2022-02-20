import SQS from 'aws-sdk/clients/sqs';
import {Injectable, Inject} from '@nestjs/common';

import {AWSModuleOptionModel} from './models';
import {AWS_MODULE_OPTIONS} from './constants';
import {IamService} from '../Iam/iam.service';

@Injectable()
export class AWSSQSService {
  private sqs: SQS;

  constructor(
    private readonly iamService: IamService,
    @Inject(AWS_MODULE_OPTIONS)
    private readonly awsOptions: AWSModuleOptionModel
  ) {
    if (this.awsOptions.queueEnable) {
      this.init()
        .then(() => {
          console.info('SQS Client created successfully.');
        })
        .catch(() => {
          throw new Error('SQS:: Fails to create client.');
        });
    }
  }

  private async init() {
    // get IAM for sqs
    const iam = await this.iamService.findOne(
      {
        type: 'AWS',
        subType: 'sqs',
        'credentials.name': process.env.QUEUE_USERNAME
      },
      {decryptCredential: true, fields: ['accessKeyId', 'secretAccessKey']}
    );

    // throw exception if not found
    if (!iam) {
      throw Error('Failed to get IAM information');
    }

    // init SQS client
    this.sqs = new SQS({
      region: iam.params.region,
      accessKeyId: iam.credentials.accessKeyId,
      secretAccessKey: iam.credentials.secretAccessKey
    });
  }

  /**
   * wrap sqs.getQueueUrl with promise
   * @param queueName queue name
   */
  private async getQueueUrl(queueName: string) {
    const response = await this.sqs
      .getQueueUrl({QueueName: queueName})
      .promise();

    return response.QueueUrl;
  }

  /**
   * send message to SQS queue
   * @param queueName queue name
   * @param data message data
   * @param params message attributes
   * @param delay message delay (in seconds)
   */
  public async sendMessage(data: any, params: any, delay = 0) {
    // blueprint of message
    const message: SQS.SendMessageRequest = {
      QueueUrl: '',
      MessageBody: JSON.stringify(data),
      DelaySeconds: delay,
      MessageAttributes: {}
    };

    // add attributes
    Object.entries(params).forEach(([key, value]) => {
      message.MessageAttributes[key] = {
        DataType: 'String',
        StringValue: String(value)
      };
    });

    // get queue's url
    const queueUrl: string = await this.getQueueUrl(this.awsOptions.queueName);
    message.QueueUrl = queueUrl;

    // send message
    const response = await this.sqs.sendMessage(message).promise();

    // return message id
    return response.MessageId;
  }
}
