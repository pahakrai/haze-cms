interface IWorkspace {
  _id: string;
  code?: string;
  logo?: IFileMeta;
  status?: number;
  name?: string;
  type?: string;
  webHost?: string;
  alwaysHttpsWebHost?: boolean;
  setting?: IWorkspaceSetting;
  contacts?: IWorkspaceContact[];
  marketing?: IWorkspaceMarketing;
  socialLinks?: { [key: string]: { name?: string; url?: string } };
  facebookPixelCode?: string;
  preferences: IWorkspacePreferences;
  serviceApps?: {
    facebook?: {
      appId?: string;
    };
    google?: {
      web?: {
        appId?: string;
      };
      ios?: {
        appId?: string;
      };
      android?: {
        appId?: string;
      };
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

interface IWorkspaceSetting {
  logo?: IFileMeta;
  favicon?: IFileMeta;
  headerLogo?: IFileMeta;
  loginBackgroundImage?: IFileMeta;
  theme?: ITheme;
}
interface IWorkspaceContact {
  name?: string;
  department?: string;
  phoneNo?: string;
  ext?: string;
  email?: string;
  address?: string;
  coordinates?: number[];
  serviceHour?: IWorkspaceServiceHour;
}

interface IWorkspacePreferences {
  product: IWorkspacePreferenceProduct;
}

interface IWorkspacePreferenceProduct {
  isEnableCart: Boolean;
  hasDeliveryAndPaymentInfo: Boolean;
}

interface WorkScheduleWorktime {
  from: String;
  to: String;
}

interface IWorkspaceServiceHour {
  worktime: WorkScheduleWorktime;
  workdays: [String];
  timeTableDescription: String;
}
interface IWorkspaceMarketing {
  googleTagManager: string;
  facebookPixel: string;
}

interface IWorkspacePaymentMethod {
  _id: string;
  workspace?: IWorkspace;
  paymentMethod?: IPaymentMethod;
  url?: string;
  platforms?: string[];
  credential?: IWorkspacePaymentMethodCredential;
}

interface IPaymentMethod {
  _id: string;
  code?: string;
  name?: string;
  isActive?: boolean;
  defaultCurrency?: string;
  chargeValue?: number;
  chargeSymbol?: string;
  adminCharge?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface IWorkspacePaymentMethodCredential {
  publicKey?: string;
}

interface ITheme {
  _id: string;
  icons?: {
    facebook?: string;
    youtube?: string;
    instagram?: instagram;
  };
}
interface IWorkspaceTypeFile {
  name: string;
  fileType: string;
}
interface IWorkspaceType {
  _id?: string;
  type?: string;
  userType?: string;
  files?: IWorkspaceTypeFile[];
  createdAt?: string;
  updatedAt?: string;
}

interface IWorkspaceApp {
  _id: string;
  name?: string;
  productionIOS?: IVersionInfo;
  productionAndroid?: IVersionInfo;
  appId?: string;
  appIconLink?: string;
  appleTouchIcon?: string;
  androidTouchIcon?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IVersionInfo {
  latestVersionNo?: string;
  appId?: string;
  appIconLink?: string;
  touchIcon?: string;
}
