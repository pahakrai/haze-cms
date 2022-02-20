import {SetMetadata} from '@nestjs/common';
export const Policy = (...policies: string[]) =>
  SetMetadata('policies', policies);
