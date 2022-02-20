import {Module} from '@nestjs/common';
import {UserProfileController} from './userProfile.controller';
import {UserProfileService} from './userProfile.service';
import {UserProfileResolver} from './userProfile.resolver';

import {MemberModule} from '../Member/member.module';
import {WorkspaceTypeModule} from '../WorkspaceType/workspaceType.module';
import {WorkspaceModule} from '../Workspace/workspace.module';
import {UserModule} from '../User';
import {UserCreditModule} from '../UserCredit/userCredit.module';

@Module({
  imports: [
    UserModule,
    MemberModule,
    WorkspaceModule,
    WorkspaceTypeModule,
    UserCreditModule
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileResolver],
  exports: [UserProfileService]
})
export class UserProfileModule {}
