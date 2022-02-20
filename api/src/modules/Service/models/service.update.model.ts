import {
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsIn
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

import common from '@golpasal/common';
import {LocalizeStringModel} from 'src/core';

import {ServiceConditionModel} from './service.condition.model';

export class ServiceUpdateModel {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({description: 'category.code of service'})
  _category?: string;

  @IsOptional()
  @ValidateNested()
  @ApiProperty({description: 'name of service'})
  name?: LocalizeStringModel;

  @IsOptional()
  @ValidateNested()
  @ApiProperty({description: 'description'})
  description?: LocalizeStringModel;

  @IsOptional()
  @IsIn(Object.values(common.type.ServiceType))
  @ApiProperty({description: 'type of service'})
  type?: string;

  @IsOptional()
  @IsIn(Object.values(common.unit.ServiceUnit))
  @ApiProperty({description: 'value unit of service (int/bool)'})
  unit?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'can driver configure'})
  isConfigurable?: boolean;

  @IsOptional()
  @ApiProperty({description: 'unit meta'})
  unitMeta?: any;

  @IsOptional()
  @ValidateNested({each: true})
  @ApiProperty({description: 'condition to show this service'})
  conditions?: ServiceConditionModel[];

  @IsOptional()
  @IsString({each: true})
  platformTypes?: string[];
}
