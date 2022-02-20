import {SetMetadata} from '@nestjs/common';

export const REQUIRE_LOGIN_METADATA_KEY = 'require-login';

export const RequireLogin = () => SetMetadata(REQUIRE_LOGIN_METADATA_KEY, true);
