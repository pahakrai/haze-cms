import {readFile} from 'fs';
import {promisify} from 'util';
import S3 from 'aws-sdk/clients/s3';
import {Injectable, Inject} from '@nestjs/common';

import {AWSModuleOptionModel} from './models';
import {AWS_MODULE_OPTIONS} from './constants';
import {IamService} from '../Iam/iam.service';

const readFileAsync = promisify(readFile);

@Injectable()
export class AWSS3Service {
  private s3: S3;
  private bucket: string;
  private urlPrefix: string;

  constructor(
    private readonly iamService: IamService,
    @Inject(AWS_MODULE_OPTIONS)
    private readonly awsOptions: AWSModuleOptionModel
  ) {
    this.init()
      .then(() => {
        console.info('s3 Client created successfully.');
      })
      .catch(() => {
        throw new Error('s3:: Fails to create client.');
      });
  }

  /**
   * initialize AWS S3 instance
   */
  private async init() {
    // get IAM for S3
    const iam = await this.iamService.findOne(
      {
        'credentials.name': this.awsOptions.blobUsername
      },
      {decryptCredential: true, fields: ['accessKeyId', 'secretAccessKey']}
    );

    // throw exception if not found
    if (!iam) {
      throw Error(
        'Fail to initialize blob engine.\n' +
          'Message: Fails to get IAM information.\n' +
          `User name: ${
            this.awsOptions.blobUsername || 'Undefined BLOB_USERNAME'
          }`
      );
    }

    // init S3 client
    this.s3 = new S3({
      region: iam.params.region,
      accessKeyId: iam.credentials.accessKeyId,
      secretAccessKey: iam.credentials.secretAccessKey
    });
    this.bucket = iam.params.bucket;
    this.urlPrefix = iam.params.host;
  }

  /**
   * delete file in bucket
   * @param filePath file want to delete
   */
  public async deleteFile(filePath: string) {
    return this.s3.deleteObject({Bucket: this.bucket, Key: filePath}).promise();
  }

  /**
   * upload file to S3 bucket
   * @param localPath local path of file to be uploaded
   * @param filePath destination of file upload
   * @param options s3.putObject options
   */
  public async upload(localPath: string, filePath: string, options?: any) {
    // read file to buffer
    const fileContent = await readFileAsync(localPath);

    // upload to S3
    const response = await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: filePath,
        ACL: 'public-read',
        Body: fileContent,
        ...options
      })
      .promise();

    // check upload success or not
    if (response.$response.httpResponse.statusCode === 200) {
      // return url
      return `${this.urlPrefix}/${filePath}`;
    }

    throw new Error(JSON.stringify(response.$response));
  }
}
