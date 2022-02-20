import ejs from 'ejs';
import path from 'path';
import {exists} from 'fs';
import express from 'express';
import {promisify} from 'util';
import mailer from 'nodemailer';
import {Inject, Injectable} from '@nestjs/common';

import {MAILER_MODULE_OPTION} from './constants';
import {SendMailModel, CreateMailJobModel} from './models';
import {MailerModuleOption} from './interfaces';
import {AWSSQSService} from '../Aws/aws.sqs.service';
import {IamService} from '../Iam/iam.service';

const existsAsync = promisify(exists);

@Injectable()
export class MailerService {
  constructor(
    private readonly iamService: IamService,
    private readonly sqsService: AWSSQSService,
    @Inject(MAILER_MODULE_OPTION)
    private readonly mailerOptions: MailerModuleOption
  ) {}

  /**
   * create a new mail job
   * if templateFile and data are provided
   *    templateEngine will be used to render mail content
   * if queue is enabled
   *    send mail job will be sent to queue
   * otherwise send mail immediately
   *
   * @param createMailJobModle job model
   */
  public async createMailJob(createMailJobModel: CreateMailJobModel) {
    // validate model
    // receiver required
    if (!createMailJobModel.to) {
      throw new Error('Mail receiver is required');
    }
    // either body or (templateFile & data) required
    if (
      !(
        createMailJobModel.body ||
        (createMailJobModel.templateFile && createMailJobModel.data)
      )
    ) {
      throw new Error('Mail content is required');
    }
    if (createMailJobModel.templateFile && createMailJobModel.data) {
      // check template file exists
      const isTemplateFileExists = await existsAsync(
        createMailJobModel.templateFile
      );

      if (!isTemplateFileExists) {
        throw new Error('Template file not exists');
      }
    }

    // get mail body
    const body =
      createMailJobModel.templateFile && createMailJobModel.data
        ? await this.generateMailBody(
            createMailJobModel.teimplateEngine,
            createMailJobModel.templateFile,
            createMailJobModel.data
          )
        : createMailJobModel.body;

    // create SendMailModel
    const sendMailModel: SendMailModel = {
      body,
      to: createMailJobModel.to,
      subject: createMailJobModel.subject,
      workspace: createMailJobModel.workspace
    };

    // if queue is enabled, create queue job
    if (this.mailerOptions.queueEnabled) {
      return this.sqsService.sendMessage(sendMailModel, {
        method: 'post',
        url: `${this.mailerOptions.apiURL}/mailer/send/`
      });
    }

    // directly send mail here
    return this.sendMail(sendMailModel);
  }

  /**
   * generate html content with template and data
   * @param templateEngine template engine used
   * @param templateFile path of template file
   * @param data data
   */
  public async generateMailBody(
    templateEngine: string,
    templateFile: string,
    data: ejs.Data
  ): Promise<string> {
    let result: string;

    // render template with appropriate template engine
    switch (templateEngine) {
      case 'ejs':
        result = await ejs.renderFile(templateFile, {data});
        break;
    }

    return result;
  }

  /**
   * base function to send mail through nodemailer client
   * @param sendMailModel the mail content
   */
  public async sendMail(sendMailModel: SendMailModel) {
    // get IAM
    const iam = await this.iamService.findOne(
      {
        subType: 'ses',
        workspace: sendMailModel.workspace
      },
      {decryptCredential: true, fields: ['accessKeyId', 'secretAccessKey']}
    );

    if (!iam) return;

    // create mailer transport
    const mailerClient: mailer.Transporter = mailer.createTransport({
      host: iam.params.host,
      port: iam.params.port,
      auth: {
        user: iam.credentials.accessKeyId,
        pass: iam.credentials.secretAccessKey
      }
    });

    return mailerClient.sendMail({
      from: iam.params.from,
      to: sendMailModel.to,
      subject: sendMailModel.subject,
      html: sendMailModel.body,
      attachments: sendMailModel.attachments
    });
  }

  /**
   * base function to build email template based on express engine generated
   * views
   * @param sendMailModel the mail content
   */
  public async getEmailTemplate(
    templatePath: string,
    data: any,
    options?: {
      engine?: string;
      viewDirPath?: string;
    }
  ): Promise<string> {
    const opts = {
      engine: 'ejs',
      viewDirPath: path.join(process.cwd(), 'views'),
      ...options
    };
    const app = express();
    app.set('view engine', opts.engine);
    app.set('views', opts.viewDirPath);
    return new Promise((resolve, reject) => {
      app.render(
        templatePath,
        {
          data
        },
        (err, html) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(html);
          }
        }
      );
    });
  }
}
