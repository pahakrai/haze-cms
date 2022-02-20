import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {ITheme} from 'src/modules/Theme/interfaces';
import {FileMeta} from 'src/modules/File/FileMeta';

interface WorkspacePreferenceAuth {
  /**
   * max no. of device can login to a user in the same time
   * if 0, not limited
   */
  authorizedDeviceLimit?: {
    [key: string]: number;
  };

  /**
   * how many times to send request pass code limit
   */
  dailyRequestPasscodeLimit: number;

  /**
   * twilio login config
   */
  twilioLogin: {
    /**
     * channel name for .verify.services('VAXX').verifications.create()
     */
    channel: 'call' | 'email' | 'sms';

    /**
     * whether use Twilio Authy or our own authentication
     */
    useAuthy: boolean;
  };

  subscription: boolean;
}

interface WorkspacePreferenceEvent {
  /**
   * time that not allow modify event before it start (in ms)
   */
  notAllowModifyIn: number;

  /**
   * maxinum no. of PIC allowed for an event
   * 0 for unlimited
   */
  peopleInChargeLimit: number;
}

interface WorkspacePreferencePayroll {
  /**
   * payroll calculationMethod
   */
  calculationMethod: string;

  /**
   * payroll calculateAmountByDetails
   */
  calculateAmountByDetails: boolean;
}

interface WorkspaceUserTypePreference {
  icon: FileMeta | FileMeta['_id'];
  allowChangePhone: boolean;
}

interface WorkspaceReceiptModel {
  backgroundImage: FileMeta | FileMeta['_id'];
}

interface WorkspaceOrderModel {
  subscription: boolean;
  dailyCancelLimit: number;
  hasConsignee: boolean;
  hasInvoice: boolean;
  allowEdit: boolean;
  allowShoppingNoAddress: boolean;
  clientUserTypes: string[];
  consumeCredit: boolean;
  enableSignature: boolean;
  locationType: 'location' | 'store';
  updatePeopleInCharge: boolean;
  acceptOrderCoolingOffPeriod: number;
}
('');

interface WorkspaceServiceModel {
  pricing: boolean;
}

interface WorkspaceProductModel {
  isEnableCart: boolean;
  hasDeliveryAndPaymentInfo: boolean;
}

interface WorkspacePushNotificationModel {
  paymenTransactionStatusUpdate: boolean;
  userStatusUpdate: boolean;
  userActiviationIssueAdd: boolean;
}

interface WorkspacePreference {
  /**
   * auth/3rd party login related preference
   */
  auth?: WorkspacePreferenceAuth;

  /**
   * event-related preference
   */
  event: WorkspacePreferenceEvent;

  /**
   * widgets preference
   */
  widgets: string[];

  /**
   * payroll preference
   */
  payroll: WorkspacePreferencePayroll;

  /**
   * member preference
   */
  member?: WorkspaceUserTypePreference;

  /**
   * merchant preference
   */
  merchant?: WorkspaceUserTypePreference;

  /**
   * receipt preference
   */
  receipt: WorkspaceReceiptModel;

  /**
   * order preference
   */
  order: WorkspaceOrderModel;

  /**
   * service preference
   */
  service: WorkspaceServiceModel;

  /**
   * product preference
   */
  product: WorkspaceProductModel;

  /**
   * push Notification preference
   */
  pushNotification: WorkspacePushNotificationModel;
}

interface WorkspaceSetting {
  /**
   * workspace logo
   */
  logo: FileMeta | FileMeta['_id'];

  /**
   * browser favicon
   */
  favicon: FileMeta | FileMeta['_id'];

  /**
   * header image of workspace page
   */
  headerLogo: FileMeta | FileMeta['_id'];

  /**
   * background image in the login screen
   */
  loginBackgroundImage: FileMeta | FileMeta['_id'];

  /**
   * frontend theme
   */
  theme: ITheme | ITheme['_id'];

  /**
   * the max value for user rating, mostly 5 (0-5) or 100 (0-100)
   */
  ratingMaxValue: number;
}

interface WorkspaceContact {
  /**
   * name of contact person
   */
  name: string;

  /**
   * department of the contact person
   */
  department: string;

  /**
   * phone number
   */
  phoneNo: string;

  /**
   * phone extension
   */
  ext: string;

  /**
   * email address
   */
  email: string;

  /**
   * address
   */
  address: string;
}

export interface WorkspaceMarketing {
  /**
   * googleTagManager
   */
  googleTagManager: string;

  /**
   * facebookPixel
   */
  facebookPixel: string;
}

interface WorkspaceHookHeader {
  /**
   * header key
   */
  key: string;

  /**
   * header value
   */
  value: string;
}

export interface WorkspaceHooks {
  /**
   * headers used when calling hook
   */
  headers: WorkspaceHookHeader[];

  /**
   * code
   */
  code: string;

  /**
   * hook request method
   */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  /**
   * url
   */
  url: string;
}

export interface WorkspaceIntegrations {
  /**
   * app
   */
  app: string;

  /**
   * hooks
   */
  hooks: WorkspaceHooks[];
}

export interface ServiceAppCredentials {
  appId: string;
  secret: string;
}

export interface ServiceApps {
  facebook: ServiceAppCredentials;
  google: ServiceAppCredentials;
}

export interface Workspace extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;

  /**
   * secret of workspace
   */
  secret: string;

  /**
   * unique workspace code
   */
  code: string;

  /**
   * company name
   */
  name: string;

  /**
   * workspace type eg:- logistics, education, shopping, etc.
   */
  type: string;

  /**
   * workspace defaultCurrency
   */
  defaultCurrency: string;

  /**
   * workspace status
   */
  status: number;

  /**
   * webHost
   */
  webHost: string;

  /**
   * secure webHost
   */
  alwaysHttpsWebHost: boolean;

  /**
   * merchantWebHost
   */
  merchantWebHost: string;

  /**
   * secure merchantWebHost
   */
  alwaysHttpsMerchantWebHost: boolean;

  /**
   * adminHost
   */
  adminHost: string;

  /**
   * secure adminHost
   */
  alwaysHttpsAdminHost: boolean;

  /**
   * setting
   */
  setting: WorkspaceSetting;

  /**
   * preferences
   */
  preferences: WorkspacePreference;

  /**
   * contact list
   */
  contacts: WorkspaceContact[];

  /**
   * integrations list
   */
  integrations: WorkspaceIntegrations[];

  /**
   * social links
   */
  socialLinks: any;

  /**
   * seoMeta
   */
  seoMeta: any;

  /**
   * marketing
   */
  marketing: WorkspaceMarketing;

  /**
   * service apps
   */
  serviceApps: ServiceApps;

  // generated by mongoose
  /**
   * create time of this document
   */
  createdAt: Date;

  /**
   * update time of this document
   */
  updatedAt: Date;
}

export type WorkspaceModel = PaginateModel<Workspace>;
