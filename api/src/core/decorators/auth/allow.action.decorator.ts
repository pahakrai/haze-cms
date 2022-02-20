import {SetMetadata} from '@nestjs/common';

export const ALLOW_ACTION_METADATA_KEY = 'allow-action';

export const AllowAction = (...actions: string[]) =>
  SetMetadata(ALLOW_ACTION_METADATA_KEY, actions);
