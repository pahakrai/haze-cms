import {SetMetadata} from '@nestjs/common';

export const USER_STATUS_METADATA_KEY = 'user-statuses';

export const UserStatuses = (...statuses: number[]) =>
  SetMetadata(USER_STATUS_METADATA_KEY, statuses);
