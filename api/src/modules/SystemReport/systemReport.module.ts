import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/systemReport.schemas';
import {SystemReportController} from './systemReport.controller';
import {SystemReportService} from './systemReport.service';
import {SystemReportResolver} from './systemReport.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [SystemReportController],
  providers: [SystemReportService, SystemReportResolver],
  exports: [SystemReportService]
})
export class SystemReportModule {}
