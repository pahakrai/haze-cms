import {applyDecorators, SetMetadata} from '@nestjs/common';
import common from '@golpasal/common';

import {UserTypes} from './user.type.decorator';

const {UserType} = common.type;

export const PROGRAMMATIC_API_METADATA_KEY = 'isProgrammatic';

export const ProgrammaticAPI = () =>
  applyDecorators(
    SetMetadata(PROGRAMMATIC_API_METADATA_KEY, true),
    UserTypes(UserType.PROGRAMMATIC)
  );
