import {Module} from '@nestjs/common';
import {PageModule as _PageModule} from './Page/page.module';
import {PageMenuModule} from './PageMenu/pagemenu.module';

@Module({
  imports: [_PageModule, PageMenuModule],
  exports: [_PageModule, PageMenuModule]
})
export class PageBaseModule {}
