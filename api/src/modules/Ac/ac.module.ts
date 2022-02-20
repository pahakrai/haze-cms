import {Module} from '@nestjs/common';
import {ACService} from './ac.service';
import {GroupModule} from './Group/group.module';
import {PolicyModule} from './Policy/policy.module';
import {ACController} from './ac.controller';
import {GroupController} from './Group/group.controller';

@Module({
  imports: [GroupModule, PolicyModule],
  controllers: [ACController, GroupController],
  providers: [ACService],
  exports: [ACService, GroupModule, PolicyModule]
})
export class ACModule {}
