import {Module, forwardRef, HttpModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/member.schemas';
import {MemberController} from './member.controller';
import {MemberService} from './member.service';
import {MemberResolver} from './member.resolver';
import {WorkspaceTypeModule} from '../WorkspaceType/workspaceType.module';
import {AuthModule} from '../Auth/auth.module';
import {UserModule} from '../User';
import {AddressModule} from '../Address/address.module';
import {TagRecommendationModule} from '../TagRecommendation/tagRecommendation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    AuthModule,
    AddressModule,
    UserModule,
    HttpModule,
    WorkspaceTypeModule,
    TagRecommendationModule
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberResolver],
  exports: [MemberService]
})
export class MemberModule {}
