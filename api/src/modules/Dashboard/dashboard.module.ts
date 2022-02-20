import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/dashboard.schemas';
import {DashboardController} from './dashboard.controller';
import {DashboardService} from './dashboard.service';
import {DashboardResolver} from './dashboard.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardResolver],
  exports: [DashboardService]
})
export class DashboardModule {}
