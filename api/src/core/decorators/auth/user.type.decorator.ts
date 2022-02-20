import {SetMetadata} from '@nestjs/common';

export const USER_TYPE_METADATA_KEY = 'user-types';

export const UserTypes = (...userTypes: string[]) =>
  SetMetadata(USER_TYPE_METADATA_KEY, userTypes);
