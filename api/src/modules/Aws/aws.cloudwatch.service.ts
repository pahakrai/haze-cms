import CloudWatchEvents from 'aws-sdk/clients/cloudwatchevents';
import {Injectable, Inject} from '@nestjs/common';
import {AWSLambdaService} from './aws.lambda.service';

import {AWSModuleOptionModel} from './models';
import {AWS_MODULE_OPTIONS} from './constants';
import {IamService} from '../Iam/iam.service';

@Injectable()
export class AWSCloudWatchService {
  private cwe: CloudWatchEvents;
  private lambdaARN: {[key: string]: string};
  constructor(
    private readonly iamService: IamService,
    @Inject(AWS_MODULE_OPTIONS)
    private readonly awsOptions: AWSModuleOptionModel,
    private readonly lambdaService: AWSLambdaService
  ) {
    if (awsOptions.cloudwatchEnable) {
      this.init()
        .then(() => {
          console.info('cloud-watch events Client created successfully.');
        })
        .catch(() => {
          throw new Error('cloud-watch events:: Fails to create client.');
        });
    }
  }

  /**
   * initialize AWS S3 instance
   */
  private async init() {
    // get IAM for S3
    const iam = await this.iamService.findOne(
      {
        type: 'AWS',
        subType: 'cwe'
      },
      {decryptCredential: true, fields: ['accessKeyId', 'secretAccessKey']}
    );

    // throw exception if not found
    if (!iam) {
      throw Error(
        'Fail to initialize CloudWatchEvent engine.\n' +
          'Message: Fails to get IAM information.\n' +
          `User name: ${this.awsOptions.blobUsername || 'Undefined AWS+cwe'}`
      );
    }

    // init cwe client
    this.cwe = new CloudWatchEvents({
      region: iam.params.region,
      accessKeyId: iam.credentials.accessKeyId,
      secretAccessKey: iam.credentials.secretAccessKey
    });
    this.lambdaARN = iam.params.lambdaARN;
  }

  /**
   * generate cron format execution time, only run once
   * @param date execution time, js Date object
   */
  public getExecTime = (date: Date) =>
    `cron(${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} ${
      date.getUTCMonth() + 1
    } ? ${date.getUTCFullYear()})`;

  /**
   * wrap cwe.listTargetsByRule with promise
   * @param ruleName rule name
   */
  public listTargetsByRule = async (ruleName: string) => {
    return new Promise<CloudWatchEvents.Target[]>((resolve, reject) => {
      this.cwe.listTargetsByRule({Rule: ruleName}, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response.Targets);
      });
    });
  };

  /**
   * wrap cwe.putRule with promise
   * @param rule PutRuleRequest object
   */
  putRule = async (rule: CloudWatchEvents.PutRuleRequest) => {
    return new Promise<string>((resolve, reject) => {
      this.cwe.putRule(rule, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response.RuleArn);
      });
    });
  };

  /**
   * wrap cwe.putTarget with promise
   * @param target PutTargetsRequest object
   */
  putTarget = async (target: CloudWatchEvents.PutTargetsRequest) => {
    return new Promise<CloudWatchEvents.PutTargetsResponse>(
      (resolve, reject) => {
        this.cwe.putTargets(target, (err, response) => {
          if (err) {
            reject(err);
          }
          resolve(response);
        });
      }
    );
  };

  /**
   * wrap cwe.removeTargets with promise
   * @param ruleName rule name
   * @param ids id list of rule target(s)
   */
  removeTargets = async (ruleName: string, ids: string[]) => {
    return new Promise<CloudWatchEvents.RemoveTargetsResponse>(
      (resolve, reject) => {
        this.cwe.removeTargets(
          {Ids: ids, Rule: ruleName, Force: true},
          (err, response) => {
            if (err) {
              reject(err);
            }
            resolve(response);
          }
        );
      }
    );
  };

  /**
   *
   * @param name name of event, recommended `${queue_name from common}_${id}`
   * @param date execution time, in Date format
   * @param input parameter, can be stringify
   * @param arnKey lambda function that want to call
   */
  createEvent = async (
    name: string,
    date: Date,
    input: any,
    arnKey = 'ptimes_cloudwatch_event'
  ) => {
    const rule = {
      Name: name,
      State: 'ENABLED',
      ScheduleExpression: this.getExecTime(date),
      Description: `${date.toLocaleString('zh-HK', {
        timeZone: 'Asia/Hong_Kong'
      })} GMT+8`
    };

    // create new rule
    const ruleArn = await this.putRule(rule);

    // add lambda permission to new rule
    const lambdaArn = this.lambdaARN[arnKey];
    await this.lambdaService.addCloudWatchEventPermission(lambdaArn, ruleArn);

    // attach lambda job to rule
    await this.putTarget({
      Rule: name,
      Targets: [
        {
          Id: arnKey,
          Arn: lambdaArn,
          Input: JSON.stringify({...input, ruleName: name})
        }
      ]
    });
  };

  /**
   * delete event rule by name
   * @param name name of the rule
   */
  deleteEvent = async (name: string) => {
    // get all targets
    const targets = await this.listTargetsByRule(name);
    if (targets.length === 0) {
      console.warn('event %s not found', name);
      return;
    }
    const ids = targets.map(target => target.Id);

    // remove all targets from rule
    await this.removeTargets(name, ids);

    return new Promise((resolve, reject) => {
      this.cwe.deleteRule({Name: name, Force: true}, err => {
        if (err) {
          console.error('delete event failed', err);
          reject(err);
        }
        resolve(true);
      });
    });
  };

  /**
   * Update event execution time
   * @param name name of the rule
   * @param date the new execution time
   */
  updateEvent = async (name, date) => {
    await this.putRule({
      Name: name,
      ScheduleExpression: this.getExecTime(date),
      Description: `${date.toLocaleString('zh-HK', {
        timeZone: 'Asia/Hong_Kong'
      })} GMT+8`
    });
  };
}
