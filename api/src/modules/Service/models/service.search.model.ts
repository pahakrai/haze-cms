import {IsIn, IsBoolean, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import common from '@golpasal/common';
import {BaseSearchModel} from 'src/core/models/baseSearch.model';

export class ServiceSearchModel extends BaseSearchModel {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({description: 'category.code of service'})
  category?: string;

  @IsOptional()
  @ApiProperty({description: 'type of service'})
  @IsIn(Object.values(common.type.ServiceType), {each: true})
  types?: string[];

  @IsOptional()
  @IsIn(Object.values(common.unit.ServiceUnit), {each: true})
  @ApiProperty({description: 'value unit of service (int/bool)'})
  units?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'can driver configure'})
  isConfigurable?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isUserInfo?: boolean;

  @IsOptional()
  @IsString({each: true})
  @ApiPropertyOptional({description: 'platformTypes of services'})
  platformTypes?: Array<string>;
}
