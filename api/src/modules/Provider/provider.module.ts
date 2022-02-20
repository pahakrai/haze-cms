import {Module} from '@nestjs/common';

import {ProviderController} from './provider.controller';
import {ProviderService} from './provider.service';
import {ProviderResolver} from './provider.resolver';

import {AuthModule} from '../Auth/auth.module';
import {AuthConfigModule} from '../Auth/submodules/AuthConfig/authConfig.module';
import {AutoNumberTemplateModule} from '../AutoNumberTemplate/autoNumberTemplate.module';
import {GroupModule} from '../Ac/Group/group.module';
import {IamModule} from '../Iam/iam.module';
import {PageModule} from '../Page/Page/page.module';
import {PhoneRegionModule} from '../PhoneRegion/phoneRegion.module';
import {WorkspaceModule} from '../Workspace/workspace.module';
import {WorkspacePhoneRegionModule} from '../Workspace/submodules/WorkspacePhoneRegion/workspacePhoneRegion.module';
// eslint-disable-next-line max-len
import {WorkspacePaymentMethodModule} from '../Workspace/submodules/WorkspacePaymentMethod/workspacePaymentMethod.module';
import {WorkspaceSubscriptionModule} from '../Workspace/submodules/WorkspaceSubscription/workspaceSubscription.module';
import {SubscriptionPlanModule} from '../SubscriptionPlan/subscriptionPlan.module';

@Module({
  imports: [
    AuthModule,
    AuthConfigModule,
    AutoNumberTemplateModule,
    GroupModule,
    IamModule,
    PageModule,
    PhoneRegionModule,
    SubscriptionPlanModule,
    WorkspaceModule,
    WorkspacePhoneRegionModule,
    WorkspaceSubscriptionModule,
    WorkspacePaymentMethodModule
  ],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderResolver],
  exports: [ProviderService]
})
export class ProviderModule {}
