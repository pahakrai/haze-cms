import {Module, HttpModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/feedback.schemas';
import {FeedbackController} from './feedback.controller';
import {FeedbackService} from './feedback.service';
import {FeedbackResolver} from './feedback.resolver';
import {MemberModule} from '../Member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    MemberModule,
    HttpModule
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackResolver],
  exports: [FeedbackService]
})
export class FeedbackModule {}
