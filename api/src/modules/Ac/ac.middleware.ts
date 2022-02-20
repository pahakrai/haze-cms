import {Injectable, NestMiddleware} from '@nestjs/common';
import {ACService} from './ac.service';

@Injectable()
export class ACMiddleware implements NestMiddleware {
  constructor(private readonly ac: ACService) {}
  use(req: any, res: any, next: () => void) {
    req.ac = this.ac;
    next();
  }
}
