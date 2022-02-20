import {IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class FindNearestRegionModel {
  @ApiProperty({description: 'current latitude'})
  @IsNumber({allowInfinity: false, allowNaN: false})
  latitude: number;

  @ApiProperty({description: 'current longitude'})
  @IsNumber({allowInfinity: false, allowNaN: false})
  longitude: number;
}
