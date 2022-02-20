import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/tagRecommendation.schemas';
import {TagRecommendationController} from './tagRecommendation.controller';
import {TagRecommendationService} from './tagRecommendation.service';
import {TagRecommendationResolver} from './tagRecommendation.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [TagRecommendationController],
  providers: [TagRecommendationService, TagRecommendationResolver],
  exports: [TagRecommendationService]
})
export class TagRecommendationModule {}
