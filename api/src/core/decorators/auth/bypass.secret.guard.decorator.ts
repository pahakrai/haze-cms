import {SetMetadata} from '@nestjs/common';

export const BYPASS_SECRET_METADATA_KEY = 'bypassSecretGuard';

export const BypassSecretGuard = () =>
  SetMetadata(BYPASS_SECRET_METADATA_KEY, true);
