import {VehicleUpdateModel} from 'src/modules/Vehicle/Vehicle/models';
import {MerchantUpdateModel} from 'src/modules/Merchant/models';
import {MemberUpdateModel} from 'src/modules/Member/models';
import {UserUpdateModel} from 'src/modules/User';

export class FileInfoModel {
  fileType: string;
  of: 'merchant' | 'member' | 'vehicle';
}

export class UserProfileUpdateModel {
  user?: UserUpdateModel;

  merchant?: MerchantUpdateModel;

  member?: MemberUpdateModel;

  vehicle?: VehicleUpdateModel;

  files?: Array<FileInfoModel>;
}
