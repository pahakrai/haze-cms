/* eslint-disable max-len */
'use strict';
import {Injectable, HttpService, BadRequestException} from '@nestjs/common';
import {ObjectId} from 'mongodb';
import common from '@golpasal/common';
// core
import {NotFoundException, MongodbHelper, LocalizeStringSchema} from 'src/core';
import {BaseService} from 'src/core/layers';
import {Locale} from 'src/core/locale';

// models and interfaces
import {INotificationService, INotification} from './interfaces';
import {PushNotificationCreateModel} from '../PushNotification/models';
import {NotificationCreateModel, NotificationToUserCreateModel} from './models';
import {NotificationCreateOptionsModel} from './models/notification.createOptions.model';

// services
import {AWSSQSService} from '../Aws/aws.sqs.service';
import {ParamService} from '../Param/param.service';
import {MailerService} from '../Mailer/mailer.service';
import {SMSService} from '../Sms/services/sms.service';
import {AWSCloudWatchService} from '../Aws/aws.cloudwatch.service';
import {PushNotificationService} from '../PushNotification/pushNotification.service';
import {
  UserNotificationService,
  IUserNotification,
  UserNotificationCreateModel
} from '../UserNotification';
import {WorkspaceService} from '../Workspace/workspace.service';

const {NotificationMediaType, ParamType} = common.type;
// TODO: better way to handle locale for translates
// when we declare our own
const localeInstance = new Locale({
  accept: Object.keys(LocalizeStringSchema).reduce((obj, l) => {
    obj[l] = [];
    return obj;
  }, {})
});

