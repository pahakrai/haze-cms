import {createParamDecorator, ExecutionContext} from './utils';
import common from '@golpasal/common';

export const PlatformType = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.getRequest();

    let platformType = req.headers.platform || '';

    if (req.headers.platform) {
      if (req.headers.platform === common.type.PlatformType.ADMIN) {
        platformType = common.type.PlatformType.ADMIN;
      }
      if (req.headers.platform === common.type.PlatformType.WEB) {
        platformType = common.type.PlatformType.WEB;
      }
    }

    return platformType;
  }
);
