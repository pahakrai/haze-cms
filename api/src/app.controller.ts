import {Controller, Get} from '@nestjs/common';

import {BypassSecretGuard} from './core';
import packageJson from '../package.json';

@Controller()
export class AppController {
  @Get()
  @BypassSecretGuard()
  root(): string {
    return `app: ${packageJson.name}@${packageJson.version}`;
  }
}
