import {Injectable, Scope} from '@nestjs/common';
import {Locale} from 'src/core';
import common from '@golpasal/common';
const {AcPolicyAction} = common.method;

import {ACService} from '../Ac/ac.service';
import {UserService} from '../User';
import {NotificationService} from '../Notification/notification.service';
import {ContactUsModel} from './models';
import {WorkspaceService} from '../Workspace/workspace.service';
import {FileMeta} from '../File';

const {NotificationMediaType} = common.type;

@Injectable({scope: Scope.REQUEST})
export class EnquiryService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly acService: ACService,
    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService
  ) {}

  public async contactUs(
    model: ContactUsModel,
    locale: Locale,
    workspaceId: string
  ) {
    const workspace = await this.workspaceService.findById(workspaceId, {
      populates: ['setting.headerLogo']
    });

    // get users which has ENQUIRY_RECEIVE_NOTIFICATION rights
    const userIds = await this.acService.getUserIdsByActions([
      AcPolicyAction.ENQUIRY_RECEIVE_NOTIFICATION
    ]);
    // filter users by workspaces
    const users = await this.userService.findByIds(userIds);

    if (users.length > 0) {
      try {
        // send to emails
        await this.notificationService.push({
          toUsers: users.map(u => ({user: u})),
          notificationMediaType: NotificationMediaType.EMAIL,
          title: locale.tAll('email_user_contact_enquiry_subject'),
          data: {
            screen: './email/enquiry.ejs',
            parameters: {
              logoUrl: (workspace.setting.headerLogo as FileMeta).uri,
              fackbookPath: workspace.socialLinks.facebook?.url,
              instagramPath: workspace.socialLinks.instagram?.url,
              name: model.name,
              email: model.userEmail,
              message: model.message,
              appName: workspace.name,
              hi: locale.t('display_hi'),
              t_greeting: {
                id: 'email_greeting',
                values: ['$user.name']
              },
              t_email_content: {
                id: 'display_contact_message_content',
                values: [model.name, model.userEmail]
              },
              t_message_content: {
                id: 'display_message_content',
                values: [model.message]
              }
            }
          }
        });
      } catch (e) {
        throw new Error(e);
      }
    }

    return true;
  }

  public async createEnquiry(input: string, locale: Locale) {
    // get users which has ENQUIRY_RECEIVE_NOTIFICATION rights
    const userIds = await this.acService.getUserIdsByActions([
      AcPolicyAction.ENQUIRY_RECEIVE_NOTIFICATION
    ]);
    // filter users by workspaces
    const users = await this.userService.findByIds(userIds);
    if (users.length > 0) {
      try {
        // send to emails
        this.notificationService.push({
          toUsers: users.map(u => ({user: u})),
          notificationMediaType: NotificationMediaType.EMAIL,
          title: locale.tAll('email_user_enquiry_subject'),
          data: {
            screen: './email/enquiry.ejs',
            parameters: {
              t_email_content: {
                id: 'email_content_enquiry',
                values: [input, '$user_contact']
              },
              t_greeting: {
                id: 'email_greeting',
                values: ['$user.name']
              }
            }
          }
        });
      } catch (e) {
        throw new Error(e);
      }
    }
    return true;
  }

  public async requestTrialEventCampaign(input: string, locale: Locale) {
    // get users which has ENQUIRY_RECEIVE_NOTIFICATION rights
    const userIds = await this.acService.getUserIdsByActions([
      AcPolicyAction.ENQUIRY_RECEIVE_NOTIFICATION
    ]);
    // filter users by workspaces
    const users = await this.userService.findByIds(userIds);
    if (users.length > 0) {
      try {
        // send to emails
        this.notificationService.push({
          toUsers: users.map(u => ({user: u})),
          notificationMediaType: NotificationMediaType.EMAIL,
          title: locale.tAll('email_user_enquiry_subject1'),
          data: {
            screen: './email/requestTrialCourse.ejs',
            parameters: {
              t_email_content1: {
                id: 'email_content_enquiry1',
                values: [input, '$user_contact']
              },
              t_greeting: {
                id: 'email_greeting',
                values: ['$user.name']
              }
            }
          }
        });
      } catch (e) {
        throw new Error(e);
      }
    }
    return true;
  }
}
