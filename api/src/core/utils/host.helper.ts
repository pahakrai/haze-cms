import common from '@golpasal/common/';

import {prepareUrl} from './patterns';
import {IUser} from '../../modules/User/interfaces';
import {Workspace} from '../../modules/Workspace/interfaces';

const {UserType} = common.type;

export const prepHost = (user: IUser, workspace: Workspace) => {
  let host: string;
  if (user?.userTypes?.includes(UserType.MEMBER)) {
    host = prepareUrl(workspace?.webHost, workspace?.alwaysHttpsWebHost);
  }
  if (user?.userTypes?.includes(UserType.USER)) {
    host = prepareUrl(
      workspace?.merchantWebHost,
      workspace?.alwaysHttpsMerchantWebHost
    );
  }
  if (
    user.userTypes.includes(UserType.PROVIDER)
    // || user.userTypes.includes(UserType.SYSTEM_ADMIN)
  ) {
    host = prepareUrl(
      workspace?.adminHost || process.env.HOST_ADMIN,
      workspace?.alwaysHttpsAdminHost
    );
  }
  return host;
};