@Injectable()
export class NotificationService
  extends BaseService<INotification>
  implements INotificationService
{
  constructor(
    private readonly userNotificationService: UserNotificationService,
    private readonly pushNotificationService: PushNotificationService,
    // private readonly userNotificationSocket: UserNotificationSocket,
    private readonly mailerService: MailerService,
    private readonly httpService: HttpService,
    private readonly workspaceService: WorkspaceService,
    private readonly paramService: ParamService,
    private readonly sqsService: AWSSQSService,
    private readonly cloudWatchService: AWSCloudWatchService,
    private readonly smsService: SMSService
  ) {
    super();
  }
  /**
   *
   * @param createNotificationModel.sender required who send notification
   * @param createNotificationModel.to required send who
   * @param createNotificationModel.message required message body
   * @param createNotificationModel.data optional data
   */
  public async push(
    notifications: NotificationCreateModel,
    options: NotificationCreateOptionsModel = {
      sendPushNotification: true,
      sendUserNotification: true
    }
  ): Promise<null> {
    const opts = {
      sendPushNotification: true,
      sendUserNotification: true,
      ...options
    };
    if (options.delayDate && options.delayDate > new Date()) {
      const {delayDate, ...otherOptions} = options;
      await this.pushDelayNotification(notifications, otherOptions, delayDate);
    }
    switch (notifications.notificationMediaType) {
      case NotificationMediaType.SMS:
        // send sms
        await this.sendSMSNotification(notifications);
        break;
      case NotificationMediaType.EMAIL:
        // send email
        await this.sendEmailNotification(notifications);
        break;
      case NotificationMediaType.MOBILE:
      default:
        // default send pushNotification
        await this.sendMobileNotification(notifications, opts);
        break;
    }
    return null;
  }

  protected async pushDelayNotification(
    notification: NotificationCreateModel,
    options: NotificationCreateOptionsModel,
    delayDate: Date
  ): Promise<string> {
    const baseApiUrl = `${process.env.HOST_API}${
      process.env.HOST_API_USE_PORT === 'true' ? ':' + process.env.APP_PORT : ''
    }`;
    let queueId = null;
    const payload = {
      data: {notification, options},
      url: `${baseApiUrl}/notifications`,
      method: 'post'
    };
    // put to CloudWatch Event
    // TODO: need push name in common
    const name = `${'push_notification'}_${MongodbHelper.generateObjectId()}`;
    // if time already in the past, set delay to send in 5
    // seconds from now instead
    const delayDateCleansed =
      delayDate < new Date()
        ? new Date(new Date().valueOf() + 5000)
        : delayDate;
    await this.cloudWatchService.createEvent(name, delayDateCleansed, payload);
    queueId = name;

    // return queue id
    return queueId;
  }

  /**
   * to translate object notification.data.parameters for any fields
   * that has a prefix of `t_` and value is an object with `id` (id of
   * translate) and optional `values` (arguments of translate)
   *
   * @param fields parameters field in notification.data.parameters
   * @param language language we want to translate to (ie. en, zh-hk)
   */
  public localizeParameterFields(
    fields: {[key: string]: any},
    language: string
  ) {
    return Object.keys(fields).reduce((obj, field) => {
      if (/^t_/.test(field)) {
        if (fields?.[field]?.id) {
          obj[field.replace(/^t_/, '')] = localeInstance.t(
            fields[field].id,
            (fields[field].values || []).map(v => {
              return v.replace(/^\$(.*)/g, (match, p1) => {
                return p1.split('.').reduce((o, p) => {
                  return o[p];
                }, obj);
              });
            }),
            language
          );
        } else if (fields?.[field]?.[language]) {
          obj[field.replace(/^t_/, '')] = fields[field][language].replace(
            /\{([\w._]+)\}/,
            (match, p1) => {
              return p1.split('.').reduce((item, cur) => item[cur], fields);
            }
          );
        } else {
          obj[field] = fields[field];
        }
      } else {
        obj[field] = fields[field];
      }
      return obj;
    }, {});
  }

  /**
   *
   * @param hooks create jobs for all hook urls in a notification
   */
  public async handleHooks(hooks: string[] = []) {
    return this.putJobDoHooks(hooks.map(h => ({data: {}, url: h, delay: 10})));
  }

  public async sendHookNotification(notifications: NotificationCreateModel) {
    await this.handleHooks(notifications.hooks);
  }

  private async sendMobileNotification(
    notifications: NotificationCreateModel,
    options: any = {sendPushNotification: true, sendUserNotification: true}
  ): Promise<void> {
    // TODO: need to check if userNotification works
    //       and should also take user from devices
    let userNotification: IUserNotification;
    if (options.sendUserNotification) {
      const userNotificationObj = this.generateUserNotification(notifications);
      try {
        userNotification = await this.userNotificationService.create(
          userNotificationObj
        );
      } catch (err) {
        // error can be no user found
        if (err?.response?.code !== 'err_no_users') {
          throw err;
        }
        // if no user found, just ignore
      }
      // if user notification found
      if (userNotification) {
        // socket send user notifications
        let userNotificationSocketPromiseArray = [];
        if (userNotification?.users && userNotification?.users?.length) {
          userNotificationSocketPromiseArray = userNotification.users.map(
            user => this.sendUserNotificationBySocket(user, userNotification)
          );
        }
        Promise.all(userNotificationSocketPromiseArray);
      }
    }
    if (options.sendPushNotification) {
      const pushNotification = this.generatePushNotification(notifications);
      const userNotificationId = userNotification?._id?.toHexString();
      if (userNotificationId) {
        pushNotification.userNotification = userNotificationId;
        pushNotification.message.data.parameters.userNotification =
          userNotificationId;
      }

      await this.pushNotificationService.create(pushNotification);
    }
    await this.handleHooks(notifications.hooks);
  }

  private async sendUserNotificationBySocket(
    toUser: NotificationToUserCreateModel,
    notification: IUserNotification
  ): Promise<void> {
    if (!toUser.language) {
      const userObj = toUser.user;
      if (userObj && userObj.preferences) {
        toUser.language = userObj.preferences.language;
      }
    }
    // TODO: better way to handle localizing and resolving property for
    // socket?
    // const localizeNotification =
    this.userNotificationService.dto(notification, {
      localize: true,
      lang: toUser.language || process.env.LANGUAGE_DEFAULT
    });
    // this.userNotificationSocket.sendNotification(null, {
    //   notification: {...localizeNotification, users: [toUser]}
    // });
  }

  private async sendSMSNotification(
    notifications: NotificationCreateModel
  ): Promise<void> {
    const users = await this._getToUserUsers(notifications);
    // TODO: can support batch?
    let lang;
    await Promise.all(
      users.map(async user => {
        lang = user?.preferences?.language || process.env.LANGUAGE_DEFAULT;
        this.smsService.send({
          workspace: user.currentWorkspace.toHexString(),
          to: `${user?.phoneRegionCode}${user?.phone}`,
          body: localeInstance.stringFormat(
            notifications.body[
              user?.preferences?.language || process.env.LANGUAGE_DEFAULT
            ],
            Object.values(
              this.localizeParameterFields(
                notifications.data.parameters || {},
                lang
              )
            )
          )
        });
      })
    );

    await this.handleHooks(notifications.hooks);
  }

  protected async _getToUserUsers(
    notifications: NotificationCreateModel
  ): Promise<any[]> {
    const {toUsers} = notifications;
    const userObjs = toUsers.map(u => u.user);
    return [...userObjs];
  }

  private async sendEmailNotification(
    notifications: NotificationCreateModel
  ): Promise<void> {
    // todo: send email notification
    if (!notifications || !(notifications.toUsers instanceof Array)) {
      throw new BadRequestException({
        code: 'send email param toUsers must be a array'
      });
    }
    // need to get the email body by notifications.data.screen from aws
    const users = await this._getToUserUsers(notifications);
    // const sendEmailResults =
    await Promise.all(
      users.map(async user => {
        await this.sendEmail(notifications, user);
      })
    );
    // handle hook if have
    await this.handleHooks(notifications.hooks);
  }

  private async sendEmail(notifications: NotificationCreateModel, user) {
    const lang =
      user && user.preferences && user.preferences.language
        ? user.preferences.language
        : 'en';
    const emailBody = await this.generateEmailBody(notifications, user);

    const subject = notifications.title ? notifications.title[lang] : '';

    return this.mailerService.createMailJob({
      subject,
      to: user.email,
      body: emailBody,
      workspace: user.currentWorkspace.toHexString()
    });
  }

  public async generateEmailBody(
    notifications: NotificationCreateModel,
    user
  ): Promise<any> {
    const companyInfo: any = await this.paramService.getParameter(
      ParamType.COMPANY_INFO
    );

    const workspace = await this.workspaceService.findById(
      user?.currentWorkspace
    );

    if (!workspace) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_param'}
      });
    }

    const workspaceInfo = await this.workspaceService.getParameters(
      'setting',
      user?.currentWorkspace?.toHexString()
    );

    const workspaceTheme = await this.workspaceService._populate(workspace, [
      'setting.theme'
    ]);
    const workspaceJson: any = workspaceTheme ? workspaceTheme.toJSON() : {};
    const theme = workspaceJson?.setting?.theme as any;
    const workspaceContact = await this.workspaceService.getWorkspaceContact(
      user?.currentWorkspace?.toHexString()
    );

    const lang =
      user && user.preferences && user.preferences.language
        ? user.preferences.language
        : 'en';

    const emailData: any = {...notifications};

    if (lang) {
      this._mapToDisplay(companyInfo, lang);
    }
    /* START OF DATA PREPARATION */
    // TODO: should move these info to workspace
    emailData.iconFacebook = theme?.icons?.facebook;
    emailData.iconInstagram = theme?.icons?.instagram;
    emailData.facebookPath = workspace?.socialLinks?.facebook?.url;
    emailData.instagramPath = workspace?.socialLinks?.instagram?.url;
    emailData.address = companyInfo?.address;
    // NOTE: Prep workpace data
    emailData.appName = workspace?.name;
    emailData.logoUrl = workspaceInfo?.headerLogo;
    emailData.support_phone = workspaceContact?.phoneNo;
    emailData.support_email = workspaceContact?.email;
    // NOTE: Prep user data
    emailData.user = user;
    // NOTE: Prep generic greetings and locale instances
    emailData.title = notifications.title[lang];
    emailData.greeting_hi = localeInstance.t('display_hi', [], lang);
    emailData.greeting_hello = localeInstance.t('display_hello', [], lang);
    emailData.greeting = localeInstance.t(
      'email_greeting',
      [user.username],
      lang
    );
    emailData.appTeamName = localeInstance.t(
      'email_footer_content',
      [emailData.appName],
      lang
    );
    emailData.signOff = localeInstance.t('email_sign_off', [], lang);
    emailData.email_footer_content = localeInstance.t(
      'email_footer_content',
      [emailData.appName],
      lang
    );
    emailData.autoDelivery = localeInstance.t(
      'display_no_need_reply',
      [],
      lang
    );
    emailData.setting_reply = localeInstance.t(
      'display_setting_reply',
      [],
      lang
    );
    // END OF DATA PREPARATION
    let emailBody: any = '';
    if (
      notifications.data.screen.endsWith('.ejs') &&
      !(
        notifications.data.screen.startsWith('http') ||
        notifications.data.screen.startsWith('https')
      )
    ) {
      emailBody = await this.mailerService.getEmailTemplate(
        notifications.data.screen,
        {
          language: lang,
          ...emailData,
          ...this.localizeParameterFields(
            {
              language: lang,
              ...emailData,
              ...notifications.data.parameters
            },
            lang
          )
        }
      );
    } else {
      const requestEmailBody: any = await this.httpService
        .request({
          method: 'get',
          url: notifications.data.screen
        })
        .toPromise();
      emailBody = requestEmailBody.data;
    }
    return emailBody;
  }

  /**
   * generate user notification
   * @param notifications NotificationCreateModel
   */
  public generateUserNotification(
    notifications: NotificationCreateModel
  ): UserNotificationCreateModel {
    const _id = new ObjectId().toHexString();
    const userNotification = {
      _id,
      senders: notifications.senders,
      users: notifications.toUsers,
      devices: notifications.toDevices,
      title: notifications.title,
      images: notifications.images,
      data: {
        ...notifications.data,
        parameters: {
          ...notifications.data.parameters,
          userNotification: _id
        }
      },
      message: notifications.body
      // nav: {
      //   type: 'Deals', // current default Deals, need to do .....
      //   item: notifications.data.parameters
      // }
    };
    return userNotification;
  }

  /**
   * generate push notification
   * @param notifications NotificationCreateModel
   */
  public generatePushNotification(
    notifications: NotificationCreateModel
  ): PushNotificationCreateModel {
    const pushNotification = {
      sender: notifications.senders?.[0],
      toUsers: notifications.toUsers
        ? notifications.toUsers.map(user =>
            typeof user.user === 'string'
              ? user.user
              : user.user._id.toHexString()
          )
        : null,
      toDevices: notifications.toDevices,
      message: {
        data: notifications.data,
        title: notifications.title,
        body: notifications.body
      },
      hooks: notifications.hooks || []
    };
    return pushNotification;
  }

  /**
   * put array of jobs to do something when pushed notification
   * @param data data obj
   * @param url request url
   * @param delay delay seconds
   */
  public async putJobDoHooks(
    hooks: Array<{data: any; url: string; delay: number}>
  ): Promise<string[]> {
    return Promise.all(hooks.map(h => this.putJobDoHook(h)));
  }

  /**
   * put job to do something when pushed notification
   * @param data data obj
   * @param url request url
   * @param delay delay seconds
   */
  public async putJobDoHook(hook: {
    data: any;
    url: string;
    delay: number;
  }): Promise<string> {
    return this.sqsService.sendMessage(
      hook.data,
      {url: hook.url, method: 'post'},
      hook.delay
    );
  }
}
