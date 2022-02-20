import {
  IsIn,
  IsString,
  IsBoolean,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import common from '@golpasal/common';

import {LocalizeStringModel} from 'src/core';

import {ServiceConditionModel} from './service.condition.model';

export class ServiceCreateModel {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'category.code of service'
  })
  _category: string;

  @ValidateNested()
  @ApiProperty({description: 'name of service'})
  name: LocalizeStringModel;

  @ValidateNested()
  @ApiProperty({description: 'description'})
  description?: LocalizeStringModel;

  @IsIn(Object.values(common.type.ServiceType))
  @ApiProperty({description: 'type of service'})
  type: string;

  @IsIn(Object.values(common.unit.ServiceUnit))
  @ApiProperty({description: 'value unit of service (int/bool)'})
  unit: string;

  @IsBoolean()
  @ApiProperty({description: 'can driver configure'})
  isConfigurable: boolean;

  @ApiProperty({description: 'unit meta'})
  unitMeta: any;

  @ValidateNested({each: true})
  @ApiProperty({description: 'condition to show this service'})
  conditions: ServiceConditionModel[];

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'alias'})
  alias?: string;

  @IsOptional()
  @IsString({each: true})
  platformTypes?: string[];
}
